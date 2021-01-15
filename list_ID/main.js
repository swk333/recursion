// ペットを表現するための連想配列を利用します。
// JSはツールやライブラリーをできるだけ簡単に実装する傾向があります。したがって、JSでは連想配列はオブジェクトデータ型を使って実装されます。JSは変数の中に関数を保存することができます。オブジェクト型はデータ（メンバ変数）と関数（メソッド）をそれぞれキーと値のペアとして持つことができるので、他の言語でのオブジェクトと同じような機能を持っています。
// 連想配列を初期化するには、{} initialize構文を使用します。
// キーと値のペアを内部に配置します。構文は次のようになります: "{key}":value。複数の項目を配置する場合は，カンマ(,)が必要です。
let myPet = {
  "name":"fluffy",
  "species": "Pomeranian",
  "furColor": "Brown",
  "born": "2018/05/06",
  "favoriteFood": "Carrot sticks"
}

// nameを取得します。
console.log(myPet["name"]);

// ペットのfavorite foodを取得します。
console.log(myPet["favoriteFood"]);

// このmyPet辞書にさらに情報を追加します。
myPet["napTimes"] = "11:00am, 3:30pm, 9:00pm";
console.log(myPet["napTimes"]);


// 例題1
// 以下の車種,値段のペアを連想配列によって作成してください。
let carPrice = {
  "Honda Civic" : 24000,
  "Chevrolet Traverse" : 30000,
  "Toyota Camry" : 25000,
  "Subaru Outback" : 27000,
  "Tesla X" : 100000,
}

// Honda Civic -> 24,000
// Chevrolet Traverse -> 30,000
// Toyota Camry -> 25,000
// Subaru Outback -> 27,000
// Tesla X -> 100,000

// Tesla XとToyota Camryを取得してください。
console.log(carPrice["Tesla X"]);

// BMW X3 -> 42,000 を追加してください。
carPrice["BMW X3"] = 42000;
console.log(carPrice);