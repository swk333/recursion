function findXTimes(teams){
  //ここから書きましょう
  const map = new Map();
  for(const team of teams){
    if(!map.has(team)){map.set(team, 1);
    }
    else{map.set(team, map.get(team) + 1);
    }
  }
  
  const arr = [];
  for(const value of map.values()){
    arr.push(value);
  }
  for(let i = 0; i < arr.length -1; i++){
    if(!(arr[i] === arr[i+1])){
      return false;
    }
  }

  return true;
}

console.log(findXTimes("bacddc"));