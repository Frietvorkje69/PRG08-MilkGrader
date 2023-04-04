import {DecisionTree} from "./libraries/decisiontree.js"

// import {VegaTree} from "./libraries/vegatree.js"

//HTML
const display = document.getElementById("display");
const testbtn = document.querySelector("#test");

testbtn.addEventListener("click", () => loadSavedModel() && console.log("Loading model.."));

function loadSavedModel() {
    fetch("./model/model.json")
        .then((response) => response.json())
        .then((model) => modelLoaded(model))
}

function modelLoaded(model) {
    let decisionTree = new DecisionTree(model)

    let phValue = document.getElementById('ph').value;
    let fatValue = document.getElementById('fat').value;
    let turbidityValue = document.getElementById('turbidity').value;
    console.log(phValue, fatValue, turbidityValue)

    // TEST DATA
    let data = { pH: phValue, Fat: fatValue, Turbidity: turbidityValue }
    console.log(data)
    let prediction = decisionTree.predict(data)
    console.log("Predicted: " + prediction)

    if (prediction == "low") {
        display.innerText = `Your milk appears to be of low grade.. please throw it out.`
    }
    if (prediction == "medium") {
        display.innerText = `Your milk appears to be of medium grade! It should be fine, but please use your own wisdom to decide.`
    }
    if (prediction == "high") {
        display.innerText = `Your milk appears to be of the highest grade! It's perfectly fine to drink.`
    }
}

