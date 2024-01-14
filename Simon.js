let Original_Seq=[];
let User_Seq=[];
let btns=["red","blue","green","yellow"];

let started=false;
let lvl=0;

let h2=document.querySelector("h2");
let h3=document.querySelector("h3");

document.addEventListener("keypress", function(){
    if(started==false){
        console.log("game is started.");
        started=true;
        level();
    }
    
});

function level() {
    User_Seq=[];
    lvl++;
    h2.innerText=`Level ${lvl}`;
    let random=Math.floor(Math.random()*4);
    let random_color=btns[random];
    let btn=document.querySelector(`.${random_color}`); 
    // console.log(random);
    // console.log(random_color);
    // console.log(btn);
    Original_Seq.push(random_color);
    // console.log(Original_Seq);
    btnFlashup(btn);
}


const btnFlashup= (btn) => {
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    },300);
}

const btnFlashup2= (btn) => {
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash")
    },300);
}

reset=()=>{
    started=false;
    Original_Seq=[];
    User_Seq=[]
    lvl=0;
    console.log(`Highest score is ${x}`);
    h3.innerText=`Highest score is ${x}`;
}



function checkans(idx){
    // console.log(`current level ${lvl}`);
    // let idx=lvl-1 // here it is fixed value
    if (User_Seq[idx]== Original_Seq[idx]){
        if(User_Seq.length== Original_Seq.length){
            setTimeout(level,1000);
        }
    } else {
        h2.innerText=`Game Over! Your score is ${x=lvl}
        Press any key to start.`;
        document.querySelector("body").style.backgroundColor="maroon";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },200);
        reset();
        
    }
}


let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",function btnpress(){
        let btn=this;// this is pointing towards button 
        // console.log(this);
        btnFlashup2(btn);
        usercolor= btn.getAttribute("id");
        // console.log(usercolor);
        User_Seq.push(usercolor);
        // console.log(User_Seq);
        // console.log(Original_Seq);
        checkans(User_Seq.length-1);
    });
}






