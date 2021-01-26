// ここから書いてください。

let domObj = document.getElementById("target");

const verticalObj = {
  top: "align-self-start",
  center: "align-self-center",
  bottom: "align-self-end",
}
const horizontalObj = {
  left: "justify-content-start",
  center: "justify-content-center",
  right: "justify-content-end",
}



function motivationalSpeechWallpaper(text, color, url, vertical, horizontal, dom) {
  let innerFlex = document.createElement("div");
  let textDiv = document.createElement("div");
  let textP = document.createElement("p");
  let img = document.createElement("img");

  innerFlex.classList.add("row", "mt-3");
  innerFlex.style.position = "relative";
  textDiv.style.position ="absolute";
  textDiv.classList.add("d-flex", verticalObj[vertical], horizontalObj[horizontal], "h3");

  textP.style.color = "#" + color;
  textP.style.width = "60%";
  textP.innerHTML = text;
  img.src = url;
  img.classList.add("image");

  textDiv.append(textP);
  innerFlex.append(textDiv);
  innerFlex.append(img);
  dom.append(innerFlex);
  
}

// 関数呼び出しの例

motivationalSpeechWallpaper("Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away. - Antoine de Saint", "2c3e50", "https://recursionist.io/img/different-job.png", "center", "center", domObj);



motivationalSpeechWallpaper("The scientist discovers a new type of material or energy and the engineer discovers a new use for it. - Gordon Lindsay Glegg", "2c3e50", "https://cdn.pixabay.com/photo/2018/02/23/04/38/laptop-3174729_1280.jpg", "bottom", "left", domObj);

motivationalSpeechWallpaper("Scientists study the world as it is, engineers create the world that never has been. - Theodore von Karman", "ecf0f1", "https://cdn.pixabay.com/photo/2017/05/10/19/29/robot-2301646_1280.jpg", "top", "right", domObj);

