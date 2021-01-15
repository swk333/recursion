function isMountain(height){
  //ここから書きましょう
  let i = 0;
  let count = 0;

  let resultArr = [];
  while(i < height.length - 1){
    if(height[i] < height[i+1]){
      resultArr.push(true);
    }
    else if(height[i] > height[i+1]){
      resultArr.push(false);
    }
    else {
      return false;
    }
    i++;    
  }
  console.log(resultArr);
  for(let i = 0; i < resultArr.length - 1; i++){
    if(resultArr[i] != resultArr[i+1]){
      count++;
    }
  }
  console.log(count);
  
  if(count != 1){
    return false;
  }
  else if(resultArr[0] === false){
    return false;
  }
  else if(resultArr[resultArr.length-1] === true){
    return false;
  }
  else{
    return true;
  }

}

console.log(isMountain([]));