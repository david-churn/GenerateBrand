'use strict';
// 3/11/2019 David Churn created

const fontLink = document.getElementById("target");
const generateBtnObj = document.getElementById("gen");
const mainColorArr = document.getElementsByClassName("c-main");
const highLightColorArr = document.getElementsByClassName("c-high");
const serifArr = document.getElementsByClassName("f-serif");
const sansArr = document.getElementsByClassName("f-sans");
const backColor = document.getElementById("bc");
const highColor = document.getElementById("hc");
const headFont = document.getElementById("hf");
const paraFont = document.getElementById("pf");

let gSerifArr = [];
let gSansArr = [];

// get the fonts available from Google
let url = `https://www.googleapis.com/webfonts/v1/webfonts?key=~your~key~here~`;
fetch(url)
  .then((response) => response.json()) // put the result into text
  .then(function(respJSON) {
    let gFontArr = respJSON.items;
    gSerifArr = gFontArr.filter((aFont) => aFont.category==='serif');
    gSansArr = gFontArr.filter((font) => font.category==='sans-serif');
    });

// map button to click, enter, or space.
generateBtnObj.addEventListener('click', function() {
// Need two complementing hexadecimal number representing
//   red, green, and blue values (256^3 - 1 or 16^6 -1).
//   Since random is 0<= x < 1 use 256^3 or 16777216
  let mainNbr = Math.floor(Math.random() * 16777216);
  let c1Main = '#' + toHex(mainNbr,6)
  backColor.innerHTML=c1Main;
  for (let section of mainColorArr) {
    section.style.backgroundColor = c1Main;
  };
  let c1High = '#' + toHex(16777215 - mainNbr,6);
  highColor.innerHTML=c1High;
  for (let hSection of highLightColorArr) {
    hSection.style.backgroundColor = c1High;
  };

  let serifNbr = Math.floor(Math.random() * gSerifArr.length);
  headFont.innerHTML=gSerifArr[serifNbr].family;
  let sansNbr = Math.floor(Math.random() * gSansArr.length);
  paraFont.innerHTML=gSansArr[sansNbr].family;
  for (let section of serifArr) {
    section.style.fontFamily = `'${gSerifArr[serifNbr].family}',serif`;
  };
  for (let section of sansArr) {
    section.style.fontFamily = `'${gSansArr[sansNbr].family}',sans-serif`;
  };
  let fontStr=gSerifArr[serifNbr].family.replace(/ /g,'+') + '|' +
  gSansArr[sansNbr].family.replace(/ /g,'+');
  fontLink.setAttribute("href",`https://fonts.googleapis.com/css?family=${fontStr}`);
});
// Convert 'nbr' to a 'len' hexadecimal string.
function toHex(nbr, len) {
    return  ("0"+(Number(nbr).toString(16))).slice(-len).toUpperCase()
}
