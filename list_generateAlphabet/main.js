function generateAlphabet(firstAlphabet,secondAlphabet){
  //ここから書きましょう
  let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  let result = [];

  firstAlphabet = firstAlphabet.toLowerCase();
  secondAlphabet = secondAlphabet.toLowerCase();

  let firstNum = alphabet.indexOf(firstAlphabet);
  let secondNum = alphabet.indexOf(secondAlphabet);

  if(firstNum < secondNum){
    for(let i = firstNum; i <= secondNum; i++){
      result.push(alphabet[i]);
    }
    return result;
  }
  else{
    for(let i = secondNum; i <= firstNum; i++){
      result.push(alphabet[i]);
    }
    return result;
  } 

}　

console.log(generateAlphabet("C","Z"));