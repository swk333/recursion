class Slider {

  constructor(sliderItemsSelector,sliderFrameId, mainId,extraId,leftBtnId,rightBtnId){
      this.sliderItems = document.querySelectorAll(`.${sliderItemsSelector}`);

      this.sliderFrame = document.getElementById(sliderFrameId)
      this.main        = document.getElementById(mainId)
      this.extra       = document.getElementById(extraId)

      this.leftBtn  = document.getElementById(leftBtnId)
      this.leftBtn.sliderObj = this
      this.rightBtn = document.getElementById(rightBtnId)
      this.rightBtn.sliderObj = this
  }
  
  set(){
      if(this.sliderItems.length == 0){
          let div = document.createElement("div")
          div.classList.add("h-500px","p-5")

          let p = document.createElement("p")
          p.classList.add("white","text-center")
          p.innerHTML = "You don't have a single product. You should get that from items."
          div.append(p)
          this.main.append(div)
          this.extra.classList.add("deplete-animation")
      }
      else if(this.sliderItems.length == 1){
          this.main.append(this.sliderItems[0]);
          this.main.setAttribute("data-index", "0");
          this.extra.classList.add("deplete-animation")
          Render.clickToMakeAProduct()
      }
      else {

          this.main.append(this.sliderItems[1]);
          this.main.setAttribute("data-index", "1");
          this.slideJump(-1, "left");
          Render.clickToMakeAProduct()

          this.leftBtn.addEventListener("click", function(){
              this.sliderObj.slideJump(-1, "left");
              Render.clickToMakeAProduct()
          });
          
          this.rightBtn.addEventListener("click", function(){
              this.sliderObj.slideJump(+1, "right");
              Render.clickToMakeAProduct()
          });
      }
  }
  slideJump(steps, animationType) {
      let index = parseInt(this.main.getAttribute("data-index"));
      let currentElement = this.sliderItems.item(index) != null ?this.sliderItems.item(index):"" ;
  
      index += steps;
  
      if(index < 0) index = this.sliderItems.length -1;
      else if(index >= this.sliderItems.length) index = 0;
  
      let nextElement = this.sliderItems.item(index)!= null ?this.sliderItems.item(index):"" ;
  
      this.main.setAttribute("data-index", index.toString());
  
      this.animateMain(currentElement, nextElement, animationType);
  }
  animateMain(currentElement, nextElement, animationType) {
      this.main.innerHTML = "";
      this.main.append(nextElement);
      
      this.extra.innerHTML = "";
      this.extra.append(currentElement);
  
      this.main.classList.add("expand-animation");
      this.extra.classList.add("deplete-animation");
      
      if (animationType === "right"){
          this.sliderFrame.innerHTML = "";
          this.sliderFrame.append(this.extra);
          this.sliderFrame.append(this.main);
      } else if (animationType === "left") {
          this.sliderFrame.innerHTML = "";
          this.sliderFrame.append(this.main);
          this.sliderFrame.append(this.extra);
      }
  }
}





//=================================================
//DBクラス
//=================================================
class DB {

  static table = {};
  static idCounter = 1;

  constructor(id) {
      this.id = id;
  }
  //=========================================================
  // save関連
  //=========================================================
  //引用　https://qiita.com/suetake/items/52ec9d22e978ceb3111c
  
  static replacer(k, v) {
      // if (typeof v === 'function') return v.toString()
      // return v;
  }
  static reviver(k, v) {
      // if (typeof v === 'string' && (v.match(/^function/) || v.match(/^()=>/) || v.match(/^() =>/))) {
      //     return Function.call(this, 'return ' + v)();
      // }
  
      // return v;
  }
  static saveDB(){
      // localStorage.setItem("mcnLeandro-ClickerEmpireGame-DB",JSON.stringify(DB.table,this.replacer))
  }
  static loadDB(){
      // DB.table = JSON.parse(localStorage.getItem("mcnLeandro-ClickerEmpireGame-DB"),DB.reviver)
  }
  static initializeDB(initializeFunction){
  //     if(!!localStorage.getItem("mcnLeandro-ClickerEmpireGame-DB")) {
  //         DB.loadDB()
  //     }
  //     else {
  //         initializeFunction()
  //         DB.saveDB()
  //     }
  //    // localStorage.removeItem("mcnLeandro-ClickerEmpireGame-DB")
  }
  //=========================================================
  // メソッド
  //=========================================================
  static initializeTable(key) {
      this.table[key] = {};
  }
  static add(obj) {

      let i = this.idCounter++;
      let className = this.name;

      if (!this.table[className]) this.initializeTable(className);

      obj.id = i;
      this.table[className][i] = obj;

  }
  static find(id) {
      let className = this.name;
      return this.table[className][id]
  }
  static findBy(key,value){

      return this.all().filter(obj => obj[key] == value)[0]
      
  }
  static where(key1,value1, key2, value2){

      return this.all().filter(obj => obj[key1] == value1 && obj[key2] == value2)

  }
  static all() {
      let className = this.name;
      if(!this.table[className])return []
      return Object.keys(this.table[className]).map(key=> this.table[className][key])
  }
  //=========================================================
  // リレーション (Relation)
  //=========================================================
  toKeyFormat(string) {
      let newString = string[0];
      let uppers = string.substring(1, string.length - 1).match(/[A-Z]/g)
      string = string.substring(1, string.length)
  
      if(uppers == null)return (newString + string).toLowerCase();
      uppers.forEach(value => {
          let upperIndex = string.indexOf(value)
          newString += string.substring(0, upperIndex)
          newString += "_" + string[upperIndex]
          string = string.substring(upperIndex+1,string.length)
      });
  
      return (newString + string).toLowerCase();
  }
  belongsTo(model){
      let modelName = this.toKeyFormat(model.name)
      let thisName = this.toKeyFormat(this.constructor.name)

      if(this[`${modelName}_id`]){
          this[modelName] = () => model.find(this[`${modelName}_id`]);
      }
      else{
          this[modelName] = () => model.findBy(`${thisName}_id`, this.id)
      }
  }
  hasmany(model){
      let modelName = this.toKeyFormat(model.name)
      let thisClassName = this.constructor.name.toLocaleLowerCase()

      
      this[`${modelName}s`] = () => {

          if(!DB.table[model.name]) return []
          return model.all().filter(obj => obj[`${thisClassName}_id`] == this.id)
          
      };
  }

  //=========================================================
  // DBの表示関数 (functions to show DB)
  //=========================================================

  // static getStringOf(data){
  //     if (data == null ) data = "null"

  //     if (typeof (data) == "string")   data = data
  //     if (typeof (data) == "number")   data = String(data);
  //     if (typeof (data) == "function") data = "f()"
  //     if (typeof (data) == "object")   data = "{Object}"

  //     return data;
  // }
  // static getMaxColumnLengthArr(obj) {
  //     let arr = []

  //     Object.keys(obj["1"]).forEach(key => {

  //         let len = String(key).length

  //         Object.keys(obj).forEach(id => {

  //             let data = obj[id][key];
  //             let dataLen = DB.getStringOf(data).length
  //             len = dataLen > len ? dataLen : len;
  //         })

  //         arr.push(len + 2)

  //     })

  //     return arr
  // }
  // static addCharNTime(n, char) {
  //     let string = "";
  //     for (let i = 0; i < n; i++) string += char;
  //     return string;
  // }
  // static getColumnString(data, len) {
  //     data = this.getStringOf(data)

  //     let string = " " + data + " "

  //     string += this.addCharNTime(len - string.length, " ")

  //     return string;
  // }
  // static getRecordString(obj, lenArr) {
  //     let i = 0;
  //     let string = "|";

  //     Object.keys(obj).forEach(col => {

  //         let len = lenArr[i++]
  //         let data = DB.getColumnString(obj[col], len);

  //         string += data + DB.addCharNTime(len - data.length," ") +"|"

  //     })
  //     string += "\n"

  //     string += "|"
  //     lenArr.forEach(len => string += DB.addCharNTime(len,"-") + "|" ) 
  //     string += "\n"

  //     return string + ""


  // }
  // static getColumnRecordString(model,lenArr){
  //     let string = "";
  //     let line = "|";

  //     lenArr.forEach(len => line += DB.addCharNTime(len,"=") + "|" ) 
  //     line += "\n"


  //     string += line

  //     let i = 0;
  //     string += "|"
  //     Object.keys(model[1]).forEach(column => {
  //         let len = lenArr[i++]
  //         string += " " + column + DB.addCharNTime(len - (column.length+1)," ") + "|"
  //     })

  //     string += "\n"

  //     string += line

  //     return string;
  // }
  // static getModelString(model) {
  //     let lenArr = this.getMaxColumnLengthArr(this.table[model])
  //     let totalLen = lenArr.reduce((total, x) => total + x) + lenArr.length + 1;

  //     let table = ""

  //     //モデル
  //     table += this.addCharNTime(totalLen, "_") + "\n"
  //     table += "|" + this.addCharNTime(totalLen - 2, " ") + "|" + "\n"
  //     table += "| " + model + this.addCharNTime(totalLen - (model.length + 3), " ") + "|" + "\n"

  //     //カラム一覧
  //     table += this.getColumnRecordString(this.table[model],lenArr)

  //     //レコード
  //     Object.keys(this.table[model]).forEach(id => {
  //         let record = DB.table[model][id]
  //         table += this.getRecordString(record,lenArr)
  //     })


  //     table += "|" + this.addCharNTime(totalLen - 2, "_") + "|" + "\n"


  //     return table;

  // }
  // static showDB() {
  //     let string = ""
  //     Object.keys(this.table).forEach(model => {
  //         let table =  DB.getModelString(model)

  //         string += "\n"
  //         string += table
  //         string += "\n"
  //         string += "\n"
  //     })
  //     return string;
  // }
}




//=================================================
//Model
//=================================================
class User extends DB {

  constructor(name, age, earningPerDay, totalMoney){
      super(null)

      this.name = name
      this.age  = age
      this.earningPerDay = earningPerDay
      this.totalMoney    = totalMoney

      super.belongsTo(Time)
      super.hasmany(UsersProduct)
      super.hasmany(UsersItem)
  }

  static currentUser(){
      if(!document.getElementById("current-user-id").getAttribute("current-user-id"))return false
      let user_id = parseInt(document.getElementById("current-user-id").getAttribute("current-user-id"))
      return User.find(user_id)
  }

}
class Time extends DB {

  constructor(user_id, day, month , year, dayLongMS){
      super(null)

      this.user_id  = user_id

      this.day = day
      this.month = month
      this.year = year
      this.dayLongMS = dayLongMS

      this.timer = 0;

      super.belongsTo(User)
  }
  autoTimeupdator(){

      this.day += 1

      if(this.day > 30){
          this.month += 1
          this.day = 0
      }
      if(this.month > 12){
          this.year += 1
          this.month = 0
          this.user().age += 1
      }

  }
  getDate(){
      return `${this.day} / ${this.month} / ${this.year}`
  }

}
class Item extends DB {

  constructor(type_id, img_id, name, stock, price, isUnlocked, effectionParamsArr){
      super(null)

      this.type_id = type_id
      this.img_id  = img_id

      this.name  = name
      this.stock = stock
      this.price = price
      this.isUnlocked   = isUnlocked
      this.introduction = Type.find(type_id).introductionTemplate(...effectionParamsArr)
      this.effection    = Type.find(type_id).effectionTemplate(...effectionParamsArr)
      
      super.belongsTo(Type)
      super.belongsTo(Img)
      super.hasmany(UsersItem)
  }

}
class UsersItem extends DB {

  constructor(user_id, item_id, owning){

      super(null)

      this.user_id = user_id
      this.item_id = item_id

      this.owning     = owning == null ? 0 : owning ;
      this.stock      = Item.find(item_id).stock == null ? Infinity : Item.find(item_id).stock ;
      this.price      = Item.find(item_id).price
      this.isUnlocked = Item.find(item_id).isUnlocked

      super.belongsTo(User)
      super.belongsTo(Item)
  }

}
class Product extends DB {

  constructor(img_id, name, earning){
      super(null)

      this.img_id  = img_id

      this.name    = name
      this.earning = earning

      super.hasmany(UsersProduct)
      super.belongsTo(Img)
  }

}
class UsersProduct extends DB{

  constructor(user_id, product_id, amount, makerAmount){
      super(null)

      this.user_id    = user_id
      this.product_id = product_id

      this.amount      = amount == null ? 0 : amount ; 
      this.earning     = Product.find(product_id).earning
      this.makerAmount = makerAmount == null ? 0 : makerAmount ;


      super.belongsTo(User)
      super.belongsTo(Product)
  }
  makersEarning(){
      let makersEarning = this.earning * this.makerAmount
      return isNaN(makersEarning)? 0 : makersEarning
  }
}
class Type extends DB {

  constructor(name, introductionTemplate, effectionTemplate){
      super(null)

      this.name = name
      this.introductionTemplate = introductionTemplate
      this.effectionTemplate = effectionTemplate
      
      super.hasmany(Item)
  }

}
class Img extends DB {

  constructor(name, url){
      super(null)
      this.name = name
      this.url  = url
  }

}
//==============================================
//modelのヘルプ関数などを管理する。
//基本的にはtypeのeffection関数とintroduction関数を管理することになる。
//用途がはっきりしないクラスになってしまうけど今回はこれで行く
//==============================================

class ModelHelper{

  static productTypeEffectionTemplate(product_id){
      return function() {

          Controller.createNewUsersProduct(product_id)

          let usersItem = UsersItem.where("user_id",User.currentUser().id, "item_id",this.id)[0];

          Controller.lockUsersItem(usersItem.id)
          Controller.unlockSpecificUsersItems(product_id)

          View.productInfoWithSlider()

      }
  }
  static abilityTypeEffectionTemplate(product_id, additonalPrice){
      return function() {
  
          let usersProduct = UsersProduct.where("user_id",User.currentUser().id, "product_id",product_id)[0];

          let usersProductEarning = usersProduct.earning + additonalPrice;
          Controller.updateUsersProduct(usersProduct.id, "earning", usersProductEarning)

          View.productInfoWithSlider()

      }
  }
  static manpowerTypeEffectionTemplate(product_id){
      return function() {
  
          let usersProduct = UsersProduct.where("user_id",User.currentUser().id, "product_id",product_id)[0];

          let usersProductMakerAmount = usersProduct.makerAmount + 1;
          Controller.updateUsersProduct(usersProduct.id, "makerAmount", usersProductMakerAmount)
          
          View.productInfoWithSlider()

      }
  }
  static investimentTypeEffectionTemplate(returnPercentage, itemPriceChangePercentage){
      return function() {

          let usersItem = UsersItem.where("user_id",User.currentUser().id, "item_id",this.id)[0]; 
          let itemPriceChange = itemPriceChangePercentage != 0 ? itemPriceChangePercentage/100 : 0;
          let usersItemPrice = usersItem.price * (1 + itemPriceChange)

          Controller.updateUsersItem(usersItem.id,"price",usersItemPrice)

          let totalPurchaseAmount = ModelHelper.dynamicSummation(ModelHelper.multiplication ,this.price, 1+itemPriceChange,1, usersItem.owning )
          let newReturn = totalPurchaseAmount*(returnPercentage/100)
          let beforeReturn = usersItem.amount == 1 ? 0 :  (totalPurchaseAmount - usersItem.price)*(returnPercentage/100)
          let additionalReturn = Math.round(newReturn - beforeReturn)
          let usersEarningPerDay = User.currentUser().earningPerDay + additionalReturn

          Controller.updateUser(null,"earningPerDay", usersEarningPerDay)

      }
  }
  static realEstateTypeEffectionTemplate(additionalReturn){
      return function() {

          let value = User.currentUser().earningPerDay + additionalReturn;
          Controller.updateUser(null,"earningPerDay", value)

      }
  }


  static productTypeIntroductionTemplate(product_id){
      let productName = Product.find(product_id).name
      return function() {

          return `Release ${productName}.`
      }
  }
  static abilityTypeIntroductionTemplate(product_id, additonalPrice){
      let productName = Product.find(product_id).name
      return function() {

          return `Increase earning from making ${productName} by ${additonalPrice.toLocaleString()} yen.`

      }
  }
  static manpowerTypeIntroductionTemplate(product_id){
      let productName = Product.find(product_id).name
      return function() {

          return `Hire an employee to make ${productName}.`

      }
  }
  static investimentTypeIntroductionTemplate(returnPercentage, priceChangePercentage){
      return function() {

          return `Get ${returnPercentage}% of total price of this item you bought. The Item's price will increase by ${priceChangePercentage}% when you purchase the item. `

      }
  }
  static realEstateTypeIntroductionTemplate(additionalReturn){
      return function() {

          return `Get ${additionalReturn.toLocaleString()} yen per day.`

      }
  }

  static multiplication(num1,num2){
      return num1 * num2
  };

  static dynamicSummation(f, num1, num2, start, end){
      if(start > end) return 0;
      let num = f(num1,num2)
      return num1 + ModelHelper.dynamicSummation(f, num, num2, start+1, end);
  }
  
}





//==============================================
//View
//==============================================
class View { 
  
  static top(){


      document.getElementById("body").innerHTML = ViewTemplate.base(
          `
              <div class="d-flex justify-content-center h-90vh">
                  <div class="col-6 mt-auto mb-auto">
                      <button id="newGameBtn" class="btn btn-primary w-100 m-3">NewGame</button>
                      <button id="loginBtn" class="btn btn-info w-100 m-3">Log in</button>
                  </div>
              </div>
          `
      )

      Render.navLinks()
      Render.clickToSignUp("newGameBtn")
      Render.clickToLogin("loginBtn")


  }
  static signUp(){


      document.getElementById("body").innerHTML = ViewTemplate.base(
          `
              <div class="d-flex justify-content-center h-90vh">
                  <div class="col-6 mt-auto mb-auto">
                      <h2>What's your Name ?</h2>
                      <input id="nameInput" type="text" class="form-control m-3">
                      <h2>How long is a day ? (Second)</h2>
                      <input id="timeInput" type="number" class="form-control m-3">
                      <button id="startGameBtn" class="btn btn-primary w-100 m-3">Start Game</button>
                  </div>
              </div>
          `
      )

      Render.navLinks()
      Render.clickToRegistration("startGameBtn")


  }
  static login(){
      document.getElementById("body").innerHTML = ViewTemplate.base(`
          <div class="container h-90vh  shadow rounded overflow-auto p-5">
              <div class="my-2">
                  <i id="goBackIcon" class="fas fa-arrow-circle-left fa-3x click-object"></i>
              </div>
              ${User.all().reduce((users,user) => users + `
              <section  class="bg-heavy-gray shadow rounded p-3 mb-3">
                  <h3>${user.name}</h3>
                  <div class="d-flex">
                      <div class="col-8">
                          <li>Age &nbsp;&nbsp;&nbsp : &nbsp; ${user.age}</li>
                          <li>Date &nbsp;&nbsp; : &nbsp; ${user.time().getDate()}</li>
                          <li>Money &nbsp; : &nbsp; ${user.totalMoney.toLocaleString()}</li>
                      </div>
                      <div class="col-4 ">
                          <button id="user${user.id}-login-btn" class="btn btn-info w-100 mb-2">Login</button>
                          <!--
                          <button class="btn btn-danger w-100">Delete</button>
                          -->
                      </div>
                  </div>
              </section>
              `,``)}
          </div>
      `)
      Render.navLinks()
      Render.clickToTop("goBackIcon")

      User.all().forEach(user => {
          if(document.getElementById(`user${user.id}-login-btn`)){
              Render.clickToSession(`user${user.id}-login-btn`,user.id)
          }
      })

  }
  static userInfo(){


      let user = User.currentUser()
      document.getElementById("userInfoFrame").innerHTML =  `
          <div class="row mx-1 px-2 justify-content-center bg-heavy-gray rounded">
              <div class="col-xl col-lg-4 col-10 m-3 p-3 bg-light-gray rounded">${user.name}</div>
              <div class="col-xl col-lg-4 col-10 m-3 p-3 bg-light-gray rounded">${user.age.toLocaleString()} yrs old</div>
              <div class="col-xl col-lg-10 col-10 m-3 p-3 bg-light-gray rounded">${user.time().getDate()}</div>
              <div class="col-xl-11 col-10 m-3 p-3 bg-light-gray rounded">${user.totalMoney.toLocaleString()} yen</div>
          </div>
      `


  }
  static productInfoWithSlider(){


      document.getElementById("productInfoFrame").innerHTML = `
      <div id="slideFrame" class="row  mx-5 justify-content-center bg-heavy-gray rounded ">
          <div id="productSliderShowFrame" class="row flex-nowrap overflow-hiddens pl-lg-5 pl-3">
              <div id="productSliderMain" class="main full-width">

              </div>
              <div id="productSliderExtra" class="extra full-width">

              </div>
          </div>
          <div class="slider-data d-none">
              ${ User.currentUser().users_products().reduce((usersProducts,usersProduct) => usersProducts + ViewTemplate.productInfo(usersProduct),``)}
          </div>
          <div class="row  mx-2 justify-content-center bg-heavy-gray rounded">
              <div class="col-11 my-2 mt-auto">
                  <div id="controls" class="d-flex justify-content-center mt-2">
                      <button id="productSliderLeftBtn" class="btn btn-light"><</button>
                      <button id="productSliderRightBtn" class="btn btn-light">></button>
                  </div>
              </div>
          </div>
      </div>
      `

      new Slider(
          "sliderProduct",
          "productSliderShowFrame",
          "productSliderMain",
          "productSliderExtra",
          "productSliderLeftBtn",
          "productSliderRightBtn"
      ).set()


  }
  static itemIndex(){


      let usersItems = User.currentUser().users_items()

      document.getElementById("itemInfoFrame").innerHTML =  `
          <div class="row mx-1 px-2 justify-content-center bg-heavy-gray rounded">

              ${usersItems.reduce((usersItems,usersItem) => usersItem.isUnlocked ? usersItems + ViewTemplate.item(usersItem) : usersItems,``)}
              
          </div>
      `

      usersItems.forEach(usersItem => {
          if(document.querySelector(`#item${usersItem.item().id} #itemShowBtn`)){
              document.querySelector(`#item${usersItem.item().id} #itemShowBtn`).addEventListener("click",()=>{
                  View.itemShow(usersItem);
              })
          };
          
      })


  }
  static itemShow(usersItem){


      let inputControl = () =>{

          let input = document.querySelector("#itemQuantityInput");
          let value = input.value;

          if(usersItem.stock !== Infinity){
              let stock = usersItem.stock - usersItem.owning
              if(value > stock) value = stock
              else if(value < 0)     value = ""
          }

          input.value = value;

      }
      let calculateTotalPrice = () => {

          if(!document.querySelector("#itemQuantityInput"))return 0;
          
          let value = document.querySelector("#itemQuantityInput").value;

          if(value == "" || value == null) return 0;
          return (usersItem.price * parseInt(value));

      }
      let addEventListennerToControlInput = ()=>{

          document.querySelector("#itemQuantityInput").addEventListener("click",()=>{

              inputControl()
              document.querySelector("#totalPriceP").innerHTML = `Total : ${calculateTotalPrice().toLocaleString()}`

          })
          document.querySelector("#itemQuantityInput").addEventListener("keyup",()=>{

              inputControl()
              document.querySelector("#totalPriceP").innerHTML = `Total : ${calculateTotalPrice().toLocaleString()}`

          })
          

      }
      let addEventListennerToRunPurchaseProcess = ()=> {

          document.getElementById("purchaseBtn").addEventListener("click",()=>{

              let quantity = parseInt(document.getElementById("itemQuantityInput").value)

              if(User.currentUser().totalMoney < calculateTotalPrice()){
                  
                  View.alert("danger","You don't have enough money !!!!")

              }
              else if(usersItem.stock !== Infinity && usersItem.stock < usersItem.owning + quantity){

                  View.alert("danger","Out of stock !!")

              }
              else{
      
                  for(let i = 0; i < quantity ; i++) {

                      Controller.userPay(usersItem.price)
                      Controller.updateUsersItem(usersItem.id,"owning", usersItem.owning + 1)
                      usersItem.item().effection()

                  }
                  View.itemIndex()
                  View.userInfo()

              }

          })

      }


      document.getElementById("itemInfoFrame").innerHTML = `
          <div class="row mx-1 px-2 justify-content-center bg-heavy-gray rounded">

              <section class="mt-2 p-2 rounded col-12" >
                  <div class="m-2 p-5 shadow bg-light-gray rounded">
                      <div>
                          <i id="goBackIcon" class="fas fa-arrow-circle-left fa-3x click-object"></i>
                      </div>
                      <div class="col-12 col-lg-3 ml-lg-auto float-lg-right">
                          <img src="${usersItem.item().img().url}" alt="" width="100%" height="" class="rounded">
                      </div>
                      <div class="p-2 col-7 ">
                          <h2>${usersItem.item().name}</h2>
                          <p>Max Purchases : ${usersItem.stock !==  Infinity ? usersItem.stock.toLocaleString() : "∞"}</p>
                          <p>Owning : ${usersItem.owning.toLocaleString()}</p>

                          <p>Price : ${usersItem.price.toLocaleString() }</p>
                          <h3>Effection</h3>
                          <p>${usersItem.item().introduction()}</p>
                      </div>
                      <div class="mt-2 d-flex justify-content-end ">
                          <div class="col-12 col-md-5 p-0 text-right">
                              <p>How many would you like to purchase?</p>
                              <input id="itemQuantityInput" type="number" class="form-control ml-auto my-2" min="0" max="${usersItem.stock}">
                              <p id="totalPriceP" class="border-bottom">Total : ${calculateTotalPrice().toLocaleString()}</p>
                              <button id="purchaseBtn" class="btn btn-info w-100"> Purchase</button>
                          </div>
                      </div>
                  </div>
              </section>
              
          </div>
      `


      Render.clickToLoadItemIndex("goBackIcon")
      
      //showページ専用のaddEventListenner関数
      addEventListennerToControlInput()
      addEventListennerToRunPurchaseProcess()


  }
  static app(){


      document.getElementById("body").innerHTML = ViewTemplate.base(ViewTemplate.frames())
      View.userInfo()
      View.itemIndex()
      View.productInfoWithSlider()

      Render.navLinks()


  }
  static alert(type,message){


      document.getElementById("alert").innerHTML = `
          <div id="alert" class="alert alert-${type} alert-fade-out" role="alert">
              ${message}
          <div>
      `
      setTimeout(function(){
          document.getElementById("alert").innerHTML = ""
      },6000)

  }

}

class ViewTemplate {

  static base(view){


      return `
          <header class="p-2 d-flex justify-content-between bg-dark">
              <h2 class="white text-3vw" >Clicker Empire Game</h2>

                  <!-- 
                  //=============================================
                  // nav
                  //=============================================
                  -->
              <div id="navFrame">
                  ${ViewTemplate.nav()}
              </div>
          </header>
          <div id="alert"></div>
          <div id="main" class="container-fliud">
              ${view}
          </div>
          <footer class="mt-lg-auto p-3 bg-dark">
              <div class="d-flex justify-content-center mb-5">
                  <small class="white">Copyright ©️ <a href="https://twitter.com/leandro83g" target="_blank">Leandro,inc</a>　All <a href="https://github.com/mcnLeandro/Clicker-Empire-Game" target="_blank">Rights</a> Unreserved</small>
              </div>
          </footer>
      `


  }
  static nav(){


      return `
      <ul class="nav">
          <!--
          <li class="nav-item">
              <a id="navLogin" class="nav-link active white text-2vw click-object" href="#">
                  <i class="fas fa-sign-in-alt text-2vw"></i>
                  Login
              </a>
          </li>
          -->
          <li class="nav-item ${!User.currentUser()? "d-none":""}">
              <a id="navLogout" class="nav-link active white text-2vw click-object" href="#">
                  <i class="fas fa-sign-out-alt text-2vw"></i>
                  Logout
              </a>
          </li>
          <!--
          <li class="nav-item ">
              <button id="navDB" class="btn btn-primary nav-link active white text-2vw click-object" href="#">
                  showDB
              </button>
          </li>
          -->
          <!--
          <li class="nav-item ">
              <button id="navLocal" class="btn btn-info nav-link active white text-2vw click-object" href="#">
                  showLocal
              </button>
          </li>
          -->
      </ul>
      `


  }
  static frames(userInfo, productInfo, itemInfo){


      return `
          <div  class="col-lg-7 col-12 bg-light-gray p-3 float-lg-right user-info-section">
              <!-- 
              //=============================================
              // userInfo
              //=============================================
              -->
              <div id="userInfoFrame">
                  ${!userInfo?"":userInfo}
              </div>
          </div>
          <div class="col-lg-5 col-12 bg-light-gray p-3 float-lg-left product-info-section">
              <!-- 
              //=============================================
              // productInfo
              //=============================================
              -->
              <div id="productInfoFrame">
                  ${!productInfo?"":productInfo}
              </div>
          </div>
          <div class="col-lg-7 col-12 bg-light-gray p-3 float-lg-right  item-info-section overflow-auto" >
              <!-- 
              //=============================================
              // itemInfo
              //=============================================
              -->
              <div id="itemInfoFrame">
                  ${!itemInfo?"":productInfo}
              </div>
          </div>
      `


  }
  
  static productDescription(usersProduct){


      return `
          <div class="text-center p-2 white">${usersProduct.amount} ${usersProduct.product().name.toLowerCase()}s</div>
          <div class="text-center p-2 white">${usersProduct.earning} yen per day </div>
      `


  }
  static productMakers(usersProduct){


      let maker = `<i class="fas fa-user fa-2x white up_down"></i>` + `\n`
      let makers = ``;

      for(let i = 1 ; i <= usersProduct.makerAmount; i++) makers += maker;

      return makers;


  }
  static productImg(usersProduct){


      return `
          <div class="d-flex justify-content-center">
              <img class="productImg" src="${usersProduct.product().img().url}"  width="70%">
          </div>
      `


  }
  static productInfo(usersProduct){


      return `
          <div class="sliderProduct"　 users-product-id="${usersProduct.id}">
              <div id="productDescription" class="col-11 my-3 bg-light-gray rounded">
                  ${ViewTemplate.productDescription(usersProduct)}
              </div>
              <div id="productImg" class="col-11 my-2  d-flex justify-content-center">
                  ${ViewTemplate.productImg(usersProduct)}
              </div>
              <div id="productMakers" class="col-11 my-5 row justify-content-center">
                  ${ViewTemplate.productMakers(usersProduct)}
              </div>
          </div>
      `


  }
  static item(usersItem){

      return `
          <section id="item${usersItem.item().id}"  itemId="${usersItem.item().id}" class="mt-2 p-2 rounded col-12">
              <div class="m-2 p-2 d-flex shadow bg-light-gray rounded">
                  <div class="col-3 p-3">
                      <img src="${usersItem.item().img().url}" alt="" width="100%" height="" class="rounded">
                  </div>
                  <div class="p-3 col-6 ">
                      <h2>${usersItem.item().name}</h2>
                      <p class="mt-3">Owning : ${usersItem.owning.toLocaleString()}</p>
                      <p>Price : ${usersItem.price.toLocaleString() } yen</p>
                  </div>
                  <div class="mt-auto mb-auto col-3">
                      <button id="itemShowBtn" class="btn btn-primary w-100">show</button>
                  </div>
              </div>
          </section>
      `


  }
}



//==============================================
//Controller
//==============================================
class Controller {


  static top(){

      View.top()

  }
  static signUp(){

      View.signUp()

  }
  static registration(){

      let userName = document.getElementById("nameInput").value
      userName = userName == "" ? "unknown" : userName ;
      let newUser = new User(userName,20,0,50000)
      User.add(newUser)
      
      let dayLongMS = document.getElementById("timeInput").value
      dayLongMS = dayLongMS != "" && dayLongMS.indexOf("-") == -1 && dayLongMS != "0" ? parseInt(dayLongMS)*1000 : 1000 ; 
      let newTime = new Time(newUser.id,1,1,2000,dayLongMS)
      Time.add(newTime)

      Item.all().forEach(item => {
          let newUsersItem = new UsersItem(newUser.id, item.id)
          UsersItem.add(newUsersItem);
      });

      Controller.session(newUser.id)

  }
  static login(){

      View.login()

  }
  static session(user_id){

      document.getElementById("current-user-id").setAttribute("current-user-id", user_id )
      Controller.app()
      Controller.startTimer()

  }
  static destroySession(){

      Controller.stopTimer()
      Controller.top()
      document.getElementById("current-user-id").setAttribute("current-user-id", "" )

      // DB.saveDB()
      // View.alert("success","saved Data")

  }
  static app(){

      View.app()

  }

  static startTimer(){

      let user = User.currentUser()
      let time = user.time()
      

      time.timer = setInterval(function(){

          user.users_products().forEach(usersProduct => {

              Controller.updateUsersProduct(usersProduct.id, "amount", usersProduct.amount + usersProduct.makerAmount);

          });

          let makersEarning = user.users_products().reduce((makersEarning,usersProduct) => makersEarning += usersProduct.makersEarning(),0)
          let userTotalMoney = user.totalMoney + user.earningPerDay + makersEarning

          Controller.updateUser(null,"totalMoney", userTotalMoney)

          time.autoTimeupdator()


          if(document.querySelector("#productSliderMain .sliderProduct")){
              let usersProduct_id = parseInt(document.querySelector("#productSliderMain .sliderProduct").getAttribute("users-product-id"))
              let usersProduct = UsersProduct.find(usersProduct_id);
              document.querySelector("#productSliderMain #productDescription").innerHTML = ViewTemplate.productDescription(usersProduct)
          }

          View.userInfo()

          DB.saveDB()


      },time.dayLongMS)

  }
  static stopTimer(){
      let time = User.currentUser().time()
      clearInterval(time.timer)
  }
  static createNewUsersProduct(product_id){

      let user_id = User.currentUser().id
      let newUsersProduct = new UsersProduct(user_id, product_id, 0)
      UsersProduct.add(newUsersProduct);

  }
  static updateUser(user_id, column,value){

      if(!column.indexOf("id") && column != "img_id")return false
      // let user = User.find(user_id)
      // user[column] = value
      User.currentUser()[column] = value

  }
  static updateUsersProduct(usersProduct_id, column, value){

      if( !column.indexOf("id") && column != "img_id")return false
      let usersProduct = UsersProduct.find(usersProduct_id)
      usersProduct[column] = value

  }
  static updateUsersItem(usersItem_id, column,value){

      if(!column.indexOf("id") && column != "img_id")return false
      let usersItem = UsersItem.find(usersItem_id)
      usersItem[column] = value;

  }
  static userPay(price){

      User.currentUser().totalMoney -= price;

  }
  static lockUsersItem(usersItem_id){
      Controller.updateUsersItem(usersItem_id, "isUnlocked", false)
  }
  //以下のアンロック処理はproductやitemの数が増えたり順番が変わったりすると対応できないのでよろしくないけど今回はしょうがないので次回の課題
  static unlockSpecificUsersItems(product_id){
      let user_id = User.currentUser().id
      let abilityUsersItem;
      let manpowerUsersItem;

      switch(product_id){
          case 1 :
              abilityUsersItem  = UsersItem.where("user_id",user_id, "item_id",4)[0]
              manpowerUsersItem = UsersItem.where("user_id",user_id, "item_id",7)[0]
              break;
          case 2 :
              abilityUsersItem  = UsersItem.where("user_id",user_id, "item_id",5)[0]
              manpowerUsersItem = UsersItem.where("user_id",user_id, "item_id",8)[0]
              break;
          case 3 :
              abilityUsersItem  = UsersItem.where("user_id",user_id, "item_id",6)[0]
              manpowerUsersItem = UsersItem.where("user_id",user_id, "item_id",9)[0]
              break;
      }
      Controller.updateUsersItem(abilityUsersItem.id, "isUnlocked", true)
      Controller.updateUsersItem(manpowerUsersItem.id, "isUnlocked", true)
  }

}



class Render {
  static clickToTop(elementId){
      document.getElementById(elementId).addEventListener("click",()=> Controller.top())
  }
  static clickToSignUp(elementId){
      document.getElementById(elementId).addEventListener("click",()=> Controller.signUp())
  }
  static clickToLogin(elementId){
      document.getElementById(elementId).addEventListener("click",()=> Controller.login())
  }
  static clickToRegistration(elementId){
      document.getElementById(elementId).addEventListener("click",()=> Controller.registration())
  }
  static clickToSession(elementId,user_id){
      document.getElementById(elementId).addEventListener("click",()=> Controller.session(user_id))
  }
  static clickToDestroySession(elementId){
      document.getElementById(elementId).addEventListener("click",()=> Controller.destroySession())
  }
  static clickToApp(elementId){
      document.getElementById(elementId).addEventListener("click",()=> Controller.app())
  }
  static clickToLoadItemIndex(elementId){
      document.getElementById(elementId).addEventListener("click",()=> View.itemIndex())
  }
  static clickToMakeAProduct(){
      let user = User.currentUser()
      let usersProduct_id = parseInt(document.querySelector("#productSliderMain .sliderProduct").getAttribute("users-product-id"))
      let usersProduct = UsersProduct.find(usersProduct_id);

      document.querySelector("#productSliderMain img").addEventListener("click",() => {

          Controller.updateUsersProduct(usersProduct_id, "amount", usersProduct.amount + 1)
          Controller.updateUser(null, "totalMoney", user.totalMoney + usersProduct.earning)

          View.userInfo()
          document.querySelector("#productSliderMain #productDescription").innerHTML = ViewTemplate.productDescription(usersProduct)

      })
  }

  static clickToShowDBInConsole(elementId){
      // document.getElementById(elementId).addEventListener("click",()=> console.log(DB.showDB()))
  }
  static clickToShowLocalStrage(elementId){
      // document.getElementById(elementId).addEventListener("click",()=> console.log(JSON.parse(localStorage.getItem("mcnLeandro-ClickerEmpireGame-DB"),DB.reviver)))
  }

  static navLinks(){
      // Render.clickToLogin("navLogin")
      Render.clickToDestroySession("navLogout")
      Render.clickToShowDBInConsole("navDB")
      // Render.clickToShowLocalStrage("navLocal")
  }

}





//==============================================
//DBの初期化 (initilize DB )
//==============================================


function initialize(){
  [
      new Img("Hamburger" ,"https://cdn.pixabay.com/photo/2012/04/14/15/37/cheeseburger-34315_1280.png"),
      new Img("Lemonade"  ,"https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png"),
      new Img("Ice Creame","https://cdn.pixabay.com/photo/2020/01/30/12/37/ice-cream-4805333_960_720.png"),

      new Img( "Flip machine", "https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png" ),
      new Img( "Lemonade Stand", "https://cdn.pixabay.com/photo/2019/06/20/16/15/lemonade-stand-4287495_960_720.png" ),
      new Img( "Ice Cream Truck", "https://1.bp.blogspot.com/-xcVRGLdi_vM/WKFi9LKxuGI/AAAAAAABBqo/e-1SdPAhoLgU2KEgN9alnve9X7Qb1I_sACLcB/s800/car_reitousya.png" ),

      new Img("chef1", "https://previews.123rf.com/images/barks/barks1908/barks190800079/129348039-young-male-worker-avatar-flat-illustration-upper-body-chef-cook.jpg"),
      new Img("chef2", "https://previews.123rf.com/images/barks/barks1908/barks190800089/129348785-young-male-worker-avatar-flat-illustration-upper-body-chef-cook.jpg"),
      new Img("chef3", "https://previews.123rf.com/images/barks/barks2101/barks210100096/162354674-circular-worker-avatar-icon-illustration-upper-body-chef-cook.jpg"),

      new Img("chart", "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png"),
      
      new Img( "House","https://cdn.pixabay.com/photo/2016/03/31/18/42/home-1294564_960_720.png" ),
      new Img( "Town House", "https://cdn.pixabay.com/photo/2019/06/15/22/30/modern-house-4276598_960_720.png" ),
      new Img( "Mansion" , "https://cdn.pixabay.com/photo/2017/10/30/20/52/condominium-2903520_960_720.png" ),
      new Img( "Industrial Space", "https://cdn.pixabay.com/photo/2012/05/07/17/35/factory-48781_960_720.png" ),
      new Img( "HotelSkyscraper" , "https://cdn.pixabay.com/photo/2012/05/07/18/03/skyscrapers-48853_960_720.png" ),
      new Img( "Bullet-Speed Sky Railway", "https://cdn.pixabay.com/photo/2013/07/13/10/21/train-157027_960_720.png" ),
  ].forEach(img => Img.add(img));

  [
      new Type( "Product"     , ModelHelper.productTypeIntroductionTemplate    ,ModelHelper.productTypeEffectionTemplate    ),
      new Type( "Ability"     , ModelHelper.abilityTypeIntroductionTemplate    ,ModelHelper.abilityTypeEffectionTemplate    ),
      new Type( "Manpower"    , ModelHelper.manpowerTypeIntroductionTemplate   ,ModelHelper.manpowerTypeEffectionTemplate   ),
      new Type( "Investiment" , ModelHelper.investimentTypeIntroductionTemplate,ModelHelper.investimentTypeEffectionTemplate),
      new Type( "Real estate" , ModelHelper.realEstateTypeIntroductionTemplate ,ModelHelper.realEstateTypeEffectionTemplate )
  ].forEach(type => Type.add(type));

  [
      new Product(1,"Hamburger" , 25 ),
      new Product(2,"Lemonade"  , 50 ),
      new Product(3,"Ice Creame", 150),
  ].forEach(product => Product.add(product));

  [
      new Item( 1 , 1 , "Hamburger"               , 1   , 0             , true  ,[1]          ),
      new Item( 1 , 2 , "Lemonade"                , 1   , 60000         , true  ,[2]          ),
      new Item( 1 , 3 , "Ice Cream"               , 1   , 90000         , true  ,[3]          ),

      new Item( 2 , 4 , "Flip machine"            , 500 , 15000         , false ,[1,25]       ),
      new Item( 2 , 5 , "Lemonade Stand"          , 1000, 30000         , false ,[2,50]       ),
      new Item( 2 , 6 , "Ice Cream Truck"         , 500 , 100000        , false ,[3,150]      ),

      new Item( 3 , 7 , "Hamburger Coworker"      , 10  , 15000         , false ,[1]          ),
      new Item( 3 , 8 , "Lemonade Coworker"       , 10  , 20000         , false ,[2]          ),
      new Item( 3 , 9 , "Ice Cream Coworker"      , 10  , 30000         , false ,[3]          ),

      new Item( 4 , 10, "ETF Stock"               , null, 300000        , true  ,[0.1,10]     ),
      new Item( 4 , 10, "ETF Bonds"               , null, 300000        , true  ,[0.07,0]     ),

      new Item( 5 , 11, "House"                   , 100 , 20000000      , true  ,[32000]      ),
      new Item( 5 , 12, "Town House"              , 100 , 40000000      , true  ,[64000]      ),
      new Item( 5 , 13, "Mansion"                 , 20  , 250000000     , true  ,[500000]     ),
      new Item( 5 , 14, "Industrial Space"        , 10  , 1000000000    , true  ,[2200000]    ),
      new Item( 5 , 15, "Hotel Skyscraper"        , 5   , 10000000000   , true  ,[25000000]   ),
      new Item( 5 , 16, "Bullet-Speed Sky Railway", 1   , 10000000000000, true  ,[30000000000])
  ].forEach(item => Item.add(item));
}


// DB.initializeDB(initialize)
initialize()
Controller.top()