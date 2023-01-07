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
let dayOrNight;
const dateTime = new Date().getHours();
if (dateTime <= 6 || dateTime >= 18) {
  dayOrNight = "night";
} else {
  dayOrNight = "day";
}
const imageBaseUrl = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/${dayOrNight}/`;
const hoursBox = document.querySelectorAll(".hours_box");
const defaultLocation = "臺北市";
const weekContainer = document.querySelector(".week_container");
const positionIcon = document.querySelector("#position");

todayDate.textContent = `${month.slice(1, 2)}/${day}`;

let weatherData;
async function getWeatherData() {
  weatherData = await getData();
  console.log(weatherData);
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      async function getLocation() {
        const fetchDate = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAsK9wJr_DVUNY6SR7R4oOIOvuvt2fBIeg&language=zh-TW`
        );
        const fetchResponse = await fetchDate.json();
        const taiwanIndex =
          fetchResponse.plus_code.compound_code.indexOf("台灣");
        let userLocation;
        userLocation = fetchResponse.plus_code.compound_code.slice(
          taiwanIndex + 2,
          taiwanIndex + 5
        );
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
    document.querySelectorAll("a").forEach((element) => {
      element.classList.remove("is-active");
    });
    element.parentElement.classList.add("is-active");
    const cityNameData = element.querySelector("desc").textContent.slice(0, 3);
    showTodayWeather(cityNameData);
    show36hrWeather(cityNameData);
    showSunTime(cityNameData);
    showWeeklyWeather(cityNameData);
    let clickGid = element.id;
    positionIcon.attributes.transform.nodeValue = `translate(${gPosition[clickGid]})`;
    positionIcon.style.display = "flex";
  });
});

function showTodayWeather(location) {
  cityName.textContent = location;
  const cityWeatherNow = weatherData.allWeatherData.現在天氣[location].data;
  todayWeather.textContent = cityWeatherNow.Wx.describe;
  todayTemperature.textContent = `${cityWeatherNow.T.slice(0, 2)}°`;
  todayWind.textContent = cityWeatherNow.WS;
  todayRain.textContent = cityWeatherNow.Pop6h;
  todayImage.src = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/${dayOrNight}/${cityWeatherNow.Wx.value}.svg`;
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
  firstImage.src = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/${dayOrNight}/${city36hrWeatherData[0].data.Wx.value.padStart(
    2,
    "0"
  )}.svg`;
  secondImage.src = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/${dayOrNight}/${city36hrWeatherData[1].data.Wx.value.padStart(
    2,
    "0"
  )}.svg`;
  thirdImage.src = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/${dayOrNight}/${city36hrWeatherData[2].data.Wx.value.padStart(
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
    let startTime = obj.startTime;
    nowTime = startTime.split(" ")[0].split("-");
    const date = new Date(nowTime[0] + "/" + nowTime[1] + "/" + nowTime[2]);
    const month = date.getMonth() + 1; // months are 0-based
    const day = date.getDate();
    dateSpan[i].textContent = `${month}/${day}`;
  }
  dateSpan[6].textContent = `${
    new Date(`
        ${dateobject[0].startTime.split(" ")[0].split("-")[0]}/${
      dateobject[0].startTime.split(" ")[0].split("-")[1]
    }/${dateobject[0].startTime.split(" ")[0].split("-")[2]}`).getMonth() + 1
  }/${new Date(`
    ${dateobject[0].startTime.split(" ")[0].split("-")[0]}/${
    dateobject[0].startTime.split(" ")[0].split("-")[1]
  }/${dateobject[0].startTime.split(" ")[0].split("-")[2]}`).getDate()}`;

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

const week_box = document.querySelectorAll(".week_box");

week_box.forEach((element) => {
  element.remove();
});
let weekCount = date.getDay();
while (weekContainer.childElementCount != 7) {
  if (weekCount == 0) {
    weekContainer.appendChild(week_box[6]);
  } else {
    weekContainer.appendChild(week_box[weekCount - 1]);
  }
  if (weekCount == 6) {
    weekCount = 0;
  } else {
    weekCount++;
  }
}

var gPosition = {
  C10017: "310 30",
  C65: "280 65",
  C63: "288 30",
  C68: "240 55",
  C10004: "235 95",
  C10018: "210 80",
  C10005: "210 130",
  C66: "180 170",
  C10008: "220 200",
  C10007: "150 210",
  C10009: "130 235",
  C10010: "170 265",
  C10020: "142 265",
  C67: "130 320",
  C64: "130 380",
  C10013: "170 420",
  C10014: "225 350",
  C10015: "275 220",
  C10002: "300 115",
  C09007: "20 80",
  C09020: "20 150",
  C10016: "15 250",
};
