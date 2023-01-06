
function hoverEffect(city, nameTag){
    document.querySelector(city).addEventListener('mouseover', () => {
        document.querySelector(nameTag).style.removeProperty('display');
        document.querySelector(nameTag).style.display = "block";
        document.querySelector(nameTag).classList.add('.slide-in');
    })
    document.querySelector(city).addEventListener('mouseout', () => {
        document.querySelector(nameTag).style.removeProperty('display');
        document.querySelector(nameTag).style.display = "none";
        document.querySelector(nameTag).classList.remove('.slide-in');
    })
}

const keelung = '.keelung_city';
const keelungTag = '.keelung_city_nametag';
hoverEffect(keelung, keelungTag);

const NewTaipei = '.new_taipei_city';
const NewTaipeiTag = '.new_taipei_city_nametag';
hoverEffect(NewTaipei, NewTaipeiTag);

const taipei = '.taipei_city';
const taipeiTag = '.taipei_city_nametag';
hoverEffect(taipei, taipeiTag);

const taoyuan = '.taoyuan_city';
const taoyuanTag = '.taoyuan_city_nametag';
hoverEffect(taoyuan, taoyuanTag);

const hsinchuCy = '.hsinchu_county';
const hsinchuCyTag = '.hsinchu_county_nametag';
hoverEffect(hsinchuCy, hsinchuCyTag);

const hsinchu = '.hsinchu_city';
const hsinchuTag = '.hsinchu_city_nametag';
hoverEffect(hsinchu, hsinchuTag);

const miaoli = '.miaoli_county';
const miaoliTag = '.miaoli_county_nametag';
hoverEffect(miaoli, miaoliTag);

const taichung = '.taichung_city';
const taichungTag = '.taichung_city_nametag';
hoverEffect(taichung, taichungTag);

const nantou = '.nantou_county';
const nantouTag = '.nantou_county_nametag';
hoverEffect(nantou, nantouTag);

const changhua = '.changhua_county';
const changhuaTag = '.changhua_county_nametag';
hoverEffect(changhua, changhuaTag);

const yunlin = '.yunlin_county';
const yunlinTag = '.yunlin_county_nametag';
hoverEffect(yunlin, yunlinTag);

const chiayiCy = '.chiayi_county';
const chiayiCyTag = '.chiayi_county_nametag';
hoverEffect(chiayiCy, chiayiCyTag);

const chiayi = '.chiayi_city';
const chiayiTag = '.chiayi_city_nametag';
hoverEffect(chiayi, chiayiTag);

const tainan = '.tainan_city';
const tainanTag = '.tainan_city_nametag';
hoverEffect(tainan, tainanTag);

const kaohsiung = '.kaohsiung_city';
const kaohsiungTag = '.kaohsiung_city_nametag';
hoverEffect(kaohsiung, kaohsiungTag);

const pingtung = '.pingtung_county';
const pingtungTag = '.pingtung_county_nametag';
hoverEffect(pingtung, pingtungTag);

const taitung = '.taitung_county';
const taitungTag = '.taitung_county_nametag';
hoverEffect(taitung, taitungTag);

const hualien = '.hualien_county';
const hualienTag = '.hualien_county_nametag';
hoverEffect(hualien, hualienTag);

const yilan = '.yilan_county';
const yilanTag = '.yilan_county_nametag';
hoverEffect(yilan, yilanTag);

const penghu = '.penghu_county';
const penghuTag = '.penghu_county_nametag';
hoverEffect(penghu, penghuTag);

const kinmen = '.kinmen_county';
const kinmenTag = '.kinmen_county_nametag';
hoverEffect(kinmen, kinmenTag);

const lianjiang = '.lianjiang_county';
const lianjiangTag = '.lianjiang_county_nametag';
hoverEffect(lianjiang, lianjiangTag);