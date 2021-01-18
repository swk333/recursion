function firstNonRepeating(string){
  //ここから書きましょう
  const map1 = new Map();
  for(let i = 0; i < string.length; i++){
    if(!map1.has(string[i])){
      map1.set(string[i], 1);
    }
    else{
      map1.set(string[i], map1.get(string[i])+1);
    }
  }

  
  for(let i = 0; i < string.length; i++){
    if(map1.get(string[i]) === 1){
      return i;
    }
  }
  return -1;

}

console.log(firstNonRepeating("aabbcdddeffg"));



/*
function firstNonRepeating(string){
  //ここから書きましょう
  const map1 = new Map();
  for(let i = 0; i < string.length; i++){
    if(!map1.has(string[i])){
      map1.set(string[i], 1);
    }
    else{
      map1.set(string[i], map1.get(string[i])+1);
    }
  }
  const arr = [];
  for(const key of map1.keys()){
    arr.push(key);
  }

  const map2 = new Map();
  
  for(let i = 0; i < string.length; i++){
    if(map2.has(string[i])){
      continue;
    }
    else{
      map2.set(string[i], i);
    }
  }
  const resultArr = [];
  for(let i = 0; i < string.length; i++){
    if(map1.get(string[i]) === 1){
      resultArr.push(i);
    }
  }
  if(resultArr.length === 0){
    return -1;
  }
  else{
    return Math.min(...resultArr);
  }
}
*/