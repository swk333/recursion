function validEmailList(emailList){
  //ここから書きましょう
  let resultArr = [];
  for(let i = 0; i < emailList.length; i++){
    if(isEmailvalid(emailList[i])){
      resultArr.push(emailList[i]);
    }
  }
  return resultArr;
}

function isEmailvalid(email){
  if(email.includes(" ")){
    return false;
  }
  else if(email.indexOf("@") === -1 || email.indexOf("@") != email.lastIndexOf("@")){
    return false;
  }
  else if(email.substring(email.indexOf("@")).indexOf(".") === -1){
    return false;
  }
  else {
    return true;
  }
}
console.log(validEmailList(["ccc@aaa.com","cvsd@a.com","tele@bb.aa","cc.c@aaa.com"]));