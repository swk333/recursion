class Card{
  //カードの生成
  constructor(suite, value, intValue){
    this.suite = suite,
    this.value = value,
    this.intValue = intValue
  }
  //カードの情報を返す
  getCardInfo(){

  }
}
//let card1 = new Card("♥", "8", 8);
//console.log(card1);

class Deck{
  //デッキを生成
  constructor(){
    this.deck = Deck.generateDeck();
  }
  static generateDeck() {
    const suites = ["♥", "♣", "◆", "♠"];
    const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    let newDeck =[];
    for(let i = 0; i < suites.length; i++){
      for(let j = 0; j < values.length; j++){
        newDeck.push(suites[i] + values[j]);
      }
    }
    return newDeck;
  }

  //デッキをシャッフルする
  shuffleDeck() {
    let randomNum = 0;
    for(let i = this.deck.length - 1; i >= 0; i--){
      randomNum = Math.floor(Math.random() * (i + 1));
      let temp = this.deck[i];
      this.deck[i] = this.deck[randomNum];
      this.deck[randomNum] = temp;
    }
  }
  //デッキからカードを引く
  draw() {
    return this.deck.pop();
  }
  //デッキの情報を返す

}
//let deck1 = new Deck();
//deck1.shuffleDeck();
//console.log(deck1);


class Dealer{
  //ゲームをスタートする
  static gameStart(){
    let table = {
      deck : new Deck(),
      playersCard : []
    }
    //デッキをシャッフルする
    table["deck"].shuffleDeck();

    //デッキから5枚引く
    for(let j = 0; j < 2; j++){
      let playerCard = [];
      for(let i = 0; i < 5; i++){
        playerCard.push(table["deck"].draw());    
      }
      table["playersCard"].push(playerCard);
    }
    return table;
  }

  //テーブルの情報を返す
  
  //勝利ロジックを計算する
    //mapに格納する
  static mapSet(cardArr){
    const map = new Map();
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
  
    //mapから最大のペア数を算出
  static countPair(map){
    let maxValue = 0;
    let maxKey = 0;
    let maxCardRankIndex = 0;
      
    for(const [key, value] of map){
      if(value > maxValue){
        maxValue = value;
        maxKey = key;
      }
      if(Dealer.cardRankValue(key) > maxCardRankIndex){
        maxCardRankIndex = Dealer.cardRankValue(key);
      }
    }
    return [maxKey, maxValue, maxCardRankIndex];
  }
  
  //カードのランクのインデックス番号を返す
  static cardRankValue(card){
    const cardRankArr = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    return cardRankArr.indexOf(card);
  }

  //勝者のプレイヤーを返す
  static winnerPairOfCards(table){
    const player1Paircount = Dealer.countPair(Dealer.mapSet(table["playersCard"][0]));
    const player2Paircount = Dealer.countPair(Dealer.mapSet(table["playersCard"][1]));
    //ペア数が多い方を返す
    if(player1Paircount[1] > player2Paircount[1]){
      return "player1";
    }
    else if(player2Paircount[1] > player1Paircount[1]){
      return "player2";
    }
    //ペア数がドローの場合、ペアのランクの高い方を返す
    else{
      const player1PairRank = Dealer.cardRankValue(player1Paircount[0]);
      const player2PairRank = Dealer.cardRankValue(player2Paircount[0]);
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
  

}

let table1 =Dealer.gameStart();
console.log(Dealer.winnerPairOfCards(table1));




