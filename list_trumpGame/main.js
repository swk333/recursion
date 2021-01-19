// まずは1枚分のカードを表すクラスCardを生成しましょう。
// 記号(♣, ♦, ♥, ♠の内1つ)・値（A,2,~,Kの内1つ）・数値（0~12の内1つ）をインスタンス化させるコンストラクタと、それらの情報を返すメソッドgetCardStringを作成してください。
// ♥8を例にコンソールに出力してください。

// ここから記述してください。

class Card {
  constructor(suit, value, intValue){
    this.suit = suit;
    this.value = value;
    this.intValue = intValue; 
  }
  getCardString(){
    return this.suit + this.value + "(" + this.intValue + ")";
  }
}

//let card1 = new Card("♥", "8", 8);
//console.log(card1.getCardString(card1));
//console.log(card1);

// デッキを表すクラスDeckを生成してください。
// Cardクラスを活用し、Deckクラスにトランプのカード全種類を生成させるgenerateDeckというメソッドを作成しましょう。
// デッキ、デッキに含まれる特定のカードをインデックスを操作してコンソールに出力してみましょう。
class Deck {
  constructor(gameMode = null) { 
      this.deck = Deck.generateDeck();
  }
  static generateDeck(gameMode = null) {
    let newDeck = [];
    const suits = ["♣", "♦", "♥", "♠"];
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const blackJack = {"A":1, "J":10, "Q":10, "K":10};

    for(let i = 0; i < suits.length; i++){
      for(let j = 0; j < values.length; j++){
        let currentValue = values[j];
        let intValue = (gameMode === "21") ? (currentValue in blackjack ? blackJack[currentValue] : parseInt(currentVValue)): j + 1;
        newDeck.push(new Card(suits[i], values[j], j+1));
      }
    }
    return newDeck;
  }

  //カードをドロー
  draw() {
    return this.deck.pop();
  }

  //デッキにあるカードをプリント
  printDeck() {
    console.log("Displaying cards...");
    for(let i = 0; i < this.deck.length; i++){
      console.log(this.deck[i].getCardString());
    }
  }
  
　//デッキをシャッフル
  shuffleDeck() {
    for(let i = this.deck.length - 1; i >= 0; i--) {
      let randomNum = Math.floor(Math.random() * (i + 1));
      let temp = this.deck[i];
      this.deck[i] = this.deck[randomNum];
      this.deck[randomNum] = temp; 
    }
  }
}
let deck1 = new Deck();

//deck1.shuffleDeck();
//console.log(deck1.deck[deck1.deck.length -1]);
//console.log(deck1.draw().getCardString());

//ディーラークラス（ステートレスオブジェクト）
class Dealer {
  //参加人数を受け取り、それぞれのプレイヤーにカードを配る
  static startGame(amountOfPlayers, gameMode){
    let table = {
      "players" : [],
      "gamemode" : gameMode,
      "deck" : new Deck(gameMode)
    }

    table["deck"].shuffleDeck();

    for(let i = 0; i < amountOfPlayers; i++){
      let playerCard = [];
      for(let j = 0; j < this.initialCards(gameMode); j++){
        playerCard.push(table["deck"].draw());
      }
      table["players"].push(playerCard);
    }
    return table;
  }

  static initialCards(gameMode) {
    if(gameMode == "poker") return 5;
    if(gameMode == "21") return 2;
  }

  static printTableInformation(table){
    console.log("Amount of players: " + table["players"].length + "... Game mode: " + table["gameMode"] + ". At this table: ");
    for(let i = 0; i < table["players"].length; i++){
      console.log("Player" + (i + 1) + "hand is: ");
      for(let j = 0; j < table["players"][i].length; j++){
        console.log(table["players"][i][j].getCardString());
      }
    }
  }

  static score21Individual(cards) {
    let value = 0;
    for(let i = 0; i < cards.length; i++){
      value += cards[i].intValue;
    }
    if(value > 21) value = 0;
    return value;
  }

  static winnerOf21(table) {
    let points = [];
    let cache = [];

    for(let i = 0; i < table["players"].length; i++){
      let point = Dealer.score21Individual(table["players"][i]);
      points.push(point);
      if(cache[point] >= 1) cache[point] += 1;
      else cache[point] = 1;
    }

    let winnerIndex = HelperFunctions.maxInArrayIndex(points);
    if (cache[points[winnerIndex]] > 1) return "It is a draw ";
    else if (cache[points[winnerIndex]] >= 0) return "player " + (winnerIndex + 1) + " is the winner";
    else return "No winners..";
  }
  // 卓のゲームの種類によって勝利条件を変更するcheckWinnerというメソッドを作成します。
  static checkWinner(table) {
    if (table["gameMode"] == "21") return Dealer.winnerOf21(table);
    else return "no game";
    }

}

class HelperFunctions {
  static maxInArrayIndex(intArr){
    let maxIndex = 0;
    let maxValue = intArr[0];
    
    for(let i = 1; i < intArr.length; i++){
      if(intArr[i] > maxValue) {
        maxValue = intArr[i];
        maxIndex = i;
      }
    }
    return maxIndex;
  }
}


let table1 = Dealer.startGame(1, "poker");
let table2 = Dealer.startGame(3, "21");

Dealer.printTableInformation(table1);
console.log(Dealer.checkWinner(table1));

Dealer.printTableInformation(table2);
console.log(Dealer.checkWinner(table2));