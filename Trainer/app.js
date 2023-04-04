import {DecisionTree} from "./libraries/decisiontree.js"
import {VegaTree} from "./libraries/vegatree.js"

//
// DATA
//
const csvFile = "data/milk.csv"
const trainingLabel = "Grade"
const ignored = [
    "Grade",
    // "pH",
    "Temperature",
    "Taste",
    "Odor",
    // "Fat",
    // "Turbidity",
    "Colour"
]

//HTML stuff
const display = document.getElementById("display");
// const depressedActDepressed = document.getElementById("1");
// const goodActDepressed = document.getElementById("2");
// const depressedActGood = document.getElementById("3");
// const goodActGood = document.getElementById("4");


//
// LOAD CSV
//
function loadData() {
    Papa.parse(csvFile, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: results => trainModel(results.data) // gebruik deze data om te trainen
    })
}

//
// MACHINE LEARNING - Decision Tree
//
function trainModel(data) {
    data.sort(() => (Math.random() - 0.5));
    let trainData = data.slice(0, Math.floor(data.length * 0.8));
    let testData = data.slice(Math.floor(data.length * 0.8) + 1);


    // maak het algoritme aan
    let decisionTree = new DecisionTree({
        ignoredAttributes: ignored,
        trainingSet: trainData,
        categoryAttr: trainingLabel,
        maxTreeDepth: 4
    })

    // Draw Tree
    let visual = new VegaTree('#view', 800, 400, decisionTree.toJSON())

    let amountCorrect = 0;

    // let predictedDepressedActDepressed = 0;
    // let predictedDepressedActGood = 0;
    // let predictedGoodActGood = 0;
    // let predictedGoodActDepressed = 0;

    for (let row of testData) {
        let prediction = decisionTree.predict(row)
        if (prediction == row.Grade) {
            amountCorrect++
        }
    }
    //     if (prediction == 1 && row.depressed == 1) {
    //         predictedDepressedActDepressed++
    //     }
    //     if (prediction == 1 && row.depressed == 0) {
    //         predictedDepressedActGood++
    //     }
    //     if (prediction == 0 && row.depressed == 0) {
    //         predictedGoodActGood++
    //     }
    //     if (prediction == 0 && row.depressed == 1) {
    //         predictedGoodActDepressed++
    //     }
    // }

    //Calculate accuracy
    let accuracy = amountCorrect / testData.length
    console.log(accuracy)
    display.innerText = `Accuracy: ${accuracy}`;

    //Confusion Matrix
    // depressedActDepressed.innerText = `${predictedDepressedActDepressed}`;
    // depressedActGood.innerText = `${predictedDepressedActGood}`;
    // goodActDepressed.innerText = `${predictedGoodActGood}`;
    // goodActGood.innerText = `${predictedGoodActDepressed}`;

    //SAVE model
    let json = decisionTree.stringify()
    console.log(`JSON: ${json}`)
}


loadData()