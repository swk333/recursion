function hasSameType(user1,user2){
  //ここから書きましょう
  const map1 = new Map();
  const valuesArr = [];
  if(user1.length != user2.length){
    return false;
  }
  
  for(let i = 0; i < user1.length; i++){
    if(valuesArr.includes(user2[i])){
      continue;
    }
    if(!map1.has(user1[i])) {
      map1.set(user1[i], user2[i]);
      valuesArr.push(user2[i]);
    }
    
  }
  console.log(map1);

  const arr = [];
  for(const char of user1){
    arr.push(map1.get(char));
  }

  for(let i = 0; i < arr.length; i++){
    if(!(arr[i] === user2[i])){
      return false;
    }
  }
  

  return true;
}

console.log(hasSameType("aappl","bbttb"));
