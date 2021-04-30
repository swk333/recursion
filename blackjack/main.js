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
      const suits = ["H", "D", "C", "S"];
      const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
      this.cards = [];
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
    promptPlayer(userData)
    {

        //this.gameStatus -> betting, acting, hit

        let betAmount = 0;
        let action = this.gameStatus;

        //AIの場合
        if(this.type === "ai"){
            //betting phaseの処理
            if(this.gameStatus === "betting"){
                const num = Math.floor(this.chips / 5);
                action = "bet";
                if(this.chips <= 5){
                    betAmount = this.chips;
                } else {
                    betAmount = (Math.floor(Math.random() * num) + 1) * 5;
                }
            } 
            //acting phaseの処理
            else if(this.gameStatus === "acting"){
                if(this.getHandScore() === 21){
                    action = "stand";
                } else {
                    const choices = ["surrender", "stand", "hit", "double"];
                    const i = Math.floor(Math.random() * 4);
                    const choice = choices[i];
                    action = choice;
                }
            } else if(this.gameStatus === "hit"){ //hitのとき
                const choices = ["surrender", "stand", "hit"];
                const i = Math.floor(Math.random() * 3);
                const choice = choices[i];
                action = choice;      
            } else { // broken
                action = "broken";
            }
        //houseの場合
        } else if(this.type === "house"){
            betAmount = -1;
            if(this.gameStatus === "betting"){
                action = "bet";
            } else{
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
                betAmount = userData;
            } else { // acting or hit のとき
                action = userData;
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
    evaluateMove(Player, userData)
    {
        // {betting, acting, surrender, stand, hit, double, bust, doublebust, broken}

        //gameStatus -> acting / hit
        const GD = Player.promptPlayer(userData);
        const betAmount = GD.amount;
        const action = GD.action;
        //betting終了時の処理
        if(action === "bet"){
            Player.gameStatus = "acting";
            Player.bet = betAmount;
        } else if(action === "surrender"){
            Player.gameStatus = "surrender";
        } else if(action === "hit"){
            Player.gameStatus = "hit";
            Player.hand.push(this.deck.drawOne());
            if(Player.getHandScore() > 21){
                Player.gameStatus = "bust";
            }
        } else if(action === "double"){
            Player.bet = Player.bet * 2;
            Player.hand.push(this.deck.drawOne());  
            if(Player.getHandScore() > 21){
                Player.gameStatus = "doublebust";
            } else {
                Player.gameStatus = "doublestand";
            }

        } else if(action === "stand"){
            Player.gameStatus = "stand";
            if(Player.getHandScore() > 21){
                Player.gameStatus = "bust";
            }
        } else {
            console.log("該当なし action:" + action);
        }
        console.log(Player.name + " " + action + " " + Player.gameStatus);
    }

    /*
       return String : 新しいターンが始まる直前の全プレイヤーの状態を表す文字列。
        NOTE: このメソッドの出力は、各ラウンドの終了時にテーブルのresultsLogメンバを更新するために使用されます。
    */
    blackjackEvaluateAndGetRoundResults()
    {

        
        let log = [];
        for(let i = 0; i < this.players.length-1; i++){
            const player = this.players[i];
            const house = this.house;
            const score = player.getHandScore();

            //bustの処理
            if(player.gameStatus === "bust" || player.gameStatus === "doublebust"){
                player.winAmount = player.bet * -1;

            } else if(player.gameStatus === "surrender"){
                player.winAmount = Math.floor(player.bet / 2) * -1;
            } else if(player.gameStatus === "stand" || player.gameStatus === "doublestand"){
                if(this.house.gameStatus === "bust"){
                    player.winAmount = player.bet;
                } else if(this.isBlackjack(house.hand) && this.isBlackjack(player.hand)) {
                    player.winAmount = 0;
                    player.gameStatus = "blackjack";
                } else if(this.isBlackjack(player.hand)){
                    player.winAmount = Math.floor(player.bet * 1.5);
                    player.gameStatus = "blackjack";
                } else if(score > house.getHandScore()){
                    player.winAmount = player.bet;
                } else if(score < house.getHandScore()){
                    player.winAmount = player.bet * -1;
                } else if(score === house.getHandScore()){
                    player.winAmount = 0;
                } else {
                    console.log("error");
                }
            }
            player.chips += player.winAmount;
            log.push("name:" + player.name + ", action:" + player.gameStatus + ", bet:" + player.bet + ", won:" + player.winAmount + ", chip:" + player.chips);
            //brokenの処理
            if(player.chips <= 0){
                player.gameStatus = "broken";
            }
        }
        return log;
    }

    isBlackjack(cards){
        let cardIsBJ = false;
        const faceCards = ["J", "Q", "K"];
        if(cards[0].rank === "A" && faceCards.includes(cards[1].rank)){
            cardIsBJ = true;
        } else if(cards[1].rank === "A" && faceCards.includes(cards[0].rank)){
            cardIsBJ = true;
        }
        return cardIsBJ;
    }

    /*
       return null : デッキから2枚のカードを手札に加えることで、全プレイヤーの状態を更新します。
       NOTE: プレイヤーのタイプが「ハウス」の場合は、別の処理を行う必要があります。
    */
    blackjackAssignPlayerHands()
    {
        for(let i = 0; i < this.players.length; i++){
            if(this.players[i].gameStatus === "broken"){
                this.players[i].hand.push(new Card("?", "?"), new Card("?", "?"));
            } else {
                this.players[i].hand.push(this.deck.drawOne(), this.deck.drawOne());
            }
        }
        
    }

    /*
       return null : テーブル内のすべてのプレイヤーの状態を更新し、手札を空の配列に、ベットを0に設定します。
    */
    blackjackClearPlayerHandsAndBets()
    {
        for(let i = 0; i < this.players.length; i++){
            this.players[i].hand = [];
            this.players[i].bet = 0;
            this.players[i].winAmount = 0;
            if(this.players[i].gameStatus !== "broken"){
                this.players[i].gameStatus = "betting";
            }
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
        if(gamePhase === "betting"){
            //一人目ならベット額とハンドを空にする
            if(this.onFirstPlayer()){
                this.blackjackClearPlayerHandsAndBets();
            }
            this.evaluateMove(player, userData);
            //betが終わったらgamePhaseをactingに移行し、初回カードを配る
            if(this.onLastPlayer()){
                this.blackjackAssignPlayerHands();
                this.gamePhase = "acting";
            }
        } else if(gamePhase === "acting"){ 
            if(player.gameStatus === "acting" || player.gameStatus === "hit"){ 
                this.evaluateMove(player, userData);
            } 
            //すべてのプレイヤーがアクションを終えたらevaluatingWinnerに移行する
            if(this.allPlayerActionsResolved()) this.gamePhase = "evaluatingWinner";
        } else if(gamePhase === "evaluatingWinner"){
            this.resultsLog.push(this.blackjackEvaluateAndGetRoundResults());
            this.gamePhase = "roundOver";
        } else {
            console.log("haveTurn内のerror")
        }
        this.turnCounter++;
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
        if(playerIndex === playerNum-1) return true;
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
            if(!(gameStatus === "surrender" || gameStatus === "bust" || gameStatus === "broken" || gameStatus === "stand" || gameStatus === "doublebust" || gameStatus === "doublestand"))
            isResolved = false;
        }
        return isResolved;
    }
};


class Rendering {
    /*---
    Method 
    void initializeGame() // tableの初期化、renderTable()の実行
    void renderTable(table) // レンダリングの実行　ユーザーのアクションを促すときとそれ以外で場合分け
    void renderingBtn(table) // bettingView : betボタンのレンダリング　
    divObj renderingActionView(table) // actionView: actingViewのDiv返す　r
    divObj renderingActionBtn(table) // actionView: actionBtnのDiv返す 
    divObj renderingCard(player) //actionView: cardのDiv返す
    divObj renderingPlayerInfo(player) // actionView: player情報のDiv返す
    divObj renderingHouseInfo(table) // actionView: house情報のDiv返す
    divObj renderingResult(table)
    */

    static initializeGame(){
        const gameDiv = document.getElementById("gameDiv");

        gameDiv.innerHTML = `
        <!-- login form div -->
        <div class="d-flex flex-column justify-content-center align-items-center">
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
        </div>
        `

        gameDiv.querySelector("#start").addEventListener("click", function(){
            const name = document.getElementById("name").value;
            const user = new Player(name, "user", "blackjack");
            const table = new Table("blackjack");
            table.players.unshift(user);
            Rendering.renderTable(table);
        });
    }
    static renderTable(table){ 
        const gameDiv = document.getElementById("gameDiv");
        const currentPlayer = table.getTurnPlayer();
        if(currentPlayer.type === "user" && currentPlayer.gameStatus === "betting"){
            gameDiv.innerHTML = ``;
            gameDiv.append(Rendering.renderingActionView(table));
            gameDiv.append(Rendering.renderingBtn(table));
        } else if(currentPlayer.type === "user" && (currentPlayer.gameStatus === "acting" || currentPlayer.gameStatus === "hit")){
            gameDiv.innerHTML = ``;
            gameDiv.append(Rendering.renderingActionView(table));
            gameDiv.append(Rendering.renderingActionBtn(table));
        } else if(table.gamePhase === "roundOver") {
            gameDiv.innerHTML = ``;
            gameDiv.append(Rendering.renderingActionView(table));
            gameDiv.append(Rendering.renderingResult(table));
        } else if(table.gamePhase === "betting"){
            table.haveTurn();
            Rendering.renderTable(table);
        } else {
            setTimeout(function(){
                table.haveTurn();
                Rendering.renderTable(table);
            }, 300)
        }
    }
    static renderingBtn(table){
        const renderingBtn = document.createElement("div");
        renderingBtn.classList.add("d-flex", "pb-5", "pt-4", "justify-content-center");
        renderingBtn.innerHTML = `
             <!-- betsDiv -->
            <div id="betsDiv" class="d-flex flex-column w-100">
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
                            <input type="text" class="input-number text-center" size="2" maxlength="5" value="0" min="0" max="">
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
                <div id="bet-submit" class="w-100 btn-success rem5 text-center bg-primary" style="cursor: pointer">
                    Submit your bet 
                <div><!-- end betSubmitDiv -->
            </div><!-- end betsDiv-->
            `
        const inputNumbers = renderingBtn.querySelectorAll(".input-number");
        const deno = table.betDenominations;
        const chip = table.players[0].chips;
        const caluculateBet = () =>{
            let bet = 0;
            inputNumbers.forEach((inputNumber, index) => {
                bet += inputNumber.value * deno[index];
            });
            return bet;
        }
        //ボタン操作
        const btnNumbers = renderingBtn.querySelectorAll(".btn-number");
        btnNumbers.forEach((btnNumber, index) => {
            const denoIndex = Math.floor(index/2);
            if(index % 2 === 0){
                btnNumber.addEventListener("click", () => {
                    if(inputNumbers[denoIndex].value > 0){
                        inputNumbers[denoIndex].value--;
                    }
                });
            } else {
                btnNumber.addEventListener("click", () => {
                    let bet = caluculateBet();
                    if(bet < chip){
                        inputNumbers[denoIndex].value++;
                    }
                });
            }
        });
        //submitボタン
        renderingBtn.querySelector("#bet-submit").addEventListener("click", function(){
            let bet = caluculateBet();
            if(bet > 0 && bet <= chip){
                table.haveTurn(caluculateBet());
                Rendering.renderTable(table);
                
            }
        });
        return renderingBtn;
    }
    static renderingActionView(table){
        const actingDiv = document.createElement("div");
        actingDiv.classList.add("pt-5");
        actingDiv.append(Rendering.renderingHouseInfo(table));

        const playersDiv = document.createElement("div");
        playersDiv.classList.add("d-flex", "justify-content-center");
        for(let i = 0; i < table.players.length - 1 ; i++){
            const playerDiv = document.createElement("div");
            playerDiv.classList.add("m-3");
            playerDiv.append(Rendering.renderingPlayerInfo(table.players[i]));
            playerDiv.append(Rendering.renderingCard(table.players[i], table.gamePhase));
            playersDiv.append(playerDiv);
        }
        actingDiv.append(playersDiv);
        return actingDiv;
    }
    static renderingActionBtn(table){
        const actionBtn = document.createElement("div");
        actionBtn.classList.add("d-flex", "flex-wrap", "w-70", "justify-content-center");
        actionBtn.innerHTML = `
            <div class="py-2">
                <a id="surrender" class="action-btn text-dark btn btn-light px-5 py-1">Surrender</a>
            </div>
            <div class="py-2">
                <a id="stand" class="action-btn btn btn-success px-5 py-1">Stand</a>
            </div>
            <div class="py-2">
                <a id="hit" class="action-btn btn btn-warning px-5 py-1">Hit</a>
            </div>
            <div class="py-2">
                <a id="double" class="action-btn btn btn-danger px-5 py-1">Double</a>
            </div>
            `
        const currentPlayer = table.getTurnPlayer();
            actionBtn.querySelector("#surrender").addEventListener("click", function(){
                table.haveTurn("surrender");
                Rendering.renderTable(table);
            },{ once: true })
            actionBtn.querySelector("#stand").addEventListener("click", function(){
                table.haveTurn("stand");
                Rendering.renderTable(table);
            },{ once: true })        
            actionBtn.querySelector("#hit").addEventListener("click", function(){
                table.haveTurn("hit");
                Rendering.renderTable(table);
            },{ once: true })
            actionBtn.querySelector("#double").addEventListener("click", function(){
                table.haveTurn("double");
                Rendering.renderTable(table);
            },{ once: true })

        if(currentPlayer.bet * 2 > currentPlayer.chips){
            actionBtn.querySelector("#double").classList.add("disabled");
        }
        if(table.turnCounter >= table.players.length * 2){
            actionBtn.querySelector("#surrender").classList.add("disabled");
            actionBtn.querySelector("#double").classList.add("disabled");
        }

        return actionBtn;
    }
    static renderingCard(player, gamePhase){
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("d-flex", "justify-content-center", "pt-3", "pb-5");
        
        if(gamePhase === "betting") {
            cardDiv.innerHTML += `
            <div class="bg-white border mx-2">
            <div class="text-center">
                <img src=${cardimg["?"]} alt="" width="50" height="50">
            </div>
            <div class="text-center">
                <p class="m-0 ">?</p>
            </div>
            </div>
            <div class="bg-white border mx-2">
            <div class="text-center">
                <img src=${cardimg["?"]} alt="" width="50" height="50">
            </div>
            <div class="text-center">
                <p class="m-0 ">?</p>
            </div>
            </div>
            `
        } else {
            player.hand.forEach((card) => {
                cardDiv.innerHTML += `
                <div class="bg-white border mx-2">
                    <div class="text-center">
                        <img src=${cardimg[card.suit]} alt="" width="50" height="50">
                    </div>
                    <div class="text-center">
                        <p class="m-0 ">${card.rank}</p>
                    </div>
                </div>
                `
            });
        }

        return cardDiv;
    }
    static renderingPlayerInfo(player){
        const playerInfoDiv = document.createElement("div");
        playerInfoDiv.classList.add("text-white", "d-flex", "flex-column", "m-0", "p-0");
        playerInfoDiv.innerHTML = `
                <h3>${player.name}</h3>
                <p class="rem1 text-left">S:${player.gameStatus} </p>
                <p class="rem1 text-left">B:${player.bet} </p>
                <p class="rem1 text-left">C:${player.chips} </p>
        `
        return playerInfoDiv;
    }
    static renderingHouseInfo(table){
        const house = table.house;
        const houseInfoDiv = document.createElement("div");
        const houseInfoCloseDiv = document.createElement("div");
        const houseInfoOpenDiv = document.createElement("div");

        houseInfoDiv.innerHTML = `
            <p class="m-0 text-center text-white rem3">Dealer</p>
            <p class="rem1 text-center text-white">S:${(table.gamePhase === "betting" || table.gamePhase === "acting")? "Waiting for Action" : house.gameStatus}</p>
            `
        houseInfoCloseDiv.innerHTML = `
            <div id="houesCardDiv" class="d-flex justify-content-center pt-3 pb-5">
                <div class="bg-white border mx-2">
                    <div class="text-center">
                        <img src=${(house.hand[0] === undefined)? cardimg["?"] :cardimg[house.hand[0].suit]} alt="" width="50" height="50">
                    </div>
                    <div class="text-center">
                        <p class="m-0 ">${(house.hand[0] === undefined)? "?" :house.hand[0].rank}</p>
                    </div>
                </div>
            </div>
        `
        houseInfoOpenDiv.append(Rendering.renderingCard(house));

        if(table.gamePhase === "acting" || table.gamePhase ==="betting"){
            houseInfoDiv.append(houseInfoCloseDiv);
        } else{
            houseInfoDiv.append(houseInfoOpenDiv);
        }

       return houseInfoDiv;
    }
    static renderingResult(table){
        const resultDiv = document.createElement("div");
        resultDiv.classList.add("text-white", "d-flex", "flex-column", "flex-wrap", "w-70", "justify-content-center");
        
        table.resultsLog.map((roundResult, roundCount) => {
            let roundDiv = document.createElement("div")
            roundDiv.innerHTML = `Round ${roundCount+1}:`
            roundResult.map((playerResult) => {
                let li = document.createElement("li");
                li.innerHTML = `${playerResult}`
                roundDiv.append(li);
            })
            resultDiv.append(roundDiv);
        });

        let gameOverBtn = document.createElement("div");
        gameOverBtn.classList.add("d-flex", "flex-wrap", "w-70", "justify-content-center");

        gameOverBtn.innerHTML = `
        <div class="py-2">
            <a id="game-over" class="action-btn text-dark btn btn-light px-5 py-1">NEW GAME</a>
        </div>
        `
        gameOverBtn.querySelector("#game-over").addEventListener("click", () => {
            Rendering.initializeGame();
        })

        let nextRoundBtn = document.createElement("div");
        nextRoundBtn.classList.add("d-flex", "flex-wrap", "w-70", "justify-content-center");
        nextRoundBtn.innerHTML = `
            <div class="py-2">
                <a id="next-round" class="action-btn text-dark btn btn-light px-5 py-1">NEXT ROUND</a>
            </div>
            `
        nextRoundBtn.querySelector("#next-round").addEventListener("click", () => {
            table.turnCounter = 0;
            table.gamePhase = "betting";
            table.deck.resetDeck();
            table.blackjackClearPlayerHandsAndBets();
            Rendering.renderTable(table);
        })

        if(table.players[0].gameStatus === "broken"){
            resultDiv.append(gameOverBtn);
        } else {
            resultDiv.append(nextRoundBtn);
        }

        return resultDiv;
    }
}

const cardimg = {
    "H": "https://recursionist.io/img/dashboard/lessons/projects/heart.png", 
    "D": "https://recursionist.io/img/dashboard/lessons/projects/diamond.png", 
    "C": "https://recursionist.io/img/dashboard/lessons/projects/clover.png", 
    "S": "https://recursionist.io/img/dashboard/lessons/projects/spade.png",
    "?": "https://recursionist.io/img/questionMark.png",
}

Rendering.initializeGame();

