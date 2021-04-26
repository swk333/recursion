class Card
{

    /*
       String suit : {"H", "D", "C", "S"}から選択
       String rank : {"A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"}から選択
    */
    constructor(suit, rank)
    {
        // スート
        this.suit = suit
        // ランク
        this.rank = rank
    }

    /*
       return Number : カードのランクを基準とした整数のスコア。
       
        2-10はそのまま数値を返します。
    　  {"J", "Q", "K"}を含む、フェースカードは10を返します。
        "A」が1なのか11なのかを判断するには手札全体の知識が必要なので、「A」はとりあえず11を返します。
    */

    getRankNumber()
    {
      const cardRank = {
        "A" : 11,
        "2" : 2,
        "3" : 3,
        "4" : 4,
        "5" : 5,
        "6" : 6,
        "7" : 7,
        "8" : 8,
        "9" : 9,
        "10" : 10,
        "J" : 10,
        "Q" : 10,
        "K" : 10
      };
      return cardRank[this.rank];
    }
}

/*
// Deckモデルのアップデート
Deck constructor(String gameType): // gameTypeの文字列を受け取り、初期化されたデッキを返します。gameTypeがブラックジャックの場合、52枚のシャッフルされてないカードとしてデッキが初期化されます。デッキをシャッフルするにはシャッフルメソッドが使われます。
Card drawOne(): // カードの配列から先頭のカード要素をpopし、それを返します。
Void resetDeck(): // カードが尽きることがないように、各ラウンドの後にデッキをリセットしてシャッフルします。このメソッドは、デッキのカードの配列を52枚の新しいセットとして更新します。
*/

class Deck
{
    /*
       String gameType : ゲームタイプの指定。{'blackjack'}から選択。
    */
    constructor(gameType)
    {
        // このデッキが扱うゲームタイプ
        this.gameType = gameType

        // カードの配列
        this.cards = []

        // ゲームタイプによって、カードを初期化してください。
        const suits = ["H", "D", "C", "S"];
        const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  
        for(let i = 0; i < suits.length; i++){
          for(let j = 0;j < ranks.length; j++){
            this.cards.push(new Card(suits[i], ranks[j]));
          }
        }
        this.shuffle();

    }
    
    /*
       return null : このメソッドは、デッキの状態を更新します。

       カードがランダムな順番になるようにデッキをシャッフルします。
    */
    shuffle()
    {
      for(let i = 0; i < this.cards.length; i++){
        let n = Math.floor(Math.random() * 51);
        let temp = this.cards[i];
        this.cards[i] = this.cards[n];
        this.cards[n] = temp;
      }
    }

    /*
       String gameType : どのゲームにリセットするか
       return null : このメソッドは、デッキの状態を更新します。
    */
    resetDeck()
    {
      // this.cards = [];
      const suits = ["H", "D", "C", "S"];
      const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
      for(let i = 0; i < suits.length; i++){
        for(let j = 0;j < ranks.length; j++){
          this.cards.push(new Card(suits[i], ranks[j]));
        }
      }
      
      this.shuffle();
    }
    
    /*
       return Card : ポップされたカードを返します。
       カード配列から先頭のカード要素をポップして返します。
    */
    drawOne()
    {
      const card = this.cards[0];
      this.cards.shift();
      return card;
    }
}


/*--
// Playerモデルのアップデート
Player constructor(String name, String type, String gameType, ?Number chips): // コンストラクタは、プレイヤー名を表す文字列、プレイヤータイプを表す文字列、gameTypeを表す文字列、プレイヤーが最初に使用するチップ数を表すオプションの数値を受け取り、プレイヤーを返します。デフォルトでは、プレイヤーに400チップを与えることにしています。

String type: // {'ai', 'house', 'user'}から選択します。これによって、AIプレイヤーの場合は判断を自動化したり、ハウスの場合は全てのプレイヤーが終了するまで待ってから行動するなど、さまざまなアクションを実行できるようになります。

GameDecision promptPlayer(?Number userData): // 元々の設計からmakeBetとtakeActionを削除して、プレイヤーがどのようなベットやアクションを取るべきか判断するための方法を作ることにしました。タイプ、手札、チップを含めたプレイヤーの状態を読み取り、GameDecisionを返します。また、このメソッドは与えられたユーザーのタイプやゲームの状況に応じて、他の挙動を呼び出すことができます。パラメータにuserData使うことによって、プレイヤーが「user」の場合、このメソッドにユーザーの情報を渡すことができますし、プレイヤーが 「ai」の場合、 userDataがデフォルトとしてnullを使います。

Number winAmount: // 整数0から言語でサポートされる最大の整数。これは、各ラウンド終了時の勝ち負けの金額を表します。勝ち負けの金額は実際のベット額とは異なる場合があるため（例：ベット額が200で、ダブルで勝負すると400になります）、結果を表示する際には両方の値を記録しておく必要があります。

Number getHandScore(): // Card.getRankNumber()を使用して、プレイヤーの手札にあるすべてのカードの値の合計を返します。手札の合計が21以上の場合は、スコアが21未満になるまで、手札の各エースを1としてカウントします。
--*/

class Player
{
    /*
        String name : プレイヤーの名前
        String type : プレイヤータイプ。{'ai', 'user', 'house'}から選択。
        String gameType : {'blackjack'}から選択。プレイヤーの初期化方法を決定するために使用されます。
        ?Number chips : ゲーム開始に必要なチップ。デフォルトは400。
    */
    constructor(name, type, gameType, chips = 400)
    {
        // プレイヤーの名前
        this.name = name;

        // プレイヤーのタイプ
        this.type = type;

        // 現在のゲームタイプ
        this.gameType = gameType;

        // プレイヤーの手札
        this.hand = [];

        // プレイヤーが所持しているチップ。
        this.chips = chips;

        // 現在のラウンドでのベットしているチップ
        this.bet = 0

        // 勝利金額。正の数にも負の数にもなります。
        this.winAmount = 0 

        // プレイヤーのゲームの状態やアクションを表します。
        // ブラックジャックの場合、最初の状態は「betting」です。
        this.gameStatus = "betting"
    }

    /*
       ?Number userData : モデル外から渡されるパラメータ。nullになることもあります。
       return GameDecision : 状態を考慮した上で、プレイヤーが行った決定。

        このメソッドは、どのようなベットやアクションを取るべきかというプレイヤーの決定を取得します。プレイヤーのタイプ、ハンド、チップの状態を読み取り、GameDecisionを返します。パラメータにuserData使うことによって、プレイヤーが「user」の場合、このメソッドにユーザーの情報を渡すことができますし、プレイヤーが 「ai」の場合、 userDataがデフォルトとしてnullを使います。
    */
    promptPlayer(userData = {"betAmount": 100, "action": "hit"})
    {

        let betAmount = 0;
        let action = this.gameStatus;

        //AIの場合
        if(this.type === "ai"){
            //betting phaseの処理
            if(this.gameStatus === "betting"){
                action = "bet";
                betAmount = (Math.floor(Math.random() * 80) + 1) * 5;
            } 
            //acting phaseの処理
            else if(this.gameStatus === "acting"){
                const choices = ["surrender", "stand", "hit", "double"];
                const i = Math.floor(Math.random() * 4);
                const choice = choices[i];
                action = choice;
            }
        //houseの場合
        } else if(this.type === "house"){
            betAmount = -1;
            if(this.gameStatus === "betting"){
                action = "bet";
            } else if(this.gameStatus === "acting"){
                if(this.getHandScore() < 17) {
                    action = "hit";
                } else {
                    action = "stand";
                }
            }
        //userの場合
        } else {
            if(this.gameStatus === "betting"){
                action = "bet";
                betAmount = userData[betAmount];
            } else if(this.gameStatus === "acting"){
                action = userData[action];
            }
        }
            
        let GD = new GameDecision(action, betAmount);
        return GD;
    }

    /*
       return Number : 手札の合計

       合計が21を超える場合、手札の各エースについて、合計が21以下になるまで10を引きます。
    */
    getHandScore()
    {
        let score = 0;
        for(let i = 0; i < this.hand.length; i++){
            score +=  this.hand[i].getRankNumber();
            if(score > 21 && this.hand[i].rank === "A"){
                score -= 10;
            }
        }

        return score;
    }

    // winAmount()
    // {
        
    //     let winAmountMoney = this.bet;

    //     if(this.gameStatus === "bust"){
    //         winAmountMoney = this.bet * -1;
    //     }
    //     this.winAmount = winAmountMoney;

    //     return winAmountMoney;
    // }
}

class GameDecision
{
    /*
       String action : プレイヤーのアクションの選択。（ブラックジャックでは、hit、standなど。）
       Number amount : プレイヤーが選択する数値。

       これはPlayer.promptPlayer()は常にreturnする、標準化されたフォーマットです。
    */
    constructor(action, amount)
    {
        // アクション
        this.action = action
        
        // プレイヤーが選択する数値
        this.amount = amount
    }
}


class Table
{
    /*
       String gameType : {"blackjack"}から選択。
       Array betDenominations : プレイヤーが選択できるベットの単位。デフォルトは[5,20,50,100]。
       return Table : ゲームフェーズ、デッキ、プレイヤーが初期化されたテーブル
    */
    constructor(gameType, betDenominations = [5,20,50,100])
    {
        // ゲームタイプを表します。
        this.gameType = gameType;
        
        // プレイヤーが選択できるベットの単位。
        this.betDenominations = betDenominations;
        
        // テーブルのカードのデッキ
        this.deck = new Deck(this.gameType);
        
        // プレイヤーをここで初期化してください。
        this.players = [];
        this.house = new Player('house', 'house', this.gameType);
        const AI1 = new Player("AI1", "ai", "blackjack");
        const AI2 = new Player("AI2", "ai", "blackjack");
        this.players.push(AI1, AI2, this.house);    
        
        //初回フェーズ
        //{betting, acting, evaluatingWinner, gameOver}
        this.gamePhase = "betting";
        // これは各ラウンドの結果をログに記録するための文字列の配列です。
        this.resultsLog = []
        this.turnCounter = 0;

    }
    /*
        Player player : テーブルは、Player.promptPlayer()を使用してGameDecisionを取得し、GameDecisionとgameTypeに応じてPlayerの状態を更新します。
        return Null : このメソッドは、プレーヤの状態を更新するだけです。

        EX:
        プレイヤーが「ヒット」し、手札が21以上の場合、gameStatusを「バスト」に設定し、チップからベットを引きます。
    */
    evaluateMove(Player)
    {
        const GD = Player.promptPlayer();
        const betAmount = GD.amount;
        const action = GD.action;

        //betting終了時の処理
        if(action === "bet"){
            Player.gameStatus = "acting";
            Player.bet = betAmount;
        } else {
            
        //acting最中の処理
            if(action === "surrender"){
                Player.gameStatus = action;

            } else if(action === "hit"){
                Player.gameStatus = "acting";
                Player.hand.push(this.deck.drawOne());

            } else if(action === "double"){
                Player.gameStatus = action;
                Player.bet = Player.bet * 2;
                Player.hand.push(this.deck.drawOne());  

            } else if(action === "stand"){
                Player.gameStatus = action;
            }
        }

        const score = Player.getHandScore();
        if(score > 21 && Player.gameStatus === "double"){
            Player.gameStatus = "doublebust";
        } else if(score > 21){
            Player.gameStatus = "bust";
        }
        //brokenの処理
        if(Player.chips < 0){
            Player.gameStatus = "broken";
        }
        console.log("name:" + Player.name + " action:" + action + " status:" + Player.gameStatus + " bet:" + Player.bet);
        
    }

    /*
       return String : 新しいターンが始まる直前の全プレイヤーの状態を表す文字列。
        NOTE: このメソッドの出力は、各ラウンドの終了時にテーブルのresultsLogメンバを更新するために使用されます。
    */
    blackjackEvaluateAndGetRoundResults()
    {
        

        let log = [];
        for(let i = 0; i < this.players.length; i++){
            const player = this.players[i];
            const house = this.house;
            const score = player.getHandScore();

            //bustの処理
            if(player.gameStatus === "bust"){
                player.chips -= player.bet;
            } else if(player.gameStatus === "doublebust"){
                player.chips -= player.bet * 2;
            } else if(player.gameStatus === "surrender"){
                player.chips -= Math.floor(player.bet / 2);
            } else if(player.gameStatus === ("stand" || "double" || "hit")){

                //todo:blackjackの場合


                //blackjack以外の場合
                if(player.getHandScore() > house.getHandScore()){
                    player.winAmount = player.bet;
                    player.chip += player.winAmount;
                } else if(player.getHandScore() < house.getHandScore()){
                    player.chip -= player.bet;
                }
            }
            
            log += ["name:" + player.name + ", action:" + player.gameStatus + ", bet:" + player.bet + ", won:" + player.winAmount + ", chip:" + player.chips + "/ "];
        }
        return log;
    }

    /*
       return null : デッキから2枚のカードを手札に加えることで、全プレイヤーの状態を更新します。
       NOTE: プレイヤーのタイプが「ハウス」の場合は、別の処理を行う必要があります。
    */
    blackjackAssignPlayerHands()
    {
        for(let i = 0; i < this.players.length; i++){
            this.players[i].hand.push(this.deck.drawOne(), this.deck.drawOne());
        }
        //todo: ハウスの場合の処理？？
        
    }

    /*
       return null : テーブル内のすべてのプレイヤーの状態を更新し、手札を空の配列に、ベットを0に設定します。
    */
    blackjackClearPlayerHandsAndBets()
    {
        for(let i = 0; i < this.players.length; i++){
            this.players[i].hand = [];
            this.players[i].bet = 0;
        }
    }
    
    /*
       return Player : 現在のプレイヤー
    */
    getTurnPlayer()
    {
        const playerNum = this.players.length;
        const playerIndex = this.turnCounter % playerNum;

        return this.players[playerIndex];
    }

    /*
       Number userData : テーブルモデルの外部から渡されるデータです。 
       return Null : このメソッドはテーブルの状態を更新するだけで、値を返しません。
    */
    haveTurn(userData)
    {   
        const player = this.getTurnPlayer();
        const gamePhase = this.gamePhase;
        if(player.type === "user"){
            console.log("user in haveTurn");
        }

        //betting Phase
        if(gamePhase === "betting"){
            //一人目ならベット額とハンドを空にする
            if(this.onFirstPlayer()){
                this.blackjackClearPlayerHandsAndBets();
            }
            this.evaluateMove(player);
            this.turnCounter++;
            //betが終わったらgamePhaseをactingに移行し、初回カードを配る
            if(this.onLastPlayer()){
                this.blackjackAssignPlayerHands();
                this.gamePhase = "acting";
            }
        //acting Phase
        } else if(gamePhase === "acting"){ 
            //bustの処理?
            if(player.gameStatus === ("bust" || "stand" || "surrender" || "doublebust" || "broken" || "double")){
                this.turnCounter++;
            } else {
                this.evaluateMove(player);
                this.turnCounter++;
            }

            //すべてのプレイヤーがアクションを終えたらevaluatingWinnerに移行する

            if(this.allPlayerActionsResolved()) this.gamePhase = "evaluatingWinner";
        
        //evaluatingWinner Phase
        } else if(gamePhase === "evaluatingWinner"){
            this.resultsLog += this.blackjackEvaluateAndGetRoundResults();
            this.turnCounter = 0;
            this.gamePhase = "roundOver";
        
        } 

  
    }

    /*
        return Boolean : テーブルがプレイヤー配列の最初のプレイヤーにフォーカスされている場合はtrue、そうでない場合はfalseを返します。
    */
    onFirstPlayer()
    {
        const playerNum = this.players.length;
        const playerIndex = this.turnCounter % playerNum;
        if(playerIndex === 0) return true;
        else return false;
    }

    /*
        return Boolean : テーブルがプレイヤー配列の最後のプレイヤーにフォーカスされている場合はtrue、そうでない場合はfalseを返します。
    */
    onLastPlayer()
    {
        const playerNum = this.players.length;
        const playerIndex = this.turnCounter % playerNum;
        if(playerIndex === playerNum - 1) return true;
        else return false;    
    }
    
    /*
        全てのプレイヤーがセット{'broken', 'bust', 'stand', 'surrender'}のgameStatusを持っていればtrueを返し、持っていなければfalseを返します。
    */
    allPlayerActionsResolved()
    {
        let isResolved = true;
        for(let i = 0; i < this.players.length; i++){
            let gameStatus = this.players[i].gameStatus;
            if(!(gameStatus === "surrender" || gameStatus === "bust" || gameStatus === "broken" || gameStatus === "stand"))
            isResolved = false;
        }
        return isResolved;
    }
};

// let table1 = new Table("blackjack");
// while(table1.gamePhase != 'roundOver'){
//     table1.haveTurn();
// }
    
// console.log(table1.resultsLog);




class Rendering {
    
    static initializeGame(){
        const gameDiv = document.getElementById("gameDiv");
        gameDiv.innerHTML = `
        <!-- login form div -->
        <div>
            <p class="text-white" > Welcome to Card Game! </p>
            <!-- name field div -->
            <div>
                <input type="text" placeholder="name" id="name">
            </div>
            <!-- game type div -->
            <div>
                <select class="w-100">
                    <option value="blackjack">Blackjack </option>
                    <!-- <option value="poker">Poker </option> -->
                </select>
            </div>
            <!-- submit div -->
            <div>
                <a class="btn btn-success" id="start">Start Game </a>
            </div>
        </div>`

        document.getElementById("start").addEventListener("click", function(){
            const name = document.getElementById("name").value;
            const user = new Player(name, "user", "blackjack");
            const table = new Table("blackjack");
            table.players.unshift(user);
            Rendering.renderTable(table);
        });
    }

    static renderTable(table){
        const gameDiv = document.getElementById("gameDiv");
        const bettingView = `
        <!-- all cards (dealer, players) div -->
        <div class="col-12">
            <div class="pt-5">
                <p class="m-0 text-center text-white rem3">Dealer</p>
      
                <!-- House Card Row -->
                <div id="houesCardDiv" class="d-flex justify-content-center pt-3 pb-5">
      
                    <div class="bg-white border mx-2">
                        <div class="text-center">
                            <img src="/img/dashboard/lessons/projects/spade.png" alt="" width="50" height="50">
                        </div>
                        <div class="text-center">
                            <p class="m-0 ">7</p>
                        </div>
                    </div>
      
                    <div class="bg-white border mx-2">
                        <div class="text-center">
                            <img src="/img/dashboard/lessons/projects/diamond.png" alt="" width="50" height="50">
                        </div>
                        <div class="text-center">
                            <p class="m-0">8</p>
                        </div>
                    </div>
      
                    <div class="bg-white border mx-2">
                        <div class="text-center">
                            <img src="/img/dashboard/lessons/projects/heart.png" alt="" width="50" height="50">
                        </div>
                        <div class="text-center">
                            <p class="m-0">9</p>
                        </div>
                    </div>
                </div>
            </div>
      
            <div class="">
      
                <!-- Players Div -->
                <div id="playersDiv" class="d-flex justify-content-center">
      
                    <!-- nonCurPlayerDiv 1-->
                    <div id="nonCurPlayer1Div" class="flex-column">
      
                        <p class="m-0 text-white text-center rem3">ai1</p>
      
                        <!-- playerInfoDiv -->
                        <div class="text-white d-flex m-0 p-0 justify-content-between">
                            <p class="rem1 text-left">S:BUST </a>
                            <p class="rem1 text-left">B:0 </a>
                            <p class="rem1 text-left">R:255 </a>
                        </div>
                        <!-- cardsDiv -->
                        <div class="d-flex justify-content-center">
                            <div class="bg-white border mx-2">
                                <div class="text-center">
                                    <img src="/img/dashboard/lessons/projects/heart.png" alt="" width="50" height="50">
                                </div>
                                <div class="text-center">
                                    <p class="m-0">2</p>
                                </div>
                            </div>
                            <div class="bg-white border mx-2">
                                <div class="text-center">
                                    <img src="/img/dashboard/lessons/projects/clover.png" alt="" width="50" height="50">
                                </div>
                                <div class="text-center">
                                    <p class="m-0">10</p>
                                </div>
                            </div>
                            <div class="bg-white border mx-2">
                                <div class="text-center">
                                    <img src="/img/dashboard/lessons/projects/spade.png" alt="" width="50" height="50">
                                </div>
                                <div class="text-center">
                                    <p class="m-0">8</p>
                                </div>
                            </div><!-- end card -->
                        </div><!-- end Cards -->
                    </div><!-- end player -->
      
                    <!-- curPlayerDiv -->
                    <div id = "curPlayerDiv" class="flex-column w-50">
                        <p class="m-0 text-white text-center rem3">ai2</p>
      
                        <!-- playerInfoDiv -->
                        <div class="text-white d-flex m-0 p-0 justify-content-center">
                            <p class="rem1 text-left">S:BUST </a>
                            <p class="rem1 text-left">B:0 </a>
                            <p class="rem1 text-left">R:255 </a>
                        </div>
      
                        <!-- cardsDiv -->
                        <div class="d-flex justify-content-center">
                            <div class="bg-white border mx-2">
                                <div class="text-center">
                                    <img src="/img/dashboard/lessons/projects/heart.png" alt="" width="50" height="50">
                                </div>
                                <div class="text-center">
                                    <p class="m-0">2</p>
                                </div>
                            </div>
                            <div class="bg-white border mx-2">
                                <div class="text-center">
                                    <img src="/img/dashboard/lessons/projects/clover.png" alt="" width="50" height="50">
                                </div>
                                <div class="text-center">
                                    <p class="m-0">10</p>
                                </div>
                            </div>
                            <div class="bg-white border mx-2">
                                <div class="text-center">
                                    <img src="/img/dashboard/lessons/projects/spade.png" alt="" width="50" height="50">
                                </div>
                                <div class="text-center">
                                    <p class="m-0">8</p>
                                </div>
                            </div><!-- end card -->
                        </div><!-- end Cards -->
                    </div><!-- end player -->
      
                    <!-- nonCurPlayer2Div -->
                    <div id="nonCurPlayer2Div" class="flex-column">
      
                        <p class="m-0 text-white text-center rem3">${table.players[table.players.length - 1].name}</p>
      
                        <!-- playerInfoDiv -->
                        <div class="text-white d-flex m-0 p-0 justify-content-between">
                            <p class="rem1 text-left">S:BUST </a>
                            <p class="rem1 text-left">B:0 </a>
                            <p class="rem1 text-left">R:255 </a>
                        </div>
      
                        <!-- cardsDiv -->
                        <div class="d-flex justify-content-center">
                            <div class="bg-white border mx-2">
                                <div class="text-center">
                                    <img src="/img/dashboard/lessons/projects/heart.png" alt="" width="50" height="50">
                                </div>
                                <div class="text-center">
                                    <p class="m-0">2</p>
                                </div>
                            </div>
                            <div class="bg-white border mx-2">
                                <div class="text-center">
                                    <img src="/img/dashboard/lessons/projects/clover.png" alt="" width="50" height="50">
                                </div>
                                <div class="text-center">
                                    <p class="m-0">10</p>
                                </div>
                            </div>
                            <div class="bg-white border mx-2">
                                <div class="text-center">
                                    <img src="/img/dashboard/lessons/projects/spade.png" alt="" width="50" height="50">
                                </div>
                                <div class="text-center">
                                    <p class="m-0">8</p>
                                </div>
                            </div><!-- end card -->
                        </div><!-- end Cards -->
                    </div><!-- end player -->
                </div><!-- end players -->
      
                <!-- actionsAndBetsDiv -->
                <div id="actionsAndBetsDiv" class="d-flex pb-5 pt-4 justify-content-center">
                     <!-- betsDiv -->
                    <div id="betsDiv" class="d-flex flex-column w-50">
                        <!-- bottom half of bets including chip increments and submit  -->
                        <div class="py-2 h-60 d-flex justify-content-between">
                            <!-- betChoiceDiv -->
                            <div>
                                <div class="input-group" >
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-danger btn-number">
                                            -
                                        </button>
                                    </span>
                                    <input type="text" class="input-number text-center" size="2" maxlength="5" value="3">
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-success btn-number">
                                            +
                                        </button>
                                    </span>
                                </div><!--end input group div -->
                                <p class="text-white text-center">5</p>
                            </div> <!-- end betChoiceDiv -->
                            <!-- betChoiceDiv -->
                            <div>
                                <div class="input-group" >
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-danger btn-number">
                                            -
                                        </button>
                                    </span>
                                    <input type="text" class="input-number text-center" size="2" maxlength="5" value="0">
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-success btn-number">
                                            +
                                        </button>
                                    </span>
                                </div><!--end input group div -->
                                <p class="text-white text-center">20</p>
                            </div> <!-- end betChoiceDiv -->
                            <!-- betChoiceDiv -->
                            <div>
                                <div class="input-group" >
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-danger btn-number">
                                            -
                                        </button>
                                    </span>
                                    <input type="text" class="input-number text-center" size="2" maxlength="5" value="0">
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-success btn-number">
                                            +
                                        </button>
                                    </span>
                                </div><!--end input group div -->
                                <p class="text-white text-center">50</p>
                            </div> <!-- end betChoiceDiv -->
                            <!-- betChoiceDiv -->
                            <div>
                                <div class="input-group" >
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-danger btn-number">
                                            -
                                        </button>
                                    </span>
                                    <input type="text" class="input-number text-center" size="2" maxlength="5" value="0">
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-success btn-number">
                                            +
                                        </button>
                                    </span>
                                </div><!--end input group div -->
                                <p class="text-white text-center">100</p>
                            </div> <!-- end betChoiceDiv -->
                        </div><!-- end bestSelectionDiv -->
                        <!-- betSubmitDiv -->
                        <div id="bet-submit" class="w-100 btn-success rem5 text-center bg-primary">
                            Submit your bet
                        </div><!-- end betSubmitDiv -->
                    </div><!-- end betsDiv-->
      
                </div><!-- end actionsAndBetsDiv-->
            </div>
        </div>
        `
        const actingView =`
        <!-- all cards (dealer, players) div -->
        <div class="col-12">
            <div class="pt-5">
                <p class="m-0 text-center text-white rem3">Dealer</p>
    
                <!-- House Card Row -->
                <div id="houesCardDiv" class="d-flex justify-content-center pt-3 pb-5">
    
                    <div class="bg-white border mx-2">
                        <div class="text-center">
                            <img src="/img/dashboard/lessons/projects/spade.png" alt="" width="50" height="50">
                        </div>
                        <div class="text-center">
                            <p class="m-0 ">7</p>
                        </div>
                    </div>
    
                    <div class="bg-white border mx-2">
                        <div class="text-center">
                            <img src="/img/dashboard/lessons/projects/diamond.png" alt="" width="50" height="50">
                        </div>
                        <div class="text-center">
                            <p class="m-0">8</p>
                        </div>
                    </div>
    
                    <div class="bg-white border mx-2">
                        <div class="text-center">
                            <img src="/img/dashboard/lessons/projects/heart.png" alt="" width="50" height="50">
                        </div>
                        <div class="text-center">
                            <p class="m-0">9</p>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="">
    
                <!-- Players Div -->
                <div id="playersDiv" class="d-flex justify-content-center">
    
                    <!-- nonCurPlayerDiv 1-->
                    <div id="nonCurPlayer1Div" class="flex-column">
    
                        <p class="m-0 text-white text-center rem3">ai1</p>
    
                        <!-- playerInfoDiv -->
                        <div class="text-white d-flex m-0 p-0 justify-content-between">
                            <p class="rem1 text-left">S:BUST </a>
                            <p class="rem1 text-left">B:0 </a>
                            <p class="rem1 text-left">R:255 </a>
                        </div>
                        <!-- cardsDiv -->
                        <div class="d-flex justify-content-center">
                            <div class="bg-white border mx-2">
                                <div class="text-center">
                                    <img src="/img/dashboard/lessons/projects/heart.png" alt="" width="50" height="50">
                                </div>
                                <div class="text-center">
                                    <p class="m-0">2</p>
                                </div>
                            </div>
                            <div class="bg-white border mx-2">
                                <div class="text-center">
                                    <img src="/img/dashboard/lessons/projects/clover.png" alt="" width="50" height="50">
                                </div>
                                <div class="text-center">
                                    <p class="m-0">10</p>
                                </div>
                            </div>
                            <div class="bg-white border mx-2">
                                <div class="text-center">
                                    <img src="/img/dashboard/lessons/projects/spade.png" alt="" width="50" height="50">
                                </div>
                                <div class="text-center">
                                    <p class="m-0">8</p>
                                </div>
                            </div><!-- end card -->
                        </div><!-- end Cards -->
                    </div><!-- end player -->
    
                    <!-- curPlayerDiv -->
                    <div id = "curPlayerDiv" class="flex-column w-50">
                        <p class="m-0 text-white text-center rem3">ai2</p>
    
                        <!-- playerInfoDiv -->
                        <div class="text-white d-flex m-0 p-0 justify-content-center">
                            <p class="rem1 text-left">S:BUST </a>
                            <p class="rem1 text-left">B:0 </a>
                            <p class="rem1 text-left">R:255 </a>
                        </div>
    
                        <!-- cardsDiv -->
                        <div class="d-flex justify-content-center">
                            <div class="bg-white border mx-2">
                                <div class="text-center">
                                    <img src="/img/dashboard/lessons/projects/heart.png" alt="" width="50" height="50">
                                </div>
                                <div class="text-center">
                                    <p class="m-0">2</p>
                                </div>
                            </div>
                            <div class="bg-white border mx-2">
                                <div class="text-center">
                                    <img src="/img/dashboard/lessons/projects/clover.png" alt="" width="50" height="50">
                                </div>
                                <div class="text-center">
                                    <p class="m-0">10</p>
                                </div>
                            </div>
                            <div class="bg-white border mx-2">
                                <div class="text-center">
                                    <img src="/img/dashboard/lessons/projects/spade.png" alt="" width="50" height="50">
                                </div>
                                <div class="text-center">
                                    <p class="m-0">8</p>
                                </div>
                            </div><!-- end card -->
                        </div><!-- end Cards -->
                    </div><!-- end player -->
    
                    <!-- nonCurPlayer2Div -->
                    <div id="nonCurPlayer2Div" class="flex-column">
    
                        <p class="m-0 text-white text-center rem3">Yuki</p>
    
                        <!-- playerInfoDiv -->
                        <div class="text-white d-flex m-0 p-0 justify-content-between">
                            <p class="rem1 text-left">S:BUST </a>
                            <p class="rem1 text-left">B:0 </a>
                            <p class="rem1 text-left">R:255 </a>
                        </div>
    
                        <!-- cardsDiv -->
                        <div class="d-flex justify-content-center">
                            <div class="bg-white border mx-2">
                                <div class="text-center">
                                    <img src="/img/dashboard/lessons/projects/heart.png" alt="" width="50" height="50">
                                </div>
                                <div class="text-center">
                                    <p class="m-0">2</p>
                                </div>
                            </div>
                            <div class="bg-white border mx-2">
                                <div class="text-center">
                                    <img src="/img/dashboard/lessons/projects/clover.png" alt="" width="50" height="50">
                                </div>
                                <div class="text-center">
                                    <p class="m-0">10</p>
                                </div>
                            </div>
                            <div class="bg-white border mx-2">
                                <div class="text-center">
                                    <img src="/img/dashboard/lessons/projects/spade.png" alt="" width="50" height="50">
                                </div>
                                <div class="text-center">
                                    <p class="m-0">8</p>
                                </div>
                            </div><!-- end card -->
                        </div><!-- end Cards -->
                    </div><!-- end player -->
                </div><!-- end players -->
    
                <!-- actionsAndBetsDiv -->
                <div id="actionsAndBetsDiv" class="d-flex pb-5 pt-4 justify-content-center">
    
                    <!-- actionsDiv -->
                    <div id ="actionsDiv" class="d-flex flex-wrap w-70">
                        <div class="py-2">
                            <a class="text-dark btn btn-light px-5 py-1">Surrender</a>
                        </div>
                        <div class="py-2">
                            <a class="btn btn-success px-5 py-1">Stand</a>
                        </div>
                        <div class="py-2">
                            <a class="btn btn-warning px-5 py-1">Hit</a>
                        </div>
                        <div class="py-2">
                            <a class="btn btn-danger px-5 py-1">Double</a>
                        </div>
                    </div> <!-- end actionsDiv -->
                </div><!-- end actionsAndBetsDiv-->
            </div>
        </div>
        `
        console.log(table)

        if(table.getTurnPlayer().type === "user"){
            if(table.gamePhase === "betting"){
                gameDiv.innerHTML = bettingView;
                
                document.getElementById("bet-submit").addEventListener("click", function(){
                    table.haveTurn();
                    Rendering.renderTable(table);
                });
                
            } else if(table.gamePhase === "acting"){
                gameDiv.innerHTML = actingView;
            }
            
            
        } else {
            setTimeout(function(){
                table.haveTurn();
                Rendering.renderTable(table);
            }, 1000)
        }
        

        
    }
    /*
    renderTable(table): // 画面をクリアして、新しいビューを画面に追加します。このビューは、テーブルに渡されたものを視覚的にレンダリングします。
if table.getTurnPlayer().type == 'user'
    - もしgamePhaseが"bets"なら、ベットビューを追加します。
    - gamePhaseが"acting"で、ユーザーがアクションを取ることができる場合は、アクションビューを追加します。
    - これらの追加のビューにはイベントリスナーが接続されており、コントローラとして動作します。これらのコントローラは userDataをビュー（<input type = "text">など）から手に入れてhaveTurnに渡し、その後 renderTable(table) を呼び出して更新された状態を表示します。
    - 追加のロジック

else
    - プレイヤーが考えているかのように錯覚させるためにx秒待ちます。
    - table.haveTurn()
    - renderTable(table)
    */
};

Rendering.initializeGame();
