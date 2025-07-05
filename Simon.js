let Original_Seq=[];
let User_Seq=[];
let btns=["red","blue","green","yellow"];

let started=false;
let lvl=0;
let highestScore=0; // Track the highest score in the session

let h2=document.querySelector("h2");
let h3=document.querySelector("h3");
let startBtn=document.querySelector("#startBtn");

// Function to start the game
function startGame() {
    if(started==false){
        console.log("game is started.");
        started=true;
        startBtn.style.display = "none";
        h2.innerText = "Watch the sequence!";
        level();
    }
}

// Handle keyboard input (for desktop)
document.addEventListener("keypress", startGame);

// Handle start button click (for mobile/tablet)
startBtn.addEventListener("click", startGame);

// Handle touch events for mobile devices
startBtn.addEventListener("touchstart", function(e) {
    e.preventDefault();
    startGame();
});

// Update h2 text for mobile devices
function updateInstructions() {
    if (window.innerWidth <= 768) {
        h2.innerText = "Tap 'Start Game' to begin";
    } else {
        h2.innerText = "Press any key to start the game";
    }
}

// Update instructions on load and resize
window.addEventListener("load", function(){
    updateInstructions();
    // Initialize the highest score display
    if(highestScore > 0){
        h3.innerText=`Highest score: ${highestScore}`;
    }
});
window.addEventListener("resize", updateInstructions);

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
    startBtn.style.display = "block";
    updateInstructions();
    
    // Display highest score if it exists
    if(highestScore > 0){
        h3.innerText=`Highest score: ${highestScore}`;
    }
}



function checkans(idx){
    // console.log(`current level ${lvl}`);
    // let idx=lvl-1 // here it is fixed value
    if (User_Seq[idx]== Original_Seq[idx]){
        if(User_Seq.length== Original_Seq.length){
            setTimeout(level,1000);
        }
    } else {
        let currentScore = lvl;
        
        // Update highest score only if current score beats it
        let isNewHighScore = currentScore > highestScore;
        if(isNewHighScore){
            highestScore = currentScore;
        }
        
        // Display appropriate message based on device and score
        if (window.innerWidth <= 768) {
            if(isNewHighScore){
                h2.innerText=`Game Over! New High Score: ${currentScore}
                Tap 'Start Game' to play again.`;
            } else {
                h2.innerText=`Game Over! Your score: ${currentScore}
                Tap 'Start Game' to play again.`;
            }
        } else {
            if(isNewHighScore){
                h2.innerText=`Game Over! New High Score: ${currentScore}
                Press any key to start.`;
            } else {
                h2.innerText=`Game Over! Your score: ${currentScore}
                Press any key to start.`;
            }
        }
        
        document.querySelector("body").style.backgroundColor="maroon";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },200);
        reset();
        
    }
}


let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns){
    // Handle click events
    btn.addEventListener("click", function btnpress(){
        let btn=this;
        btnFlashup2(btn);
        usercolor= btn.getAttribute("id");
        User_Seq.push(usercolor);
        checkans(User_Seq.length-1);
    });
    
    // Handle touch events for mobile devices
    btn.addEventListener("touchstart", function(e){
        e.preventDefault(); // Prevent default touch behavior
        let btn=this;
        btnFlashup2(btn);
        usercolor= btn.getAttribute("id");
        User_Seq.push(usercolor);
        checkans(User_Seq.length-1);
    });
    
    // Prevent context menu on long touch
    btn.addEventListener("contextmenu", function(e){
        e.preventDefault();
    });
}






