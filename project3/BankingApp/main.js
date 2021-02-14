// 名前空間configを作成して、メンバ変数にinitialFormとbankPageの要素情報を保存してください。
// 名前空間がわからない方は、初級コンテンツ「クラスと名前空間」で復習しましょう。
// 名前空間を通じて、initial-formとbankPageにアクセスし、コンソールに出力しましょう。
// ここからJavaScriptを記述してください。
const config = {
  initialForm: document.getElementById("initial-form"),
  bankPage: document.getElementById("bankPage")
}

console.log(config.initialForm);
console.log(config.bankPage);

// 個々のユーザーをオブジェクトとして管理するためにBankAccountクラスを作成してください。
// firstName、lastName、email、type、moneyを入力として受け取って、メンバ変数を設定し、オブジェクトの初期値を決定してください。
// メンバ変数: firstName、lastName、email、type、money、initialDeposit
// getFullName()メソッドを作成してください。



// 具体的にユーザーを入れて出力してみましょう。
// "Elisa", "Jones", "elisa.jones@gmail.com", "checking", "30"
// getFullName()メソッドにアクセスし、コンソールに出力してみましょう。