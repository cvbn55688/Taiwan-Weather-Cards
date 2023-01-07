# Taiwan-Weather-Cards

本專案是以WeHelp Boot Camp第二階段第八週任務題目為依據，利用JavaScript串接中華民國交通部中央氣象局API，並以HTML、CSS等語言撰寫而成的天氣預報網站。本專案適用於各種尺寸的頁面，以利使用者以不同的裝置來使用。

網站分成兩個區塊，點擊地圖後可以看見相應縣市的天氣預報資訊。

# 響應式設計呈現

![](https://github.com/wanhsuan625/Taiwan-Weather-Cards/blob/develop/image/team%2014-Taiwan%20Weather%20Card.gif)

- RWD 中斷點： 1200px、1024px、768px 以及 480px

  > 可配合多款不同裝置來顯示畫面。在768px的介面之下，將畫面分割為上、下兩部分呈現。

# 資料串接

<h3>取得當下天氣狀況</h3>

  > API：```https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-089?Authorization=${key}```
  
- 以下為初始資料:

<img src = "https://user-images.githubusercontent.com/109027415/211013359-5df724bf-e470-409e-9e1d-27675af7bc29.png"/>

- 利用for迴圈將各資料取出，並只取第一筆時間資料，最後統整成一個object。

<img src = "https://user-images.githubusercontent.com/109027415/211013060-439250d7-9e4d-4937-be39-deb50a5de761.png"/>


<br/>

<h3>取得近36小時的天氣資料</h3>

  > API：```https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=${key}```
  
- 以下為初始資料:

<img src = "https://user-images.githubusercontent.com/109027415/211013953-852658ef-237b-4095-b2fd-cb907ba4b937.png"/>

  > 利用for迴圈將各資料取出，並判斷取得之資料為「今日白天」、「今日晚上」、「今晚明晨」、「明日白天」、「明日晚上」。
  > 將資料內start time取出並判斷是什麼時間點，部分時間會利用new Date()來判斷是今日或明日。

- 以下為判斷方法：

<img src = "https://user-images.githubusercontent.com/109027415/211014592-1479a114-ed4a-4c9f-a23e-d9f1d69e9662.png"/>

- 最後將資料打包：

<img src = "https://user-images.githubusercontent.com/109027415/211014870-0d2bac54-c852-4546-8dd5-57c154c5996c.png"/>

<br/>

<h3>取得一週的天氣資料</h3>

  > API：```https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${key}```
  
- 以下為初始資料:

<img src = "https://user-images.githubusercontent.com/109027415/211015439-c470c859-ce8c-4e93-b56c-bc8d769f9d9d.png"/>

  >利用for迴圈將各資料取出，因為氣象局會隨時間更新資料，所以要在更新時更換要取的時間，才能正確取得資料。
  >以上圖為例，0是資料當天，而一週資料就要取[0, 1, 3, 5, 7, 9, 11]。
 
- 下圖為判斷方法

  > 當時間為18:00時，資料要取[0, 1, 3, 5, 7, 9, 11]；時間為00:00時要取[1, 3, 5, 7, 9, 11, 13]；其他時間為[0, 2, 4, 6, 8, 10, 12]。其中要注意換天的問題，若氣象局已經更新資料但實際時間還在前一天，那天數就要+1，反之不用。

<img src = "https://user-images.githubusercontent.com/109027415/211016154-8afb19ab-3e53-47b8-853c-f9c0c8f071f7.png"/>



- 最後將資料打包，注意這邊我將0設為禮拜天、1為禮拜一...以此類推。

<img src = "https://user-images.githubusercontent.com/109027415/211016601-8ce2884e-f767-4f7f-a106-7197fc505090.png"/>

<br/>

<h3>取得當天的日落日出時間</h3>

  >因為氣象局的日落日出資料已經包含一整年的時間，不需要去管更新問題，所以直接用API控制日期，取今日資料即可。
  >API：```https://opendata.cwb.gov.tw/api/v1/rest/datastore/A-B0062-001?Authorization=${key}&timeFrom=${nowDate}&timeTo=${nextDate}```

- 以下為初始資料:

<img src = "https://user-images.githubusercontent.com/109027415/211017763-67b57ef7-b2f3-49cc-8fa3-515822fd5d11.png"/>

- 利用for迴圈將各資料取出，最後打包就好：

<img src = "https://user-images.githubusercontent.com/109027415/211017873-38cc13d8-e065-495d-ae31-b04b0d61982e.png"/>

<br/>

<h3>最後將所有資料統整成一個object，提供給前端使用</h3>
<img src = "https://user-images.githubusercontent.com/109027415/211018084-2449f3d3-0a37-4929-a859-bc7f0b0ea53a.png"/>

# 功能說明

- 點擊互動效果

  > 透過鼠標點擊台灣地圖即可取得點擊縣市之天氣資料。

- 使用者位置

  > 使用 Geolocation API 取得使用者當前地理位置之**經緯度**，並透過 Google Maps API 轉換為台灣縣市後串接縣市資料呈現於網頁上。<br/>註：若使用者拒絕存取當前地理位置，則呈現預設縣市【台北市】之天氣資料。

- 現在天氣

  > 呈現當前所在縣市或所選擇縣市之當下天氣情形，其中包含天氣狀況（晴、陰、多雲、有雨...等）、溫度、風速、降雨機率。

  ![](image/weatherNow.png)

- 36 小時預測天氣

  > 呈現當前所在縣市或所選擇縣市之未來 36 小時天氣情形，每 12 個小時為一單位。其中包含天氣狀況（晴、陰、多雲、有雨...等）、溫度、降雨機率。

  ![](image/36hrWeather.png)

- 日出日落時間

  > 呈現當前所在縣市或所選擇縣市之日出日落情形，每 12 個小時為一單位。其中包含天氣狀況（晴、陰、多雲、有雨...等）、溫度、降雨機率。

  ![](image/sunsetSunrise.png)

- 一周天氣預測

  > 呈現當前所在縣市或所選擇縣市自當前日期往後一周之天氣情形。其中包含星期、日期、天氣狀況（晴、陰、多雲、有雨...等）、溫度、風速。

  ![](image/weeklyWeather.png)

# 組員分工

- 版面刻劃

  > 台灣地圖：郭宸瑋<br/>
  > 天氣圖表：詹宛璇

- 天氣平台資料串接

  > 何致翰

- 網頁事件互動

  > 蘇子傑、林玟均
