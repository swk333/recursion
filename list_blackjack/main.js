function winnerBlackjack(playerCards,houseCards){

  let playerSum = blackjackPointCalc(playerCards);
  let houseSum = blackjackPointCalc(houseCards);


  if(playerSum > 21){
    return false;
  }
  else if(houseSum < 22 && houseSum > playerSum){
    return false;
  }
  else if(houseSum === playerSum){
    return false;
  }
  else {
    return true;
  }


}


function blackjackPointCalc(string){
  let cards = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
  let sum = 0;
  for(let i = 0; i < string.length; i++){
    sum += cards.indexOf(string[i].substring(1)) + 1;
  }
  return sum;

}

winnerBlackjack(["♥10","♥6","♣K"],["♠Q","♦2","♥K"]);