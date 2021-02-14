const target = document.getElementById("target");

// 各要素の情報を取得する必要があります。
const sliderItems = document.querySelectorAll("#target .slider-data .slider-item");

let sliderShow = document.createElement("div");
let main = document.createElement("div");
let extra = document.createElement("div");

// クラスを追加します。
sliderShow.classList.add("col-12", "d-flex", "flex-nowrap", "overflow-hiddens");
main.classList.add("main", "full-width");
extra.classList.add("extra", "full-width");

// 一番最初の要素を設定
main.append(sliderItems[0]);

sliderShow.append(main);
sliderShow.append(extra);
target.append(sliderShow);

//ボタンの作成
const btn = document.createElement("div");
const btnLeft = document.createElement("div");
const btnRight = document.createElement("div");

btn.classList.add("offset-5", "mt-2");
btnLeft.classList.add("btn", "btn-light");
btnRight.classList.add("btn", "btn-light");
btnLeft.innerHTML = "<";
btnRight.innerHTML = ">";

btn.append(btnLeft, btnRight);
target.append(btn);

main.setAttribute("data-index", "0");

// 1か-1を受け取って次の要素を設定するslideJumpという関数を作成してください。
// slideJumpではまず現在のスライドのインデックスと要素を把握し、受け取ったsteps(1または-1)によって、次のスライドの要素を決定します(1だと後の要素、-1だと前の要素という意味)。その後、更新されたインデックスをメインコンテナに再設定します(インデックスは文字列なので注意してください)。スライドは一番最後の要素のあとは最初に戻り、一番最初の前は最後に戻るので、インデックスのstepsに応じてインデックスを計算する際には十分注意してください。
// slideJumpの中でconsole.log(index)、console.log(currentElement)とconsole.log(nextElement)を行ってください。
// ここからJavaScriptを記述してください。

function slideJump(step, animationType) {
  let index = parseInt(main.getAttribute("data-index"));
  let currentElement = sliderItems.item(index);
  index += step;

  if(index < 0) index = sliderItems.length - 1;
  else if(index >= sliderItems.length) index = 0;

  let nextElement = sliderItems.item(index);
  main.setAttribute("data-index", index.toString());

  animateMain(currentElement, nextElement, animationType);

}

btnRight.addEventListener('click', () => {
  slideJump(1, "right");
})


btnLeft.addEventListener('click', () => {
  slideJump(-1, "left");
})


// 現在の要素、次の要素、rightかleftを受け取って、スライダーを実現するanimateMainという関数を作成してください。
// 現在の要素から次の要素へと移す必要があるので、extraコンテナには現在の要素を配置し、mainコンテナには次の要素を配置してください。mainが出現するように出現するエフェクトを持つexpand-animationクラスを追加し、extraには消滅エフェクトを持つdeplete-animationを追加してください。
// 受け取ったanimationTypeがrightの時は、右方向のアニメーション(次の要素が"右"から出現するスライダーアニメーション)を実装してください。(後にleft版も作成するのでif文を用いてください。)
// ここからJavaScriptを記述してください。

function animateMain(currentElement, nextElement, animationType) {
  extra.innerHTML = "";
  extra.append(currentElement);
  main.innerHTML = "";
  main.append(nextElement);

  main.classList.add("expand-animation");
  extra.classList.add("deplete-animation");
  if(animationType === "right"){
    sliderShow.innerHTML = "";
    sliderShow.append(extra);
    sliderShow.append(main);
  }
  else if(animationType === "left"){
    sliderShow.innerHTML = "";
    sliderShow.append(main);
    sliderShow.append(extra);
  }
}


