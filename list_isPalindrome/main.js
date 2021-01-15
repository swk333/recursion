function isPalindrome(stringInput){
  //ここから書きましょう
  stringInput = stringInput.toLowerCase();
  stringInput = stringInput.replace(/\s+/g, "");

  for(let i = 0; i < stringInput.length - 1; i++){
    if(stringInput[i] != stringInput[stringInput.length - 1 -i]){
      return false;
    }
  }
  return true;
}

console.log(isPalindrome("Was it a cat I saw"));