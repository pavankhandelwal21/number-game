const lhs = document.getElementById("lhs");
const operation = document.getElementById("operation");
const rhs = document.getElementById("rhs");
const clientInput = document.getElementById("client-input");
const nextBtn = document.getElementById("next-btn");
const heading = document.getElementById("heading");
const questionBox = document.getElementById("question-box");
const resetBtn = document.getElementById("reset-btn");

let operationlist = ["+", "-", "/", "x"];
let countList = [];
let count = 0;
let totalQuestion = 15;
let score = 0

function randomNumber(){
    return Math.floor(Math.random()*99);
}
function randomOperation(){
    return operationlist[Math.floor(Math.random() * operationlist.length)];
}
function actionOperations(lhs, rhs, systemOperation){
    if (systemOperation == "+"){
        return lhs + rhs; 
    };
    if (systemOperation == "-"){
        return lhs - rhs; 
    };
    if (systemOperation == "/"){
        return Number((lhs / rhs).toFixed(2)); 
    };
    if (systemOperation == "x"){
        return lhs * rhs; 
    };
}
function colorVerifiedAns(countList, count){
    if (countList[count]){
        document.querySelector(`.color-${count}`).classList.add('green');
    }
    else{
        document.querySelector(`.color-${count}`).classList.add('red');
    }
}
function verifyAnswer(systemGeneratedAns, clientvalue){
    countList.push(Number(systemGeneratedAns) == Number(clientvalue));
    colorVerifiedAns(countList, count)
    // console.log("verfiy", countList)
}
function finalRun(totalQuestion, count){
    // console.log(count);
    if (Number(totalQuestion) == Number(count)){
        calculatescore(countList, count);
        alert(`Your Score = ${score}/${totalQuestion}`)
        window.location.reload();
    }
}
function calculatescore(countList, count){
    for (let i=0; i<count; i++){
        if (countList[i]){
            score++;
            // console.log("score", score);
        }
    }
}
function systemGeneratedAns(){
    return actionOperations(systemLHS,systemRHS, systemOperation);
}
function generateQuestion(){
    systemLHS = randomNumber();
    systemRHS = randomNumber();
    systemOperation = randomOperation();
    if (systemRHS == 0){
        systemRHS = randomNumber();
    }
    lhs.innerHTML = systemLHS;
    operation.innerHTML = systemOperation;
    rhs.innerHTML = systemRHS;
    systemGeneratedAns();
}
function headingNQuestionBox(){
    heading.innerHTML = `Answer ${totalQuestion} questions to win the game `;
    for (let j=0; j<totalQuestion; j++){
        questionBox.innerHTML += `<p class="color-box color-${j}">Q${j+1}</p>`;
    }
}

headingNQuestionBox();
generateQuestion();
console.log(systemLHS, systemOperation, systemRHS, "=", systemGeneratedAns());

nextBtn.addEventListener("click", () => {
    clientvalue = clientInput.value;
    if (!clientvalue){
        alert("Enter answer!");
    }
    if (clientvalue){
        verifyAnswer(systemGeneratedAns(), clientvalue);
        clientInput.value = "";
        count++;
        finalRun(totalQuestion, count);
        generateQuestion();
        console.log(systemLHS, systemOperation, systemRHS, "=", systemGeneratedAns());
    }
})
resetBtn.addEventListener("click", ()=>{
    if(count != 0){
        window.location.reload();
    }
    else{
        alert(`No need to reset this is a new game`)
    }
})