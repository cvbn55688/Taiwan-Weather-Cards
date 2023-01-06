# Taiwan-Weather-Cards

A teambuilt weather forestcast web
<h1>資料串接</h1>
<h3>取得當下天氣狀況</h3>
<p>API:https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-089?Authorization=${key}</p>
<p>以下為初始資料:</p>
<img src = "https://user-images.githubusercontent.com/109027415/211013359-5df724bf-e470-409e-9e1d-27675af7bc29.png"/>
<p>利用for迴圈將各資料取出，並只取第一筆時間資料，最後統整成一個object。</p>
<img src = "https://user-images.githubusercontent.com/109027415/211013060-439250d7-9e4d-4937-be39-deb50a5de761.png"/>

<h3>取得近36小時的天氣資料</h3>
<p>API:https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=${key}</p>
<p>以下為初始資料:</p>
<img src = "https://user-images.githubusercontent.com/109027415/211013953-852658ef-237b-4095-b2fd-cb907ba4b937.png"/>
<p>利用for迴圈將各資料取出，並判斷取得之資料為「今日白天」、「今日晚上」、「今晚明晨」、「明日白天」、「明日晚上」。</p>
<p>將資料內start time取出並判斷是什麼時間點，部分時間會利用new Date()來判斷是今日或明日。</p>
<p>以下為判斷方法：</p>
<img src = "https://user-images.githubusercontent.com/109027415/211014592-1479a114-ed4a-4c9f-a23e-d9f1d69e9662.png"/>
<p>最後將資料打包：</p>
<img src = "https://user-images.githubusercontent.com/109027415/211014870-0d2bac54-c852-4546-8dd5-57c154c5996c.png"/>

<h3>取得一週的天氣資料</h3>
<p>API:"https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${key}"</p>
<p>以下為初始資料:</p>
<img src = "https://user-images.githubusercontent.com/109027415/211015439-c470c859-ce8c-4e93-b56c-bc8d769f9d9d.png"/>
<p>利用for迴圈將各資料取出，因為氣象局會隨時間更新資料，所以要在更新時更換要取的時間，才能正確取得資料。</p>
<p>以上圖為例，0是資料當天，而一週資料就要取[0, 1, 3, 5, 7, 9, 11]。</p>
<p>以下為判斷方法，當時間為18:00時，資料要取[0, 1, 3, 5, 7, 9, 11]；時間為00:00時要取[1, 3, 5, 7, 9, 11, 13]；其他時間為[0, 2, 4, 6, 8, 10, 12]。其中要注意換天的問題，若氣象局已經更新資料但實際時間還在前一天，那天數就要+1，反之不用。</p>
<img src = "https://user-images.githubusercontent.com/109027415/211016154-8afb19ab-3e53-47b8-853c-f9c0c8f071f7.png"/>
<p>最後將資料打包，注意這邊我將0設為禮拜天、1為禮拜一...以此類推。</p>
<img src = "https://user-images.githubusercontent.com/109027415/211016601-8ce2884e-f767-4f7f-a106-7197fc505090.png"/>

<h3>取得當天的日落日出時間</h3>
<p>因為氣象局的日落日出資料已經包含一整年的時間，不需要去管更新問題，所以直接用API控制日期，取今日資料即可。</p>
<p>API:"https://opendata.cwb.gov.tw/api/v1/rest/datastore/A-B0062-001?Authorization=${key}&timeFrom=${nowDate}&timeTo=${nextDate}"</p>
<p>以下為初始資料:</p>
<img src = "https://user-images.githubusercontent.com/109027415/211017763-67b57ef7-b2f3-49cc-8fa3-515822fd5d11.png"/>
<p>利用for迴圈將各資料取出，最後打包就好：</p>
<img src = "https://user-images.githubusercontent.com/109027415/211017873-38cc13d8-e065-495d-ae31-b04b0d61982e.png"/>

<h2>最後將所有資料統整成一個object，提供給前端使用</h2>
<img src = "https://user-images.githubusercontent.com/109027415/211018084-2449f3d3-0a37-4929-a859-bc7f0b0ea53a.png"/>
