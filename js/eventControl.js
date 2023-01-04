let weatherData;
async function getWeatherData() {
  weatherData = await getData();
  console.log(weatherData);
}
getWeatherData();
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
city.forEach((element) => {
  element.addEventListener("click", () => {
    todayDate.textContent = `${month.slice(1, 2)}/${day}`;
    const cityNameData = element.querySelector("desc").textContent.slice(0, 3);
    cityName.textContent = cityNameData;
    const cityWeatherNow =
      weatherData.allWeatherData.現在天氣[cityNameData].data;
    todayWeather.textContent = cityWeatherNow.Wx.describe;
    todayTemperature.textContent = `${cityWeatherNow.T.slice(0, 2)}°`;
    todayWind.textContent = cityWeatherNow.WS;
    todayRain.textContent = cityWeatherNow.Pop6h;
    todayImage.src = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/${cityWeatherNow.Wx.value}.svg`;
    const city36hr =
      weatherData.allWeatherData["36hr預報"][cityNameData].weatherTime;
    firstTitle.textContent = city36hr[0].timeDescribe;
    secondTitle.textContent = city36hr[1].timeDescribe;
    thirdTitle.textContent = city36hr[2].timeDescribe;
    firstTemperature.textContent = `${city36hr[0].data.MinT.slice(
      0,
      2
    )}°- ${city36hr[0].data.MaxT.slice(0, 2)}°`;
    secondTemperature.textContent = `${city36hr[1].data.MinT.slice(
      0,
      2
    )}°- ${city36hr[1].data.MaxT.slice(0, 2)}°`;
    thirdTemperature.textContent = `${city36hr[2].data.MinT.slice(
      0,
      2
    )}°- ${city36hr[2].data.MaxT.slice(0, 2)}°`;
    firstRain.textContent = city36hr[0].data.Pop12h;
    secondRain.textContent = city36hr[1].data.Pop12h;
    thirdRain.textContent = city36hr[2].data.Pop12h;
    firstImage.src = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/${city36hr[0].data.Wx.value.padStart(
      2,
      "0"
    )}.svg`;
    secondImage.src = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/${city36hr[1].data.Wx.value.padStart(
      2,
      "0"
    )}.svg`;
    thirdImage.src = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/${city36hr[2].data.Wx.value.padStart(
      2,
      "0"
    )}.svg`;
    const sunriseTimeSpan = document.querySelector(".sunrise_time");
    const sunsetTimeSpan = document.querySelector(".sunset_time");
    const daytime = weatherData.allWeatherData["日落時間"][cityNameData].data;
    const sunriseTime = daytime["sunriseTime"];
    const sunsetTime = daytime["sunsetTime"];
    sunriseTimeSpan.textContent = sunriseTime;
    sunsetTimeSpan.textContent = sunsetTime;

    const dateSpan = document.querySelectorAll(".dateSpan");
    const dateobject =
      weatherData.allWeatherData["一週預報"][cityNameData].data;
    // console.log(dateobject);

    for (const key in dateobject) {
      const obj = dateobject[key];
      const startTime = obj.startTime;
      const date = new Date(startTime);
      const month = date.getMonth() + 1; // months are 0-based
      const day = date.getDate();
      dateSpan[key].textContent = `${month}/${day}`;
    }

    const imageElements = document.querySelectorAll(".week_image");

    // for (let i = 0; i < imageElements.length; i++) {
    //   const src =
    //     "https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/" +
    //     weatherData.allWeatherData["一週預報"][cityNameData].data[i + 1].Wx
    //       .value +
    //     ".svg";
    //   imageElements[i].src = src;
    // }
    imageElements[0].src =
      "https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/" +
      weatherData.allWeatherData["一週預報"][cityNameData].data[1].Wx.value +
      ".svg";
    imageElements[1].src =
      "https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/" +
      weatherData.allWeatherData["一週預報"][cityNameData].data[2].Wx.value +
      ".svg";
    imageElements[2].src =
      "https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/" +
      weatherData.allWeatherData["一週預報"][cityNameData].data[3].Wx.value +
      ".svg";
    imageElements[3].src =
      "https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/" +
      weatherData.allWeatherData["一週預報"][cityNameData].data[4].Wx.value +
      ".svg";
    imageElements[4].src =
      "https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/" +
      weatherData.allWeatherData["一週預報"][cityNameData].data[5].Wx.value +
      ".svg";
    imageElements[5].src =
      "https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/" +
      weatherData.allWeatherData["一週預報"][cityNameData].data[6].Wx.value +
      ".svg";
    imageElements[6].src =
      "https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/" +
      weatherData.allWeatherData["一週預報"][cityNameData].data[0].Wx.value +
      ".svg";
    const temperatureDiv = document.querySelectorAll(".week_temperature");
    temperatureDiv[0].textContent =
      weatherData.allWeatherData["一週預報"][cityNameData].data[1].T.replace(
        /[^0-9]/g,
        ""
      ) + "°";
    temperatureDiv[1].textContent =
      weatherData.allWeatherData["一週預報"][cityNameData].data[2].T.replace(
        /[^0-9]/g,
        ""
      ) + "°";
    temperatureDiv[2].textContent =
      weatherData.allWeatherData["一週預報"][cityNameData].data[3].T.replace(
        /[^0-9]/g,
        ""
      ) + "°";
    temperatureDiv[3].textContent =
      weatherData.allWeatherData["一週預報"][cityNameData].data[4].T.replace(
        /[^0-9]/g,
        ""
      ) + "°";
    temperatureDiv[4].textContent =
      weatherData.allWeatherData["一週預報"][cityNameData].data[5].T.replace(
        /[^0-9]/g,
        ""
      ) + "°";
    temperatureDiv[5].textContent =
      weatherData.allWeatherData["一週預報"][cityNameData].data[6].T.replace(
        /[^0-9]/g,
        ""
      ) + "°";
    temperatureDiv[6].textContent =
      weatherData.allWeatherData["一週預報"][cityNameData].data[0].T.replace(
        /[^0-9]/g,
        ""
      ) + "°";
    const windSpan = document.querySelectorAll(".week_wind");
    const winddata = weatherData.allWeatherData["一週預報"][cityNameData].data;
    windSpan[0].textContent = parseInt(winddata[1].WS.match(/\d+/)[0], 10);
    windSpan[1].textContent = parseInt(winddata[2].WS.match(/\d+/)[0], 10);
    windSpan[2].textContent = parseInt(winddata[3].WS.match(/\d+/)[0], 10);
    windSpan[3].textContent = parseInt(winddata[4].WS.match(/\d+/)[0], 10);
    windSpan[4].textContent = parseInt(winddata[5].WS.match(/\d+/)[0], 10);
    windSpan[5].textContent = parseInt(winddata[6].WS.match(/\d+/)[0], 10);
    windSpan[6].textContent = parseInt(winddata[0].WS.match(/\d+/)[0], 10);
  });
});
