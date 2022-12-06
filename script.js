const TOTAL_PEOPLE = 82; // person number must be between 1 and 83 but there are 82 people
const MAX_PERSON_NUMBER = 83

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive
}

let firstCharacterNumber = getRandom(1, MAX_PERSON_NUMBER);
let secondCharacterNumber = getRandom(1, MAX_PERSON_NUMBER);
let url1 = "http://www.swapi.tech/api/people/" + firstCharacterNumber;
let url2 = "http://www.swapi.tech/api/people/" + secondCharacterNumber;
let weight1 = 0;
let weight2 = 0;




document.getElementById("playButton").addEventListener("click", function(event) {
    event.preventDefault();
    
    fetch(url1)
    .then(function(response) {
        return response.json();
    }).then(function(json) {
        let result = json.result;
        let properties = result.properties
        let results = "";
        results += '<h2 id="name1">' + properties.name + "</h2>";
        let score = parseInt(properties.height);
        results += '<p id="weight1">' + "Height: " + score + "</p>"
        document.getElementById("character1").innerHTML = results
    }).catch(err => console.error(err));
    fetch(url2)
    .then(function(response) {
        return response.json();
    }).then(function(json) {
        let result = json.result;
        let properties = result.properties
        let results = "";
        results += '<h2 id="name2">' + properties.name + "</h2>";
        let score = parseInt(properties.height);
        results += '<p id="weight2">' + "Height: " + score + "</p>"
        document.getElementById("character2").innerHTML = results
        document.getElementById("playButton").innerText = "Play!";
    }).catch(err => console.error(err));
    
    weight1 = document.getElementById("weight1").innerText
    weight2 = document.getElementById("weight2").innerText
    
    weight1 = weight1.substring(weight1.lastIndexOf(" ") + 1);
    weight2 = weight2.substring(weight2.lastIndexOf(" ") + 1);
    
    let winner = "";
    let outcome = "";
    if (weight1 > weight2) {
        winner = document.getElementById("name1").innerText;
       outcome = "<h3>" + winner + " wins!</h3>";
    }
    else if (weight1 < weight2) {
        winner = document.getElementById("name2").innerText;
        outcome = "<h3>" + winner + " wins!</h3>";
    }
    else {
        outcome = "<h3>It's a tie!</h3>";
    }
    outcome += "<p>Refresh the page to play again!</p>"
    document.getElementById("results").innerHTML = outcome;
});
