# Taiwan-Weather-Cards

A teambuilt weather forestcast web
<h1>資料串接</h1>
<h3>取得當下天氣狀況</h3>
<p>API:https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-089?Authorization=${key}</p>
<p>以下為初始資料:</p>
<img src = "https://user-images.githubusercontent.com/109027415/211013359-5df724bf-e470-409e-9e1d-27675af7bc29.png"/>
<p>利用for迴圈將各資料取出，並只取第一筆時間資料，最後統整成一個object</p>
<img src = "https://user-images.githubusercontent.com/109027415/211013060-439250d7-9e4d-4937-be39-deb50a5de761.png"/>

<h3>取得近36小時的天氣資料</h3>
<p>API:https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=${key}</p>
<p>以下為初始資料:</p>
<img src = "https://user-images.githubusercontent.com/109027415/211013953-852658ef-237b-4095-b2fd-cb907ba4b937.png"/>

