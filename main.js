'use strict';
function addEveryOtherElement(intArr){
  //ここから書きましょう
  
  return addEveryOtherElementHelper(intArr, 1, 0);
}

function addEveryOtherElementHelper(intArr, index, sum){
  if(index > intArr.length){
    return sum;
  }
  
  if(index % 2 != 0){
    sum += intArr[index-1];
  }
  return addEveryOtherElementHelper(intArr, index+2, sum);
  

}

//console.log(addEveryOtherElement([34,46,45,57]));