function intersectionOfArraysRepeats(intList1,intList2){
  //ここから書きましょう
  const map = new Map();
  
  for(const number of intList1){
    if(!map.has(number)) {
      map.set(number, 1);
    }
    else{
      map.set(number, map.get(number) + 1);
    }
  }

  const resultArr = [];
  for(const number2 of intList2){
    if(map.get(number2) > 0){
      resultArr.push(number2);
      map.set(number2, map.get(number2) - 1);
    }
  }
  function compareNumbers(a, b){
    return a - b;
  }
  resultArr.sort(compareNumbers);

  
  return resultArr;
}

console.log(intersectionOfArraysRepeats([3,2,2,2,1,10,10],[3,2,10,10,10]));