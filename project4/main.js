const config = {
  parentId: "target",
  apiUrl: "https://api.recursionist.io/random-words",
}

let serverData = fetch(config.apiUrl).
  then(response => response.json()).
  then(data => {
    console.log(data);
    renderHTML(data);
  });

const joinWords = (stringArr,delimiter) => {
  let result = "";
  for(let i = 0; i < stringArr.length; i++){
      if(i === stringArr.length - 1){
          result += stringArr[i];
          break;
      }
      result += stringArr[i] + delimiter;
  }
  return result;
}

const renderHTML = (data, min="5", max="100") => {
  let resultData = joinWords(data, "-");
  const target = document.getElementById(config.parentId);
  target.innerHTML = `
    <div class="card p-2">
    <h4>Sentence from the server:</h4>
    <p>${resultData}</p>
    </div>`;
  
  target.innerHTML += `
    <div class="row mt-3">
      <div class="col-5">
          <span>Min: </span>
          <input type="number" class="form-control min-input" min="0" value=${min}>
      </div>
      <div class="col-5 offset-1">
          <span>Max: </span>
          <input type="number" class="form-control max-input" min="0" value=${max}>
      </div>
    </div>`;

  target.innerHTML += `
    <div class="col-12 row justify-content-center mt-3">
    <button class="btn btn-secondary new-data-btn">New Data!</button>
    </div>`;

  const button = document.querySelector(".btn");
  button.addEventListener('click', () => {
    let minValue = document.querySelectorAll("input")[0].value;
    let maxValue = document.querySelectorAll("input")[1].value;
    let customUrl = config.apiUrl + "?min=" + minValue + "&max=" +maxValue;

    fetch(customUrl).
    then(response => response.json()).
    then(data => renderHTML(data, minValue, maxValue));
  })
}