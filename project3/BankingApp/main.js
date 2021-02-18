'use strict';

function displayNone(ele) {
  ele.classList.remove("d-block");
  ele.classList.add("d-none");
}

function displayBlock(ele){
  ele.classList.remove("d-none");
  ele.classList.add("d-block");
}

const config = {
  initialForm: document.getElementById("initial-form"),
  bankPage: document.getElementById("bankPage"),
  sidePage: document.getElementById("sidePage")
}

class BankAccount{
  maxWithdrawPercent = 0.2;
  
  interestRate = 0.08;

  constructor(firstName, lastName, email, type, accountNumber, money) {
    this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.type = type;
      this.money = money;
      this.initialDeposit = money;
      this.accountNumber = accountNumber;
  }

  getFullName(){
      return this.firstName + " " + this.lastName;
  }

  calculateWithdrawAmount(amount) {
    const maxWithdrawMoney = this.money * this.maxWithdrawPercent;
    return (amount <= maxWithdrawMoney ? amount : maxWithdrawMoney)
  }

  withdraw(amount) {
    this.money -= this.calculateWithdrawAmount(amount);
    return this.money;
  }

  deposit(amount){
    this.money += amount;
    return this.money;
  }

  simulateTimePassage(days){
    let interestProfit = (this.money * Math.pow(1 + this.interestRate, days / 365)) - this.money;
    this.money += interestProfit;
    return this.money;
  }
}

function getRandomInteger(min, max){
  return Math.floor((Math.random() * (max - min))) + min;
}

function initalizeUserAccount(){
  const form = document.getElementById("bank-form");
  let userBankAccount = new BankAccount(
    form.querySelectorAll(`input[name="userFirstName"]`).item(0).value,
    form.querySelectorAll(`input[name="userLastName"]`).item(0).value,
    form.querySelectorAll(`input[name="userEmail"]`).item(0).value,
    form.querySelectorAll(`input[name="userAccountType"]`).item(0).value,
    getRandomInteger(1, Math.pow(10, 8)),
    parseInt(form.querySelectorAll(`input[name="userFirstDeposit"]`)[0].value)
  );
    config.initialForm.classList.add("d-none");
    config.bankPage.append(mainBankPage(userBankAccount));
}

function mainBankPage(BankAccount){
  const container = document.createElement("div");
  container.classList.add("p-3");
  container.innerHTML = ` 
  <div class="d-flex justify-content-end">
    <div>
      <p>Your Name: ${BankAccount.getFullName()}</p>
      <p>Your Back ID: ${BankAccount.accountNumber}</p>
      <p>Your First Deposit: ${BankAccount.initialDeposit}</p>
    </div>
  </div>
  <div class="d-flex justify-content-between bg-danger p-1">
    <span>Available Balance</span>
    <span>$ ${Math.floor(BankAccount.money)}</span>
  </div>
  <div class="m-2">
    <button id="withdrawBtn" class="btn btn-primary btn-block">
      <h3>WITHDRAWAL</h3>
      <i class="fas fa-wallet fa-5x"></i>
    </button>
    <button id="depositBtn" class="btn btn-primary btn-block">
      <h3>DEPOSIT</h3>
      <i class="fas fa-coins fa-5x"></i>
    </button>
    <button id="comeBackLaterBtn" class="btn btn-primary btn-block">
      <h3>COME BACK LATER</h3>
      <i class="fas fa-home fa-5x"></i>
    </button>
  </div>`;

  const withdrawBtn = container.querySelectorAll("#withdrawBtn")[0];
  withdrawBtn.addEventListener('click', () => {
    sideBankSwitch();
    config.sidePage.append(withdrawPage(BankAccount));
  })
  
  const depositBtn = container.querySelectorAll("#depositBtn")[0];
  depositBtn.addEventListener('click', () => {
    sideBankSwitch();
    config.sidePage.append(depositPage(BankAccount));
  });
  const comeBackLaterBtn = container.querySelectorAll("#comeBackLaterBtn")[0];
  comeBackLaterBtn.addEventListener('click', () => {
    sideBankSwitch();
    config.sidePage.append(comeBackLaterPage(BankAccount));
  });

  return container;
}

function billInputSelector(title) {
  const titleDiv = document.createElement("div");
  titleDiv.classList.add("container", "bg-white", "col-8", "p-3");
  titleDiv.innerHTML = `
      <div class="d-flex justify-content-center">
      <h1>${title}</h1>
    </div>
    <div class="row m-2">
      <label class="col-4 col-form-label">$100</label>
      <input type="number" class="bill-input form-control col-8" data-bill="100">
    </div>
    <div class="row m-2">
      <label class="col-4 col-form-label">$50</label>
      <input type="number" class="bill-input form-control col-8" data-bill="50">
    </div>
    <div class="row m-2">
      <label class="col-4 col-form-label">$20</label>
      <input type="number" class="bill-input form-control col-8" data-bill="20">
    </div>
    <div class="row m-2">
      <label class="col-4 col-form-label">$10</label>
      <input type="number" class="bill-input form-control col-8" data-bill="10">
    </div>
    <div class="row m-2">
      <label class="col-4 col-form-label">$5</label>
      <input type="number" class="bill-input form-control col-8" data-bill="5">
    </div>
    <div class="row m-2">
      <label class="col-4 col-form-label">$1</label>
      <input type="number" class="bill-input form-control col-8" data-bill="1">
    </div>
    <div style="border: double white thick;" class="bg-info d-flex justify-content-center align-items-center p-3">
      <span id="totalBillAmount">$0.00</span>
    </div>`;

  return titleDiv;
}

function backNextBtn(string1, string2) {
  const div = document.createElement("div");
  div.classList.add("d-flex", "justify-content-between", "p-2")
  div.innerHTML = `
    <div class="col-6 pl-0">
    <button id="withdrawGoBack" class="back-btn btn btn-outline-primary col-12">${string1}</button>
    </div>
    <div class="col-6 pr-0">
        <button id="withdrawProcess" class="next-btn btn btn-primary col-12">${string2}</button>
    </div>
    </div>`;
  return div;
}

function sideBankSwitch(){
  displayNone(config.bankPage);
  displayBlock(config.sidePage);
  config.bankPage.innerHTML = "";
  config.sidePage.innerHTML = "";
}

function bankReturn(BankAccount){
  displayNone(config.sidePage);
  displayBlock(config.bankPage);
  config.bankPage.append(mainBankPage(BankAccount));
}

function withdrawPage(BankAccount) {
  const container = document.createElement("div");
  container.append(billInputSelector("Please Enter The Withdrawal Amount"));
  container.append(backNextBtn("back", "next"));

  let backBtn = container.querySelectorAll(".back-btn")[0];
  backBtn.addEventListener('click', function() {bankReturn(BankAccount)});


  let billInputs = container.querySelectorAll(".bill-input");
  const withdrawTotal = container.querySelectorAll("#totalBillAmount")[0];

  for(let i = 0; i < billInputs.length; i++) {
    billInputs[i].addEventListener('change', function(){
      withdrawTotal.innerHTML = `$ ${billSummation(billInputs, "data-bill")}`;
    });
  }

  const nextBtn = container.querySelectorAll(".next-btn")[0];
  nextBtn.addEventListener('click', () => {
    container.innerHTML = "";
    let confirmDialog = document.createElement("div");
    confirmDialog.append(billDialog("The money you are going to take is ...", billInputs, "data-bill"));
    container.append(confirmDialog);

    let withdrawAmount = parseInt(BankAccount.calculateWithdrawAmount(billSummation(billInputs, "data-bill")));
    confirmDialog.innerHTML += `        
    <div class="d-flex bg-danger py-1 py-md-2 mb-3 text-white">
        <p class="col-8 text-left rem1p5">Total to be withdrawn: </p>
        <p class="col-4 text-right rem1p5">$ ${withdrawAmount}</p>
    </div>`;

    let withdrawConfirmBtns = backNextBtn("Back", "Confirm")
    confirmDialog.append(withdrawConfirmBtns);

    const confirmBtn = confirmDialog.querySelectorAll(".next-btn")[0];
    confirmBtn.addEventListener('click', function(){
      config.bankPage.innerHTML = "";
      BankAccount.money = BankAccount.withdraw(withdrawAmount);
      bankReturn(BankAccount)
    })
  });
  return container;
}

function billSummation(ele, multiplierAttribute) {
  let sum = 0;
  for(let i = 0; i < ele.length; i++){
    if(ele[i].value > 0){
      sum += parseInt(ele[i].getAttribute(multiplierAttribute)) * parseInt(ele[i].value);
    }
  }
  return sum;
}

function billDialog(title, ele, multiplierAttribute) {
  const container = document.createElement("div");
  container.classList.add("bg-white", "col-8");
  let innerString = "";
  let totalString = billSummation(ele, multiplierAttribute);

  for(let i = 0; i < ele.length; i++){
    if(ele[i].value){
      innerString += `
        <p class ="rem1p3 calculation-box mb-1 pr-2">$ ${parseInt(ele[i].getAttribute(multiplierAttribute))} × ${ele[i].value}</p>`;
    }
  }
  container.innerHTML = `
    <h2 class="pb-1">${title} </h2>
    <div class="d-flex justify-content-center">
    <div class="text-right col-8 px-1 calculation-box">
    ${innerString}
    Total Amount: ${totalString}
    </div>
    </div>`;
  return container;
}

function depositPage(BankAccount) {
  const container = document.createElement("div");
  container.append(billInputSelector("Please Enter The Deposit Amount"));
  container.append(backNextBtn("back", "next"));

  let backBtn = container.querySelectorAll(".back-btn")[0];
  backBtn.addEventListener('click', function() {bankReturn(BankAccount)});


  let billInputs = container.querySelectorAll(".bill-input");
  const depositTotal = container.querySelectorAll("#totalBillAmount")[0];

  for(let i = 0; i < billInputs.length; i++) {
    billInputs[i].addEventListener('change', function(){
      depositTotal.innerHTML = `$ ${billSummation(billInputs, "data-bill")}`;
    });
  }

  const nextBtn = container.querySelectorAll(".next-btn")[0];
  nextBtn.addEventListener('click', () => {
    container.innerHTML = "";
    let confirmDialog = document.createElement("div");
    confirmDialog.append(billDialog("The money you are going to deposit is ...", billInputs, "data-bill"));
    container.append(confirmDialog);

    let depositAmount = parseInt(billSummation(billInputs, "data-bill"));
    confirmDialog.innerHTML += `        
    <div class="d-flex bg-danger py-1 py-md-2 mb-3 text-white">
        <p class="col-8 text-left rem1p5">Total to be depositn: </p>
        <p class="col-4 text-right rem1p5">$ ${depositAmount}</p>
    </div>`;

    let depositConfirmBtns = backNextBtn("Back", "Confirm")
    confirmDialog.append(depositConfirmBtns);

    const confirmBtn = confirmDialog.querySelectorAll(".next-btn")[0];
    confirmBtn.addEventListener('click', function() {
      config.bankPage.innerHTML = "";
      BankAccount.money = BankAccount.deposit(depositAmount);
      bankReturn(BankAccount);
    });
  })
  return container;
}

function comeBackLaterPage(bankAccount) {
  const container = document.createElement("div");
  container.classList.add("p-5");
  container.innerHTML = `
  <h2 class="pb-3">How many days will you be gone?</h2>
    <div class="form-group">
        <input type="number" class="form-control" id="days-gone" placeholder="4">
    </div>
  `;
  container.append(backNextBtn("Back", "Confirm"));

  let backBtn = container.querySelectorAll(".back-btn")[0];
  backBtn.addEventListener('click', function() {
    bankReturn(bankAccount);
  })

  let confirmBtn = container.querySelectorAll(".next-btn")[0];
  confirmBtn.addEventListener('click', function() {
    let inputDays = parseInt(container.querySelectorAll("#days-gone")[0].value);
    bankAccount.simulateTimePassage(inputDays);
    bankReturn(bankAccount);
  })
  return container;
}