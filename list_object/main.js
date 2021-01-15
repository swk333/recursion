// ハンター
class Hunter{
    constructor(name, age, weightKg, heightM, strength, cageCubicMeters){
        this.name = name;
        this.age = age;
        this.weightKg = weightKg;
        this.heightM = heightM;
        this.strength = strength;
        this.cageCubicMeters = cageCubicMeters;
    }

    canCaptureAnimal(animal){
        if ((this.strengthKg() >= animal.weightKg && this.cageCubicMeters >= animal.heightM) && !animal.predator){
            return true;
        } else {
            return false;
        }
    }

    attemptToDomesticate(animal){
        if (this.strengthKg() <= animal.weightKg * 2){
            return false;
        }
        animal.domesticate()
        return true;
    }

    strengthKg(){
        return this.weightKg * this.strength;
    }
}

function printHunter(hunter){
    console.log("The hunter's name is: " + hunter.name + ". This hunter can carry: " + hunter.strengthKg() + "kg and has a cage " + hunter.cageCubicMeters + " cubic meters wide");
}

// 動物
class Animal{
    constructor(species, weightKg, heightM, predator){
        this.species = species;
        this.weightKg = weightKg;
        this.heightM = heightM;
        this.predator = predator;
    }

    domesticate(){
        this.predator = false;
    }
}

function printAnimal(animal){
    console.log("The animal species is: " + animal.species + ". It's weight is: " + animal.weightKg + "kg and its height is: " + animal.heightM + "m. " + ((animal.predator) ? "It is a predator!" : "It is a peaceful animal."))
}

// 捕まえた動物を返す関数
function capturedAnimals(hunter, animalList){
    capturedAnimalList = [];
    for (i = 0; i < (animalList).length ; i++){
        // もし、ハンターが動物を捕獲した場合、配列の後ろに追加します。
        if (hunter.canCaptureAnimal(animalList[i])){
            console.log("Capturing..." + animalList[i].species);
            capturedAnimalList.push(animalList[i]);
        }
    }
    return capturedAnimalList;
}

function printAnimals(animalList){
    console.log("--Listing Animals--");
    // それぞれの動物にアクセスするためにfor文を使います。
    // 各animalListをループします。
    for (let i = 0; i < animalList.length; i++){
        console.log(animalList[i]);
    }
    console.log("------------------------");
}

// 各動物
let tiger1 = new Animal("Tiger", 290, 2.6, true);
let tiger2 = new Animal("Tiger", 300, 2.3, true);
let bear1 = new Animal("Bear", 250, 2.8, true);
let snake1 = new Animal("Snake", 250, 12.8, true);
let dog1 = new Animal("Dog", 90, 1.2, false);
let cat1 = new Animal("Cat", 40, 0.5, false);
let cow1 = new Animal("Cow", 1134, 1.5, false);

// 各ハンター
let hunternator = new Hunter("Hunternator", 30, 124.73, 1.85, 15, 3);
let hunterChild = new Hunter("Hunter Child Of The Small Giants", 10, 50, 1.2, 0.6, 1);

// 関数の呼び出し
printHunter(hunternator);
printAnimal(tiger1);

let animals = [tiger1, tiger2, bear1, snake1, dog1, cat1, cow1];
console.log("Animals in the wild: ");
printAnimals(animals);

console.log("Animals captured by: " + hunternator.name + "");
printAnimals(capturedAnimals(hunternator, animals));

console.log("Animals captured by: " + hunterChild.name + "");
printAnimals(capturedAnimals(hunterChild, animals));

console.log("" + hunternator.name + " is ready to bring peace to the animal kingdom.");

// domesticateTheAnimalsという関数を作成してください。この関数はハンターと動物のリストを受け取り、動物の状態を変更します。つまりハンターが動物より圧倒的に強ければ、飼い慣らされます。

// domesticateTheAnimals(hunternator, animals)
// print("Animals captured by: " + hunternator.name + "")
// printAnimals(capturedAnimals(hunternator, animals))