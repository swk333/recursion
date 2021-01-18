function shuffleSuccessRate(arr,shuffledArr){
  //ここから書きましょう
  const shuffledObj = {};
  const arrObj = {};

  for(let i = 0; i < shuffledArr.length; i++){
    shuffledObj[shuffledArr[i]] = i;
  }
  for(let i = 0; i < arr.length; i++){
    arrObj[arr[i]] = i;
  }
  
  const shuffledValues = Object.values(shuffledObj);
  const arrValues = Object.values(arrObj);
  let count = 0;
  for(let i = 0; i < arrValues.length; i++){  
    if(shuffledValues[i] === arrValues[i]){
      count++;
    }
  }

  let ans = count / (shuffledArr.length);
  return Math.floor((1 - ans) * 100);
  
  
}

console.log(shuffleSuccessRate([119,726,398,187,943,486,728,305,968,754,650,536,969,305,111,225,708,806,40,969],[708,969,111,398,754,726,536,943,486,305,969,40,650,806,187,225,968,119,728,305]));