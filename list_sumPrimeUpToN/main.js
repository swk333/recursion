// 例題
// 自然数nが与えられるので、1からnまでに含まれる素数の和を返す、sumPrimeUpToNという関数を作成してください。

// 53 -> 381
// 89 -> 963
// 97 -> 1060

function sumPrimeUpToN(n) {
  let arr = [];
  let cache = [];
  for(let i = 0; i <= n; i++){
    cache[i] = true;
  }
  
    for(let j = 2; j < Math.ceil(Math.sqrt(n)); j++){
      let i = 2;
      let ij = i * j;
      while(ij < n){
        cache[ij] = false;
        i++;
        ij = i * j;
      }
    }
  
  for(let i = 2; i < cache.length; i++){
    if(cache[i]){
      arr.push(i);
    }
  }
  console.log(arr);
  let result = 0;
  for(let i = 0; i < arr.length; i++){
    result += arr[i];
  }
  return result;

}
console.log(sumPrimeUpToN(10));