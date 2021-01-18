function shuffledPositions(arr,shuffledArr){
  //ここから書きましょう
  const arrObj = {};
  for(let i = 0; i < shuffledArr.length; i++){
    arrObj[shuffledArr[i]] = i;
  }

  let resultArr = [];
  for(let i = 0; i < arr.length; i++){
    resultArr.push(arrObj[arr[i]]);
  }
  
  
  return resultArr;
}

console.log(shuffledPositions([10,11,12,13],[12,10,13,11]));