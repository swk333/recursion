let arr = [5, 3, 1, 2, 4];
console.log(arr);
for(let i = 0; i < arr.length; i++){
    let minValueIndex = i;
    for(let j = i+1; j < arr.length; j++){
        if(arr[j] <= arr[minValueIndex]){
            minValueIndex = j;
        }
      }
      let temp = arr[i];
      arr[i] = arr[minValueIndex];
      arr[minValueIndex] = temp;
      console.log(arr);


}
console.log(arr);