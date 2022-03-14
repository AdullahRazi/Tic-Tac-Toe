var boardMatrix=[[4,4,4],[4,4,4],[4,4,4]];    //1 for 'X' and 0 for 'O'
var counter=1; //to check whose turn is it ?
var isGameOver=true;

//Event listener for starting the game
$("body").on("click",".choice-btn",function(){
    if(this.classList.contains("X-btn"))
        counter++;
    isGameOver=false;   
    $(".choice-btn").remove(); 

    var player="X";
    if(counter==1)
        player="O";
    $("h1").text(player+"'s turn");
});


//Event listener for user's response

$(".square").on("click",function(){
    if(isGameOver)   //If game is over, don't listen to user's response
        return;   
    var className=this.getAttribute("class");
    var stringPos1=className.charAt(className.length-1);
    var stringPos2=className.charAt(className.length-2);
    var numPos1=parseInt(stringPos1);
    var numPos2=parseInt(stringPos2);

    if(boardMatrix[numPos2][numPos1]==0 || boardMatrix[numPos2][numPos1]==1) //will not be listening to user's 
        return;                                                              //response if user is clicking on already marked square

    if(counter%2==0){
        this.textContent="X";
        boardMatrix[numPos2][numPos1]=1
        playSound("x");
        $("h1").text("O's turn");
    }    
    else{
        this.textContent="O";
        boardMatrix[numPos2][numPos1]=0;
        playSound("o");
        $("h1").text("X's turn");
    }       
     
    flashOnKeyPress(this); 
    checkPattern();
    counter++;
});

//Event listener for reset button

$("body").on("click",".reset-btn",function(){
    reset();
});

//Function to check if any one has won

function checkPattern(){

    var rowSum,colSum,diagSum1,diagSum2,winner;

    //Checking rows    
    for(var i=0;i<=2;i++){
        rowSum=boardMatrix[i][0]+boardMatrix[i][1]+boardMatrix[i][2];

        if(rowSum==3 || rowSum==0){
            if(rowSum==3)
                winner="X";
            else
                winner="O";    
            gameOver("gameWin",winner,i+"0",i+"1",i+"2");
                return;
        }        
    }

    //Checking columns
    for(var i=0;i<=2;i++)
    {
        colSum=boardMatrix[0][i]+boardMatrix[1][i]+boardMatrix[2][i];

        if(colSum==3 || colSum==0){
            if(colSum==3)
                winner="X";
            else
                winner="Y";    
            gameOver("gameWin",winner,"0"+i,"1"+i,"2"+i);
            return;
        }        
    }

    //Checking diagnols  
    diagSum1=boardMatrix[0][0]+boardMatrix[1][1]+boardMatrix[2][2];
    diagSum2=boardMatrix[0][2]+boardMatrix[1][1]+boardMatrix[2][0];

    if(diagSum1==0 || diagSum1==3){
        if(diagSum1==3)
            winner="X";
        else
            winner="O";    
        gameOver("gameWin",winner,"00","11","22");         // 0 for left diagonal 
        return;
    }    
        
    else if(diagSum2==0 || diagSum2==3){
        if(diagSum2==3)
            winner="X";
        else
            winner="O";    
        gameOver("gameWin",winner,"02","11","20");   // 1 for right diagonal
        return;
    }

    //Check if it's a draw
    var isSpaceAvailable=false;
    for(var i=0;i<=2;i++){
        for(var j=0;j<=2;j++){
            if(boardMatrix[i][j]==4){
                isSpaceAvailable=true;
                break;
            }    
        }
    }
    if(!isSpaceAvailable)
        gameOver("gameDraw",-1);
}

function gameOver(type,winner,block1="",block2="",block3=""){
    isGameOver=true;
    if(winner=="X")
        $("h1").text("X wins 😎");
    else if(winner=="O")
        $("h1").text("O wins 😉"); 
    else
        $("h1").text("It's a draw 🤜🤛"); 


    playSound(type);
    setTimeout(function(){
    $(".sq-"+block1).addClass("animated-buttonClick");
    $(".sq-"+block2).addClass("animated-buttonClick");
    $(".sq-"+block3).addClass("animated-buttonClick");

    if(type=="gameDraw")
        
        $(".square").addClass("animated-buttonClick");
    },70);

    setTimeout(function(){
        $(".square").removeClass("animated-buttonClick");
    },500);

    $(".game-board").after("<br><br><button class='reset-btn btn btn-light'>Reset</button>");
}

//Reset the game
function reset(){
    $(".square").text("");
    $("h1").text("Make your choice and start a match");
    $(".game-board").before("<button class='choice-btn X-btn btn btn-light'>X</button><button class='choice-btn O-btn btn btn-light'>O</button>");
    $(".reset-btn").remove();
    boardMatrix=[[4,4,4],[4,4,4],[4,4,4]];
    counter=1;
}

//Flashing keypress

function flashOnKeyPress(element){
    
    element.classList.add("animated-buttonClick");
    setTimeout(function(){
        element.classList.remove("animated-buttonClick");
    },70);
}

//Sounds
function playSound(name){

    if(name=="x")
        name+=".mp3";
    else
        name+=".wav";  
    var audio =new Audio(name);
    audio.play();

}