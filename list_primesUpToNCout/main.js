function primesUpToNCount(n){
  //ここから書きましょう
  let cache = [];
  for(let i = 0; i < n; i++){
    cache.push(true);
  }

  for(let currentPrime = 2; currentPrime < Math.ceil(Math.sqrt(n)); currentPrime++){
    let i = 2;
    let ip = i * currentPrime;
    while(ip < n){
      cache[ip] = false; 
      i++;
      ip = i * currentPrime;
    }
  }

  let count = 0;
  for(let i = 2; i < cache.length; i++){
    if(cache[i]){
      count++;
    }
  }
  return count;

}
console.log(primesUpToNCount(13));