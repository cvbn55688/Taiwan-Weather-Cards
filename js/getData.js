const key = "CWB-8B7CA0FE-BC4F-47CC-86D2-DED40E6F8455";
const weatherDataNowUrl = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-089?Authorization=${key}`;
const weatherDataWeekhrUrl = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=${key}`;
const weatherData36hrUrl = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${key}`;
const date = new Date();
let minute = date.getMinutes();
let hour = date.getHours();
let day = date.getDate();
let nextDay = date.getDate() + 1;
let weekDay = date.getDate() + 6;
let month = date.getMonth() + 1;
let year = date.getFullYear();
if (month < 10) {
  month = "0" + month;
}
if (day < 10) {
  day = "0" + day;
}
if (nextDay < 10) {
  nextDay = "0" + nextDay;
}
let nowDate = year + "-" + month + "-" + day;

function getWeatherNowData() {
  return fetch(weatherDataNowUrl, {
    method: "GET",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      let locationDataNow = {};
      let locations = data.records.locations[0].location;
      locations.forEach((location) => {
        // console.log(location);
        let locationName = location.locationName;
        let locationWx =
          location.weatherElement[1].time[0].elementValue[0].value;
        let locationWxCode =
          location.weatherElement[1].time[0].elementValue[1].value;
        let locationWS =
          location.weatherElement[8].time[0].elementValue[0].value + "m/s";
        let locationPop6h;
        try {
          locationPop6h =
            location.weatherElement[7].time[0].elementValue[0].value + "%";
        } catch (e) {
          locationPop6h = " %";
        }
        let locationT =
          location.weatherElement[3].time[0].elementValue[0].value + "度C";

        let data = {
          [locationName]: {
            locationName: locationName,
            data: {
              Wx: { describe: locationWx, value: locationWxCode },
              WS: locationWS,
              Pop6h: locationPop6h,
              T: locationT,
            },
          },
        };
        locationDataNow = Object.assign({}, locationDataNow, data);
      });
      return locationDataNow;
    });
}

function getWeatherData36hr() {
  return fetch(weatherData36hrUrl, {
    method: "GET",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let locationData36hr = {};
      let locations = data.records.location;
      locations.forEach((location) => {
        // console.log(location);
        let locationName = location.locationName;
        let weatherTime = [];
        for (let i = 0; i < 3; i++) {
          let locationWx =
            location.weatherElement[0].time[i].parameter.parameterName;
          let locationWxCode =
            location.weatherElement[0].time[i].parameter.parameterValue;
          let locationPop =
            location.weatherElement[1].time[i].parameter.parameterName + "%";
          let locationMaxT =
            location.weatherElement[4].time[i].parameter.parameterName + "度C";
          let locationMinT =
            location.weatherElement[2].time[i].parameter.parameterName + "度C";

          let startTime = location.weatherElement[0].time[i].startTime;
          let endTime = location.weatherElement[0].time[i].endTime;
          let timeDescribe = "";
          if (
            (i == 0 && startTime.substr(11) == "06:00:00") ||
            (i == 0 && startTime.substr(11) == "12:00:00")
          ) {
            timeDescribe = "今日白天";
          } else if (i == 0 && startTime.substr(11) == "18:00:00") {
            timeDescribe = "今晚明晨";
          } else if (i == 0 && startTime.substr(11) == "00:00:00") {
            timeDescribe = "今日凌晨";
          } else if (i == 1 && startTime.substr(11) == "18:00:00") {
            timeDescribe = "今晚明晨";
          } else if (i == 1 && startTime.substr(0, 10) != nowDate) {
            timeDescribe = "明日白天";
          } else if (i == 1 && startTime.substr(0, 10) == nowDate) {
            timeDescribe = "今日白天";
          } else if (i == 2 && startTime.substr(11) == "06:00:00") {
            timeDescribe = "明日白天";
          } else if (i == 2 && startTime.substr(0, 10) != nowDate) {
            timeDescribe = "明日晚上";
          } else {
            timeDescribe = "今日晚上";
          }
          let data = {
            data: {
              Wx: { describe: locationWx, value: locationWxCode },
              Pop12h: locationPop,
              MaxT: locationMaxT,
              MinT: locationMinT,
            },
            startTime: startTime,
            endTime: endTime,
            timeDescribe: timeDescribe,
          };
          weatherTime.push(data);
        }

        let locationData = {
          [locationName]: { locationName: locationName, weatherTime },
        };
        locationData36hr = Object.assign({}, locationData36hr, locationData);
      });
      return locationData36hr;
    });
}

function getWeekData() {
  let whatDay = date.getDay();
  return fetch(weatherDataWeekhrUrl, {
    method: "GET",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let locationWeekData = {};
      let locations = data.records.locations[0].location;
      let count;
      if (
        locations[0].weatherElement[0].time[0].startTime.substr(11) ==
        "18:00:00"
      ) {
        count = [0, 1, 3, 5, 7, 9, 11];
      } else if (
        locations[0].weatherElement[0].time[0].startTime.substr(11) ==
        "00:00:00"
      ) {
        count = [1, 3, 5, 7, 9, 11, 13];
        if (
          locations[0].weatherElement[0].time[0].startTime.substr(0, 10) !=
          nowDate
        ) {
          if (whatDay == 6) {
            whatDay = 0;
          } else {
            whatDay = whatDay + 1;
          }
        }
      } else {
        count = [0, 2, 4, 6, 8, 10, 12];
      }
      locations.forEach((location) => {
        let locationData = {};
        // console.log(location);
        let locationName = location.locationName;

        count.forEach((i) => {
          let locationWx =
            location.weatherElement[6].time[i].elementValue[0].value;
          let locationWxCode =
            location.weatherElement[6].time[i].elementValue[1].value;
          let locationWS =
            location.weatherElement[4].time[i].elementValue[0].value + "m/s";
          let locationT =
            location.weatherElement[1].time[i].elementValue[0].value + "度C";
          let locationMaxT =
            location.weatherElement[12].time[i].elementValue[0].value + "度C";
          let locationMinT =
            location.weatherElement[8].time[i].elementValue[0].value + "度C";
          let startTime = location.weatherElement[0].time[i].startTime;
          let endTime = location.weatherElement[0].time[i].endTime;
          let data = {
            [whatDay]: {
              Wx: { describe: locationWx, value: locationWxCode },
              WS: locationWS,
              T: locationT,
              MaxT: locationMaxT,
              MinT: locationMinT,
              startTime: startTime,
              endTime: endTime,
            },
          };
          locationData = Object.assign({}, locationData, data);

          if (whatDay == 6) {
            whatDay = 0;
          } else {
            whatDay++;
          }
        });

        data = {
          [locationName]: { locationName: locationName, data: locationData },
        };
        locationWeekData = Object.assign({}, locationWeekData, data);
      });
      return locationWeekData;
    });
}

function getSunData() {
  let nowDate = year + "-" + month + "-" + day;
  let nextDate = year + "-" + month + "-" + nextDay;
  let sunDataUrl = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/A-B0062-001?Authorization=${key}&timeFrom=${nowDate}&timeTo=${nextDate}`;
  return fetch(sunDataUrl, {
    method: "GET",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let locations = data.records.locations.location;
      sunTimeData = {};
      // console.log(locations);
      locations.forEach((location) => {
        let locationName = location.locationName;
        let sunriseTime = location.time[0].parameter[1].parameterValue;
        let sunsetTime = location.time[0].parameter[5].parameterValue;
        data = {
          [locationName]: {
            locationName: locationName,
            data: { sunriseTime: sunriseTime, sunsetTime: sunsetTime },
          },
        };
        sunTimeData = Object.assign({}, sunTimeData, data);
      });
      return sunTimeData;
    });
}

async function getData() {
  let locationDataNow = await getWeatherNowData();
  let locationData36hr = await getWeatherData36hr();
  let sunTimeData = await getSunData();
  let weekData = await getWeekData();
  let allWeatherData = {
    allWeatherData: {
      現在天氣: locationDataNow,
      "36hr預報": locationData36hr,
      日落時間: sunTimeData,
      一週預報: weekData,
    },
  };
  return allWeatherData;
}
