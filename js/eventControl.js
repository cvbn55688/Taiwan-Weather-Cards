const city = document.querySelectorAll(".city");
const cityName = document.getElementById("city");
const todayDate = document.getElementById("date");
const todayWeather = document.querySelector(".today_weather");
const todayWind = document.querySelector(".today_wind");
const todayRain = document.querySelector(".today_rain");
const todayTemperature = document.querySelector(".today_temperature");
const todayImage = document.querySelector(".today_image");
const firstTitle = document.getElementById("first_title");
const secondTitle = document.getElementById("second_title");
const thirdTitle = document.getElementById("third_title");
const firstTemperature = document.getElementById("first_temperature");
const secondTemperature = document.getElementById("second_temperature");
const thirdTemperature = document.getElementById("third_temperature");
const firstRain = document.getElementById("first_rain");
const secondRain = document.getElementById("second_rain");
const thirdRain = document.getElementById("third_rain");
const firstImage = document.getElementById("first_image");
const secondImage = document.getElementById("second_image");
const thirdImage = document.getElementById("third_image");
const sunriseTimeSpan = document.querySelector(".sunrise_time");
const sunsetTimeSpan = document.querySelector(".sunset_time");
const dateSpan = document.querySelectorAll(".dateSpan");
const weekWeatherImgElem = document.querySelectorAll(".week_image");
const imageBaseUrl =
  "https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/";
const hoursBox = document.querySelectorAll(".hours_box");
const defaultLocation = "臺北市";

todayDate.textContent = `${month.slice(1, 2)}/${day}`;

let weatherData;
async function getWeatherData() {
  weatherData = await getData();
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      async function getLocation() {
        const fetchDate = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAsK9wJr_DVUNY6SR7R4oOIOvuvt2fBIeg`
        );
        const fetchResponse = await fetchDate.json();
        let userLocation;
        if (navigator.language.slice(0, 2) === "en") {
          userLocation = fetchResponse.results[4].formatted_address.slice(
            13,
            16
          );
        } else if (navigator.language.slice(0, 2) === "zh") {
          userLocation = fetchResponse.results[4].formatted_address.slice(5, 8);
        }
        if (userLocation.includes("台")) {
          userLocation = userLocation.replace("台", "臺");
        }
        showTodayWeather(userLocation);
        show36hrWeather(userLocation);
        showSunTime(userLocation);
        showWeeklyWeather(userLocation);
      }
      getLocation();
    },
    (error) => {
      // user denied geolocation
      showTodayWeather(defaultLocation);
      show36hrWeather(defaultLocation);
      showSunTime(defaultLocation);
      showWeeklyWeather(defaultLocation);
    }
  );
}
getWeatherData();

city.forEach((element) => {
  element.addEventListener("click", () => {
    const cityNameData = element.querySelector("desc").textContent.slice(0, 3);
    showTodayWeather(cityNameData);
    show36hrWeather(cityNameData);
    showSunTime(cityNameData);
    showWeeklyWeather(cityNameData);
  });
});

function showTodayWeather(location) {
  cityName.textContent = location;
  const cityWeatherNow = weatherData.allWeatherData.現在天氣[location].data;
  todayWeather.textContent = cityWeatherNow.Wx.describe;
  todayTemperature.textContent = `${cityWeatherNow.T.slice(0, 2)}°`;
  todayWind.textContent = cityWeatherNow.WS;
  todayRain.textContent = cityWeatherNow.Pop6h;
  todayImage.src = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/${cityWeatherNow.Wx.value}.svg`;
}

function show36hrWeather(location) {
  const city36hrWeatherData =
    weatherData.allWeatherData["36hr預報"][location].weatherTime;
  firstTitle.textContent = city36hrWeatherData[0].timeDescribe;
  secondTitle.textContent = city36hrWeatherData[1].timeDescribe;
  thirdTitle.textContent = city36hrWeatherData[2].timeDescribe;
  firstTemperature.textContent = `${city36hrWeatherData[0].data.MinT.slice(
    0,
    2
  )}°- ${city36hrWeatherData[0].data.MaxT.slice(0, 2)}°`;
  secondTemperature.textContent = `${city36hrWeatherData[1].data.MinT.slice(
    0,
    2
  )}°- ${city36hrWeatherData[1].data.MaxT.slice(0, 2)}°`;
  thirdTemperature.textContent = `${city36hrWeatherData[2].data.MinT.slice(
    0,
    2
  )}°- ${city36hrWeatherData[2].data.MaxT.slice(0, 2)}°`;
  firstRain.textContent = city36hrWeatherData[0].data.Pop12h;
  secondRain.textContent = city36hrWeatherData[1].data.Pop12h;
  thirdRain.textContent = city36hrWeatherData[2].data.Pop12h;
  firstImage.src = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/${city36hrWeatherData[0].data.Wx.value.padStart(
    2,
    "0"
  )}.svg`;
  secondImage.src = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/${city36hrWeatherData[1].data.Wx.value.padStart(
    2,
    "0"
  )}.svg`;
  thirdImage.src = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/${city36hrWeatherData[2].data.Wx.value.padStart(
    2,
    "0"
  )}.svg`;
  hoursBox.forEach((element) => {
    if (element.querySelector(".hours_title").textContent.endsWith("天")) {
      element.classList.add("morning_box");
    } else if (
      element.querySelector(".hours_title").textContent.endsWith("上")
    ) {
      element.classList.add("afternoon_box");
    } else {
      element.classList.add("midnight_box");
    }
  });
}

function showSunTime(location) {
  const daytime = weatherData.allWeatherData["日落時間"][location].data;
  const sunriseTime = daytime["sunriseTime"];
  const sunsetTime = daytime["sunsetTime"];
  sunriseTimeSpan.textContent = sunriseTime;
  sunsetTimeSpan.textContent = sunsetTime;
}

function showWeeklyWeather(location) {
  const dateobject = weatherData.allWeatherData["一週預報"][location].data;

  for (i = 0; i < 6; i++) {
    const obj = dateobject[i + 1];
    const startTime = obj.startTime;
    const date = new Date(startTime);
    const month = date.getMonth() + 1; // months are 0-based
    const day = date.getDate();
    dateSpan[i].textContent = `${month}/${day}`;
  }

  dateSpan[6].textContent = `${
    date.getMonth(new Date(dateobject[0].startTime)) + 1
  }/${new Date(dateobject[0].startTime).getDate()}`;

  const WeekforUserLoc = weatherData.allWeatherData["一週預報"][location].data;

  weekWeatherImgElem[0].src =
    imageBaseUrl + WeekforUserLoc[1].Wx.value + ".svg";
  weekWeatherImgElem[1].src =
    imageBaseUrl + WeekforUserLoc[2].Wx.value + ".svg";
  weekWeatherImgElem[2].src =
    imageBaseUrl + WeekforUserLoc[3].Wx.value + ".svg";
  weekWeatherImgElem[3].src =
    imageBaseUrl + WeekforUserLoc[4].Wx.value + ".svg";
  weekWeatherImgElem[4].src =
    imageBaseUrl + WeekforUserLoc[5].Wx.value + ".svg";
  weekWeatherImgElem[5].src =
    imageBaseUrl + WeekforUserLoc[6].Wx.value + ".svg";
  weekWeatherImgElem[6].src =
    imageBaseUrl + WeekforUserLoc[0].Wx.value + ".svg";
  const WeekTempDiv = document.querySelectorAll(".week_temperature");
  WeekTempDiv[0].textContent =
    weatherData.allWeatherData["一週預報"][location].data[1].T.replace(
      /[^0-9]/g,
      ""
    ) + "°";
  WeekTempDiv[1].textContent =
    weatherData.allWeatherData["一週預報"][location].data[2].T.replace(
      /[^0-9]/g,
      ""
    ) + "°";
  WeekTempDiv[2].textContent =
    weatherData.allWeatherData["一週預報"][location].data[3].T.replace(
      /[^0-9]/g,
      ""
    ) + "°";
  WeekTempDiv[3].textContent =
    weatherData.allWeatherData["一週預報"][location].data[4].T.replace(
      /[^0-9]/g,
      ""
    ) + "°";
  WeekTempDiv[4].textContent =
    weatherData.allWeatherData["一週預報"][location].data[5].T.replace(
      /[^0-9]/g,
      ""
    ) + "°";
  WeekTempDiv[5].textContent =
    weatherData.allWeatherData["一週預報"][location].data[6].T.replace(
      /[^0-9]/g,
      ""
    ) + "°";
  WeekTempDiv[6].textContent =
    weatherData.allWeatherData["一週預報"][location].data[0].T.replace(
      /[^0-9]/g,
      ""
    ) + "°";
  const windSpan = document.querySelectorAll(".week_wind");
  const winddata = weatherData.allWeatherData["一週預報"][location].data;
  windSpan[0].textContent = parseInt(winddata[1].WS.match(/\d+/)[0], 10);
  windSpan[1].textContent = parseInt(winddata[2].WS.match(/\d+/)[0], 10);
  windSpan[2].textContent = parseInt(winddata[3].WS.match(/\d+/)[0], 10);
  windSpan[3].textContent = parseInt(winddata[4].WS.match(/\d+/)[0], 10);
  windSpan[4].textContent = parseInt(winddata[5].WS.match(/\d+/)[0], 10);
  windSpan[5].textContent = parseInt(winddata[6].WS.match(/\d+/)[0], 10);
  windSpan[6].textContent = parseInt(winddata[0].WS.match(/\d+/)[0], 10);
}
