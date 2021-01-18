function findPairs(numbers){
  //ここから書きましょう
  const map = new Map();
  const resultArr = [];
  for(const num of numbers){
    if(!map.has(num)){
      map.set(num, 1);
    }
    else{
      map.set(num, map.get(num)+1);
    }
  }

  for(let[key, value] of map){
    if(value === 2){
      resultArr.push(key);
    }
  }

  function compareNumbers(a, b){
    return a - b;
  }

  resultArr.sort(compareNumbers);

  return resultArr;
}

console.log(findPairs([10,12,13,14,15,16,16,7,7,8]));