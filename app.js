const addBtn=document.getElementById("add-btn");
const removeBtn=document.getElementById("remove-btn");
const resetBtn=document.getElementById("reset-btn");
const box=document.getElementById("box");
let count=0;

box.innerHTML="";

colors = ['lightgreen', 'slateblue', 'pink', 'yellow', 'white','red'];

addBtn.addEventListener("click", function(){
    count++;
    box.innerHTML="";
    for(let i=0; i<count; i++){
        box.innerHTML+=`<p style=" height: 250px; background-color: ${colors[Math.floor(Math.random() * colors.length)]}; margin: 10px; flex: 0 0 30%; display:flex; align-items:center; justify-content:center; border-radius:10px;">${i+1}</p>`;
    }
})

removeBtn.addEventListener("click", function(){
    if(count!=0){
        count--;
        box.innerHTML="";
        for(let i=0; i<count; i++){
            box.innerHTML+=`<p style=" height: 250px; background-color: ${colors[Math.floor(Math.random() * colors.length)]}; margin: 10px; flex: 0 0 30%; display:flex; align-items:center; justify-content:center; border-radius:10px;">${i+1}</p>`;
        }
    }
})

resetBtn.addEventListener("click", function(){
    count=0;
    box.innerHTML="";
})

