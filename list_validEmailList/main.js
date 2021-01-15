function rotateByTimes(ids,n){
  //ここから書きましょう
  let newRoom = [];
  let rotate = n % ids.length;

  for(let i = rotate; i < ids.length; i++){
    newRoom[i] = ids[i - rotate];
  }

  for(let i = 0; i < rotate; i++){
    newRoom[i] = ids[ids.length - rotate + i];
  }

  return newRoom;
  
}

console.log(rotateByTimes([4,23,104,435,5002,3],2));

// 時間計算量O(N)
// 空間計算量O(1)

function reverseInPlace (arr, start, end){   
  let middle = Math.floor((start+end)/2);
  for(let i = start; i<=middle;i++){
      let opposite = start+(end-i)
      let temp = arr[i];
      arr[i] = arr[opposite];
      arr[opposite] = temp;
  }
}

function rotateByTimes (ids,n) {
  let rotate = n % (ids.length);
  if(rotate == 0) return ids;
  
  let l = ids.length-1;
  reverseInPlace(ids, 0, l);
  reverseInPlace(ids, 0, rotate-1);
  reverseInPlace(ids, rotate, l);
  return ids;
}

console.log(rotateByTimes([1,2,3,4,5],2));
console.log(rotateByTimes([1,2,3,4,5],5));
console.log(rotateByTimes([10,12,3,4,5],3));
console.log(rotateByTimes([4,23,104,435,5002,3],26));
console.log(rotateByTimes([4,23,104,435,5002,3],0));