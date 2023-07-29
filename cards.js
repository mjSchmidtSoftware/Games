// code created by Michael James Schmidt 
////////////////////////////////////////////////////////
//variables//
////////////////////////////////////////////////////////

var canvas = document.getElementById("cardTable");
context = canvas.getContext('2d');
var table = new Image(); // image object for the table image
table.src = "images/table.png";
var theDeck = new Array(); // Deck of cards. 
var DeckExist = false;
var displayBack = false;
var back = new Image(); // image object for back of card. 
back.src = "images/cards/gbCard52.gif";
const shuffleSound = new Audio("audio/shuffle.mp3");

////////////////////////////////////////////////////////
//Deck functions// 
////////////////////////////////////////////////////////


function newDeck() {
    for (var i = 0; i <= 51; i++) {
        var theCard = new Image();
        theCard.src = "images/cards/gbCard" + i + ".gif"; // get the source for the source
        theDeck[i] = new card(theCard, back, 10, 10); // pass in value of the card
        //console.log(theDeck[i]);
    } //end of for loop
   
    DeckExist = true;
    displayBack = true;
    setGridLayOut();
    DrawAcards();
    console.log("new Deck created");
} // end of new deck 

function displayDeck() {
    if (DeckExist === true) {
        displayBack = false;
        console.log("Display Deck");
        for (var i = 0; i <= (theDeck.length - 1); i++) { // for testing 
            console.log(theDeck[i]);
        }
    } else {
        console.log("No Deck to display " + theDeck.length + " Cards to display, create a deck")
    }
} // end of display deck 

function shuffleCards() {
    if (DeckExist === true) { // if no Deck, don't go in here and do this code
        if(displayBack == false){
            shuffleSound.play();
            shuffleSound.playbackRate = 2;
        }
        var currentIndex = theDeck.length,
            randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [theDeck[currentIndex], theDeck[randomIndex]] = [
                theDeck[randomIndex], theDeck[currentIndex]
            ];
        }
        console.log("shuffle cards");
        for (var i = 0; i <= (theDeck.length - 1); i++) { // for testing 
            console.log(theDeck[i]); // display all the objects. 
        }
    } else { // else display message saying no deck
        console.log("No Deck to shuffle " + theDeck.length + " Cards to shuffle, create a deck")
    }
} // end of shuffle 

/////////////////////////////////////////////////////////
//CLASSES// 
/////////////////////////////////////////////////////////

class card {
    constructor(img, imgBack, the_x, the_y) {
        this.x = the_x; //x // where the obstacles are drawn 
        this.y = the_y; //y // 
        this.cardImg = img;
        this.cardBackImg = imgBack;
    }
    drawCard() {
        context.drawImage(this.cardImg, this.x, this.y);
    }
    drawBack() {
        context.drawImage(this.cardBackImg, this.x, this.y)
    }
    setx(new_x) {
        this.x = new_x;
    }
    sety(new_y) {
        this.y = new_y;
    }
    getImg() {
        return this.cardImg; 
    }
    getX(){
        return this.x
    }
    getY(){
        return this.y
    }


}; // end of card class 

////////////////////////////////////////////////////////////
//DRAW//
////////////////////////////////////////////////////////////



function setGridLayOut(){
    
    var x = 10; // Draw Point x
    var y = 10; // Draw point y 
    var q;
    
    for (q = 0; q < 52; q++) {
        if (q === 13 || q === 26 || q === 39 || q === 52) {
            x = 10; // move back to starting point on x 
            y += 110; // move down to the next row of cards.
        }
        theDeck[q].setx(x);
        theDeck[q].sety(y);
        x += 75; // move to the right
    }

} //end of setGrodLayOut 

function DrawAcards(){
     
    var z;
    for (z = 0; z < theDeck.length; z++) {
        var THeImage = theDeck[z].getImg();
        var THe_X = theDeck[z].getX();
        var THe_Y = theDeck[z].getY();
        DoTheDraw(THeImage,THe_X,THe_Y);
    }
}

function DoTheDraw(THeImg, THex, THey){
    context.drawImage(THeImg,THex,THey);
}


function draw() {
    
    context.drawImage(table, 0, 0); // draw the card table
    if (DeckExist === true) { // only go in here if the deck exist, 
        if (displayBack === true) { // draw just back of cards when the deck is created.
            var a = 150; // Draw Point a - x
            var b = 50; // Draw point b - y
            var z;
            for (z = 0; z < 52; z++) {
                if (z === 26) {
                    a = 150;
                    b += 110;
                }
                context.drawImage(back, a, b);
                a += 25;
            }
        } else if (displayBack === false) { // draw all the cards on screen. 
            var x = 10; // Draw Point x
            var y = 10; // Draw point y 
            var i;
            for (i = 0; i < 52; i++) {
                if (i === 13 || i === 26 || i === 39 || i === 52) {
                    x = 10; // move back to starting point on x 
                    y += 110; // move down to the next row of cards.
                }
                theDeck[i].setx(x);
                theDeck[i].sety(y);
                x += 75; // move to the right
                theDeck[i].drawCard();
            } //end of for loop 
        } // end of else if 
    } // if deck exist 
} // end of draw 

////////////////////////////1////////////////////////////////
//UPDATE()//
////////////////////////////////////////////////////////////

function update() {
    // put code to update the position of cards this is for later date 
}

////////////////////////////////////////////////////////////
//GAME_LOOP()//
////////////////////////////////////////////////////////////

function gameLoop() {
    draw();
}
setInterval(gameLoop, 30);