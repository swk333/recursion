'use strict';

function charInBagOfWordsCount(bagOfWords,keyCharacter){
  //ここから書きましょう
  let count = 0;
//  let lengthOfArr = bagOfWords.length;

  bagOfWords.forEach(word =>{
    for(let i = 0; i < word.length; i++){
      if(word[i] === keyCharacter){
        count++;
      }
    }
  });
    
  return count;

}
console.log(charInBagOfWordsCount(["hello","world"],"o"));
console.log(charInBagOfWordsCount(["The","tech","giant","is in the","city center"],"e"));