function winnerPairOfCards(player1,player2){
  //ここから書きましょう
  const player1Paircount = countPair(mapSet(player1));
  const player2Paircount = countPair(mapSet(player2));
  //ペア数が多い方を返す
  if(player1Paircount[1] > player2Paircount[1]){
    return "player1";
  }
  else if(player2Paircount[1] > player1Paircount[1]){
    return "player2";
  }
  //ペア数がドローの場合、ペアのランクの高い方を返す
  else{
    const player1PairRank = cardRankValue(player1Paircount[0]);
    const player2PairRank = cardRankValue(player2Paircount[0]);
    if(player1PairRank > player2PairRank){
      return "player1";
    }
    else if(player2PairRank > player1PairRank){
      return "player2";
    }
    //ペアのランクもドローの場合、それ以外のカードででランクの高い方を返す
    else{
      if(player1Paircount[2] > player2Paircount[2]){
        return "player1"
      }
      else if(player2Paircount[2] > player1Paircount[2]){
        return "player2";
      }
      else {
        return "draw";
      }
    }
  }
}

function mapSet(cardArr){
  const map = new Map();
  //mapに格納
  for(let i = 0; i < cardArr.length; i++){
    let card = cardArr[i];
    if(!map.has(card.slice(1))){
      map.set(card.slice(1), 1);
    }
    else{
      map.set(card.slice(1), map.get(card.slice(1)) + 1);
    }
  }
  return map;
}

function countPair(map){
//mapから最大のペア数を算出
  let maxValue = 0;
  let maxKey = 0;
  let maxCardRankIndex = 0;
    
  for(const [key, value] of map){
    if(value > maxValue){
      maxValue = value;
      maxKey = key;
    }
    if(cardRankValue(key) > maxCardRankIndex){
      maxCardRankIndex = cardRankValue(key);
    }
  }
  
  return [maxKey, maxValue, maxCardRankIndex];
}

function cardRankValue(card){
  //カードのランクのインデックス番号を返す
  const cardRankArr = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  return cardRankArr.indexOf(card);
}

console.log(winnerPairOfCards(["♣A","♥2","♥3","♠4","♣5"],["♥A","♥2","♣3","♠4","♦5"]));