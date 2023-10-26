const lhs = document.getElementById("lhs");
const operation = document.getElementById("operation");
const rhs = document.getElementById("rhs");
const clientInput = document.getElementById("client-input");
const nextBtn = document.getElementById("next-btn");
const heading = document.getElementById("heading");
const questionBox = document.getElementById("question-box");
const resetBtn = document.getElementById("reset-btn");
const closePopup = document.getElementById("close-popup");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const continueBtn = document.getElementById("continue-btn");
const questionInput = document.getElementById("question-input");
const popuptext = document.getElementById("popuptext");

let operationlist = ["+", "-", "/", "x"];
let countList = [];
let totalQuestion;
let count = 0;
let score = 0;

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
function showPopup(message){
    if (message != undefined){
        popuptext.innerHTML = `${message}`;
        document.querySelector('.bg-model')?.classList.add('show');
    }
    else{
        popuptext.innerHTML = ``;
        document.querySelector('.bg-model').classList.add('show');
    }
}
function hidePopup(){
    document.querySelector('.bg-model').classList.remove('show');
}
function hideCloseBtnPopup(){
    document.querySelector('.close-popup').classList.add('hide');
}
function showCloseBtnPopup(){
    document.querySelector('.close-popup').classList.remove('hide');
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
function totalQuestionUndefined(){
    if (totalQuestion == undefined){
        window.location.reload();
    }
}
// Generate next question or submit score
function questionORscore(totalQuestion, count){
    if (Number(totalQuestion) == Number(count)){
        calculatescore(countList, count);
        hideCloseBtnPopup()
        showPopup(`Your Score = ${score}/${totalQuestion}`)
        popup.innerHTML += `<button id="play-again" class="btn box">Play Again</button>`;
        const playAgain = document.getElementById("play-again");
        playAgain.addEventListener("click", ()=>{
            window.location.reload();
        })
    }
    else {
        generateQuestion();
        console.log(systemLHS, systemOperation, systemRHS, "=", systemGeneratedAns());
    }
}
//starting of the game
function startGamePopup(){
    hideCloseBtnPopup();
    showPopup(`Give count of question you want to answer`);
}

// Events
startBtn.addEventListener("click", ()=>{
    totalQuestion = questionInput.value;
    if (totalQuestion < 2 || totalQuestion > 100 ) {
        document.querySelector('.error-message').classList.remove('displaynone');
    }
    else{
        hidePopup();
        showCloseBtnPopup();
        document.querySelector('.start-game').classList.add('displaynone');
        headingNQuestionBox();
        generateQuestion();
        console.log(systemLHS, systemOperation, systemRHS, "=", systemGeneratedAns());
    }
})
nextBtn.addEventListener("click", () => {
    totalQuestionUndefined();
    let clientvalue = clientInput.value;
    if (!clientvalue){
        showPopup("Enter answer!");
    }
    if (clientvalue){
        verifyAnswer(systemGeneratedAns(), clientvalue);
        clientInput.value = "";
        count++;
        questionORscore(totalQuestion, count);
    }
})
resetBtn.addEventListener("click", ()=>{
    totalQuestionUndefined();
    if(count != 0){
        hideCloseBtnPopup()
        showPopup(`Do you want to restart the game?`)
        document.querySelector('.restart-tag').classList.remove('displaynone');
    }
    else{
        showPopup(`No need to reset this is a new game`);
    }
})
closePopup.addEventListener("click", ()=>{
    hidePopup();
})
restartBtn.addEventListener("click", ()=>{
    window.location.reload();
})
continueBtn.addEventListener("click", ()=>{
    hidePopup();
    showCloseBtnPopup();
})

startGamePopup()