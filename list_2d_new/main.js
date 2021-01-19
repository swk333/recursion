function twosComplement(bits){
  //ここから書きましょう
  let bitsNew = oneComplement(bits);
  let bitsLength = bitsNew.length;
  let bitsRight = "";
  //末尾の桁を判定する
  for(let i = bitsLength - 1; i >= 0; i--){
    if(bitsNew[i] === "0"){
      bitsNew = bitsNew.substring(0, i) + "1" + bitsRight;
      return bitsNew;
    }
    else if(bitsNew[i] === "1"){
      bitsRight += "0";
      if(i === 0){
        bitsNew = "1" + bitsRight;
        return bitsNew;
      }
      continue;
    }
  }

  //繰り上がりが発生しない場合、桁を１にして終了
  
  //繰り上がりが発生する場合、前のけたを１にする

  //先頭の桁で繰り上がりが発生する場合・先頭に１を足す

  return bits;
}

function oneComplement(bits){
  let result = ""
  for(let i = 0; i < bits.length; i++){
    if(bits[i] === "1") {
      result += "0";
    }
    else {
      result += "1";
    }
  }
  return result;
}

//console.log(twosComplement("00011100")); //11100100 
//console.log(twosComplement("10010")); // 01110 
//console.log(twosComplement("001001")); // 110111 
//console.log(twosComplement("0111010")); // 1000110 
//console.log(twosComplement("1"));// 1 
console.log(twosComplement("0")); // 10 
console.log(twosComplement("000")) // 1000 