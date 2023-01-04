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
  });
});
