'use strict';
const battery =
    [{
        "batteryName": "WKL-78",
        "capacityAh": 2.3,
        "voltage": 14.4,
        "maxDraw": 3.2,
        "endVoltage": 10,
    },
    {
        "batteryName": "WKL-140",
        "capacityAh": 4.5,
        "voltage": 14.4,
        "maxDraw": 9.2,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-78",
        "capacityAh": 2.5,
        "voltage": 14.5,
        "maxDraw": 10,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-140",
        "capacityAh": 3.6,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 5,
    },
    {
        "batteryName": "IOP-E78",
        "capacityAh": 6.6,
        "voltage": 14.4,
        "maxDraw": 10.5,
        "endVoltage": 8,
    },
    {
        "batteryName": "IOP-E140",
        "capacityAh": 9.9,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 10,
    },
    {
        "batteryName": "IOP-E188",
        "capacityAh": 13.2,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C65",
        "capacityAh": 4.9,
        "voltage": 14.8,
        "maxDraw": 4.9,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C85",
        "capacityAh": 6.3,
        "voltage": 14.4,
        "maxDraw": 6.3,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C140",
        "capacityAh": 9.8,
        "voltage": 14.8,
        "maxDraw": 10,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C290",
        "capacityAh": 19.8,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 12,
    }]
;

const camera =
    [{
        "brand": "Cakon",
        "model": "ABC 3000M",
        "powerConsumptionWh": 35.5,
    },
    {
        "brand": "Cakon",
        "model": "ABC 5000M",
        "powerConsumptionWh": 37.2,
    },
    {
        "brand": "Cakon",
        "model": "ABC 7000M",
        "powerConsumptionWh": 39.7,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9000M",
        "powerConsumptionWh": 10.9,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9900M",
        "powerConsumptionWh": 15.7,
    },
    {
        "brand": "Go MN",
        "model": "UIK 110C",
        "powerConsumptionWh": 62.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 210C",
        "powerConsumptionWh": 64.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 230C",
        "powerConsumptionWh": 26.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 250C",
        "powerConsumptionWh": 15.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 270C",
        "powerConsumptionWh": 20.3,
    },
    {
        "brand": "VANY",
        "model": "CEV 1100P",
        "powerConsumptionWh": 22,
    },
    {
        "brand": "VANY",
        "model": "CEV 1300P",
        "powerConsumptionWh": 23,
    },
    {
        "brand": "VANY",
        "model": "CEV 1500P",
        "powerConsumptionWh": 24,
    },
    {
        "brand": "VANY",
        "model": "CEV 1700P",
        "powerConsumptionWh": 25,
    },
    {
        "brand": "VANY",
        "model": "CEV 1900P",
        "powerConsumptionWh": 26,
    }]
;



//入力項目：ブランド・モデル・アクセサリーWh
const target = document.getElementById("target");
const brandDiv = document.createElement("div");
const modelDiv = document.createElement("div");
const accessoryDiv = document.createElement("div");
const chooseBatteryDiv = document.createElement("div");
const tableDiv = document.createElement("div");
//初期値
let brandSelect = document.getElementById("brand");
let modelSelect = document.getElementById("model");
let cameraWh = 0;
let cameraCapacity = 0;



class Battery {
    constructor(batteryName, capacityAh, voltage, maxDraw, endVoltage) {
      this.batteryName = batteryName;
      this.capacityAh = capacityAh;
      this.voltage = voltage;
      this.maxDraw = maxDraw;
      this.endVoltage = endVoltage;
    }
    endVoltageMax() {
        let endVoltageMax = this.maxDraw * this.endVoltage;
        return endVoltageMax;
    }

    showUsableHours(cameraWh, accessoryWh){
        let usableHours = this.capacityAh * this.voltage / (cameraWh + accessoryWh);
        return usableHours.toFixed(2);
    }
  }
  
class Engineer {
    //電池が利用可能か判定
    static showAvailableBattery(cameraWh, accessoryWh) {
        let totalConsumptionWh = cameraWh + accessoryWh;
        let availableBatteryList = [];
        for(let i = 0; i < battery.length; i++){
            let batteryTest = new Battery(battery[i].batteryName, battery[i].capacityAh,battery[i].voltage, battery[i].maxDraw, battery[i].endVoltage);
            if(batteryTest.endVoltageMax() >= totalConsumptionWh){
                availableBatteryList.push(battery[i].batteryName);
            }
        }
        return availableBatteryList;
    }
}

class View {
//初期選択肢のレンダリング
  static renderView() {
    //タイトル
    const title = document.createElement("div");
    title.innerHTML = `<h1> Battery Finder Program </h1>`
    target.append(title);
    //ブランドをセットに入力
    let brandList = new Set();
    for(let i = 0; i < camera.length; i++){
        brandList.add(camera[i].brand);
    }
    //ブランドの選択肢を配列化
    const brandArr = [];
    const brandArrValue = [];
    for(const value of brandList){
        brandArr.push(`<option>${value}</option>`);
        brandArrValue.push(value);
    }
    //選択肢のレンダリング
    brandDiv.innerHTML = `
        <h2>Step1 Select Your Brand</h2>
        <form action="#" method="post">
        <select class="brand custom-select" name="brand" id="brand">
        ${brandArr}
        </select>
        </form>`;
    target.append(brandDiv);

    //モデルのレンダリング初期値
    let modelArr = [];
    for(let i = 0; i < camera.length; i++){
        if(brandArrValue[0] === camera[i].brand){
            modelArr.push(`<option>${camera[i].model}</option>`);
        }
    }
    modelDiv.innerHTML = `
        <h2>Step2 Select Your Model</h2>
        <form action="#" method="post">
        <select class="model custom-select" name="model" id="model">
        ${modelArr}
        </select>
        </form>`;
    target.append(modelDiv);

    //アクセサリーのレンダリング
    accessoryDiv.innerHTML = `
    <h2>Step3 Input Accessory Power Consumption</h2>
    <input type="number" class="form-control" name="accessory" id="accessory" value=0>`;
    target.append(accessoryDiv);

    chooseBatteryDiv.innerHTML = `
    <h2>Step4 Choose Your Battery</h2>
    `
    target.append(chooseBatteryDiv);
  }

  static renderBatteryList(tableString) {
      tableDiv.innerHTML =
      `<table class="table">
        <thead>
            <tr>
            <th scope="col">Battery Name</th>
            <th scope="col">Estimated Hours</th>
            </tr>
        </thead>
        <tbody>
            ${tableString.join("")}
        </tbody>
        </table>`;
      target.append(tableDiv);
  }

  //モデルの選択肢のレンダリング関数
  static chooseModel(cameraBrand) {
      //選ばれたブランドに応じたモデルを配列化
      let modelArr =[];
      for(let i = 0; i < camera.length; i++){
          if(cameraBrand === camera[i].brand){
              modelArr.push(`<option>${camera[i].model}</option>`);
          }
      }
      //選択肢のレンダリング
      model.innerHTML = `
          <form action="#" method="post">
          <select class="model" name="model" id="model">
          ${modelArr}
          </select>
          </form>`;
  }
}



//ブランドを変更すると、モデルの選択肢を変更する
function brandChangeEvent() {
    //ブランドを変更すると、データが返る
    let selectedBrand = document.querySelector(".brand");
    selectedBrand.addEventListener('change', () =>{
        brandSelect = document.getElementById("brand");
        //関数呼び出し
        View.chooseModel(brandSelect.value);
        showBattery();
    });
}

//モデルを変更すると、データが返る
function modelChangeEvent(){
    let selectedModel = document.querySelector(".model");
    selectedModel.addEventListener('change', showBattery);

}

//アクセサリー入力を変更すると、データが返る
function accessoryChangeEvent() {
    //アクセサリー入力の受け渡し
    let accessoryInput = document.getElementById("accessory");
    accessoryInput.addEventListener('input', showBattery);

}


//ブランドとモデルを指定するとカメラの商品電力を返す
function cameraPowerComsumption(cameraBrand, cameraModel) {
    let cameraPowerConsumption = 0;
    for(let i = 0; i < camera.length; i++){
        if(cameraBrand === camera[i].brand  && cameraModel === camera[i].model){
            cameraPowerConsumption = camera[i].powerConsumptionWh;
        }
    }
    return cameraPowerConsumption;
}

//利用可能なバッテリーを示す
function showBattery() {
    let brandSelect = document.getElementById("brand");
    let modelSelect = document.getElementById("model");
    let cameraWh = cameraPowerComsumption(brandSelect.value, modelSelect.value);
    let accessoryInput = document.getElementById("accessory");
    let accessoryWh = parseInt(accessoryInput.value);
    let batteryArr = Engineer.showAvailableBattery(cameraWh, accessoryWh);
    let tableString = [];

    //利用可能時間をMapに入れる
    for(let i = 0; i < battery.length; i++){
        let batteryTest = new Battery(battery[i].batteryName, battery[i].capacityAh,battery[i].voltage, battery[i].maxDraw, battery[i].endVoltage);
        for(let j = 0; j < batteryArr.length; j++){
            if(batteryArr[j] === batteryTest.batteryName){
                let hours = batteryTest.showUsableHours(cameraWh, accessoryWh);
                tableString.push(`<tr><th scope="row">${batteryArr[j]}</th><td>${hours}</td></tr>`);
                tableString.sort();
            }
        }
    }
    //利用可能時間をレンダリングする
    View.renderBatteryList(tableString);
}



View.renderView();
showBattery();
brandChangeEvent();
modelChangeEvent();
accessoryChangeEvent();
