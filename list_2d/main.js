

// 例題
// 二次元配列が与えられるので、最大値を返す、maxValueという関数を作成してください。

// [[1,1,2,3,2], [5,5,1,5,2], [3,5,2,3,1], [1,2,3,6,3]] -> 6
// [[0,9,1,4,5], [1,3,3,4,7], [11,12,34,81,12], [12,24,63,76,13]] -> 81
// [[-2,39,94,12,49], [11,35,84,21,32], [157,243,121,23,33], [11,43,65,84,29]] -> 243

function maxValue(arr){
  let maxNum = 0;
  for(let i = 0; i < arr.length; i++){
    let arr2 = arr[i];
    for(let j = 0; j < arr2.length; j++){
      if(arr2[j] > maxNum){
        maxNum = arr2[j];
      } 
    }
  }
  return maxNum;
}
console.log(maxValue([[1,1,2,3,2], [5,5,1,5,2], [3,5,2,3,1], [1,2,3,6,3]]));