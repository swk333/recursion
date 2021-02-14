'use strict';
const target = document.getElementById("target");

//商品情報
const productInfo = {
  number: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  productName: ["Headphone", "Camera", "Coffee", "Game", "Horse", "Cookie", "Car", "Candy", "Keyboard"],
  price: [300, 500, 2, 60, 100000, 1, 40000, 0.5, 100]
}

//商品画像
const productImg = document.querySelectorAll(".product-img");

//商品ボタン
const productBtn = document.querySelectorAll(".product-btn");

//商品情報の表示
function display(num) {
  let numberDiv = document.getElementById("product-number");
  let nameDiv = document.getElementById("product-name");
  let priceDiv = document.getElementById("product-price");
  
  numberDiv.innerHTML = productInfo.number[num];
  nameDiv.innerHTML = productInfo.productName[num];
  priceDiv.innerHTML = "$ " + productInfo.price[num].toLocaleString();
}


//商品ボタンのクリック処理
for(let i = 0; i < productBtn.length; i++){
  productBtn[i].addEventListener("click", () =>{
    display(i);
  });
}

//商品画像のスライダー処理
let sliderShow = document.createElement("div");
let main = document.createElement("div");
let extra = document.createElement("div");
sliderShow.classList.add("col-12", "d-flex", "justify-content-center", "flex-nowrap", "overflow-hiddens");
main.append(productImg[0]);
main.setAttribute("data-index", "0");


for(let i = 0; i < productBtn.length; i++){
  let direction = "";
  let step = 0;
  //現在のインデックス
  productBtn[i].addEventListener("click", function() {
    let index = parseInt(main.getAttribute("data-index"));
    //反復回数
    let count = i - index;
    //方向設定
    if(count > 0){
      direction = "right";
      step = 1;
    }
    else{
      direction = "left";
      step = -1;
    }
    //繰り返し
    let tmr = setInterval(function(){
      main.innerHTML = "";
      extra.innerHTML = "";
      main.append(productImg[index + step]);
      extra.append(productImg[index]);
      main.classList.add("expand-animation");
      extra.classList.add("deplete-animation");
      sliderShow.innerHTML = "";

      if(direction === "right"){
        sliderShow.append(extra);
        sliderShow.append(main);
        index++;  
      }else if(direction === "left"){
        sliderShow.append(main);
        sliderShow.append(extra);
        index--;
      }
      
      target.append(sliderShow);
    }, 100);
    
    //繰り返しストップ
    function stopAnimation() {
      clearInterval(tmr);
    }
    setTimeout(stopAnimation, Math.abs(count) * 100);
    //メインタグにインデックス付与
    main.setAttribute("data-index", i.toString());
  })
}


//pushボタン
const pushBtn = document.querySelector(".push-btn");
const result = document.getElementById("result");
const resultDiv = document.createElement("div");
pushBtn.addEventListener("click", () => {
  resultDiv.innerHTML = "";
  let index2 = parseInt(main.getAttribute("data-index"));
  resultDiv.innerHTML= `<h3> You Got a ${productInfo.productName[index2]}. Yay! </h3>`;
  resultDiv.classList.add("bg-white", "text-center", "p-2");
  result.append(resultDiv);

});