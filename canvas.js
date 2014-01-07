$(document).ready(function(){
	// window.addEventListener("load", eventWindowLoaded, false);

	// var Debugger = function() {};
	// Debugger.log = function(message) {
	// 	try {
	// 		console.log(message);
	// 	}
	// 	catch (exception) {
	// 		return;
	// 	}
	// }

	// function eventWindowLoaded() {
	// 	canvasApp();
	// }

	// function canvasSupport() {
	// 	return Modernizr.canvas;
	// }

	// function canvasApp() {
	// 	if (!canvasSupport) {
	// 		return;
	// 	};

	var theCanvas = document.getElementById('canvasone');
	var context = theCanvas.getContext("2d");

	// 	Debugger.log("Drawing Canvas");
	// 	function drawScreen() {
	// 		//background
	// 		context.fillStyle = "#ffffaa";
	// 		context.fillRect(0, 0, 500, 300);

	// 		//text
	// 		context.fillStyle = "#000000";
	// 		context.font = "20px Sans-Serif";
	// 		context.textBaseline = "top";
	// 		context.fillText('Hell word', 195, 80);

	// 		//image
	// 		var hellworldimage = new Image();
	// 		hellworldimage.onload = function() {
	// 			context.drawImage(hellworldimage, 30, 110);
	// 		}
	// 		hellworldimage.src = "helloword.gif";

	// 		//box
	// 		context.strokeStyle = "#000000";
	// 		context.strokeRect(5,5,490,290);
	// 	}
	// 	drawScreen();
	// }

	//"Guess the letter" game
	var guesses = 0; //so lan du doan cua user
    var message = "Guess the letter from A (lower) to Z (higher)";
    var letters =  [
               "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o",
               "p","q","r","s","t","u","v","w","x","y","z"
               ];
    var today = new Date(); //Cap nhat ngay hien tai
    var letterToQuess = ""; // bien luu tru chu cai user phai doan (chu cai random)
    var higherOrLower = ""; //bien luu gia tri higher or loser
    var lettersGuessed; // mang luu cac chu cai user doan 
    var gameOver = false;

    initGame();
    function initGame() {
        // khi click chuot vao button createImage
        var formElement = document.getElementById("createImageData");
        formElement.addEventListener('click', createImageDataPressed, false);

        var letterIndex = Math.floor(Math.random()*letters.length);
        letterToQuess = letters[letterIndex];
        guesses = 0;
        lettersGuessed = [];
        gameOver = false;

        window.addEventListener("keydown", eventKeyPressed, true); //nhan su kien tu ban phim va thuc hien function eventKeyPressed
        drawScreen();
    }
    //exporting Canvas to an image
    // toDataUrl() -  chuc nang tuong tu nhu viec chup lai hinh anh tu screen
    //function xu ly viec click chuot vao button createImage
    // goi function window.open(), su dung toDataUrl() cua canvas
    function createImageDataPressed(e) {
        // window.open: mo 1 cua so trinh duyet moi
        window.open(theCanvas.toDataURL(), "canvasImage", "left=0, top =0, width="+theCanvas.width+
            ", heigh = " +theCanvas.heigh +", toolbar = 0, resizable=0");
    }

    function eventKeyPressed(e) {
        if(gameOver == false) {
            //Convert a set of Unicode values into characters: vd 66->A
            var letterPressed = String.fromCharCode(e.keyCode); //ky tu user nhan phim chon
            // chuyen chu hoa thanh chu thuong A->a
            letterPressed = letterPressed.toLowerCase();
            guesses++;
            lettersGuessed.push(letterPressed);
            if (letterPressed == letterToQuess) {
                gameOver = true;
            }
        else {
            //search ky tu letterToQuess trong mang letters
            letterIndex = letters.indexOf(letterToQuess);
            guessIndex = letters.indexOf(letterPressed);
            if (guessIndex < 0) {
                higherOrLower = "That is not a letter";
            } else if(guessIndex > letterIndex) {
                higherOrLower = "Lower";
            }
            else {
                higherOrLower = "Higher";
            }
        }

        drawScreen();
        }
    }

    function drawScreen(){

        //background
        context.fillStyle = "#F5F5DC";
        context.fillRect(0, 0, 500, 300);

        //box
        context.fillStyle = "#FFF8DC";
        context.fillRect(5,5,490,290);

        context.textBaseline = "top";

        //Date
        context.fillStyle = "#000000";
        context.font = "10px Sans-Serif";
        context.fillText (today, 150, 10); // toa do cach left va top

        //message
        context.fillStyle = "#FF0000";
        context.font = "14px Sans-Serif";
        context.fillText (message, 125, 30);
        context.fillStyle = "#109910";
        context.font = "16px Sans-Serif";
        context.fillText ('Guesses: ' + guesses, 215, 50);

        //higher or lower
        context.fillStyle = "#000000";
        context.font = "16px Sans-Serif";
        //toString: chuyen number sang string
        context.fillText ("Higher or Lower: " + higherOrLower,150, 125) ;

        //letters quessed
        context.fillStyle = "#FF0000";
        context.font = "16px Sans-Serif";
        context.fillText ("Letters Guessed: " + lettersGuessed.toString(), 10, 260);

        if (gameOver) {
             context.fillStyle = "#FF0000";
             context.font = "40px Sans-Serif";
             context.fillText  ("You Got It!", 150, 180);
          }
    }

    // tao hieu ung chu mo dan trong man hinh

    var c = document.getElementById('canvastwo');
    var ctx = c.getContext("2d");
    var alpha = 0;
    var fadeIn = true; // hien text
    var text = "Hello world";
    var helloworldimage = new Image();
    helloworldimage.src = "images/1.jpg";

    // animation loop - tao cac chuyen dong tren canvas
    function gameLoop() {
        window.setTimeout(gameLoop, 20);
        drawScreen1();
    }
    gameLoop();

    //requestAnimationFrame() 
    // method tells the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint. The method takes as an argument a callback to be invoked before the repaint.
    // cach tot nhat de tao vong lap su dung phuong thuc window.requestAnimationFrame()
    // - This new method uses a delta timer to tell your JavaScript program exactly when the browser is ready to render a new frame of animation

    // window.requestAnimFrame = (function(){
    //     return window.requestAnimationFrame || //Firefox 23 / IE 10 / Chrome / Safari 7 (incl. iOS)
    //         window.webkitRequestAnimationFrame || //Older versions of Safari / Chrome
    //         window.mozRequestAnimationFrame || // Firefox < 23
    //         window.oRequestAnimationFrame || //..
    //         window.msRequestAnimationFrame ||
    //         function(callback) {
    //             window.setTimeout(callback, 1000/60);
    //         };
    // })();
    // (function animloop(){
    //     requestAnimFrame(animloop);
    //     render();
    // })();

    //  ==> This method is changing and has not been implemented across all browsers, we are going to use
    // window.setTimeout() for application

    //globalAlpha accepts nnumbers from 0 through 1
    function drawScreen1() {
        //background
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 640, 480);
        //image
        ctx.globalAlpha = 0.25;
        ctx.drawImage(helloworldimage, 10, 10);

        if(fadeIn) {
            alpha += 0.01;
            if (alpha >=1) {
                alpha = 1;
                fadeIn = false;
            }
        }else {
            alpha -=0.01;
            if (alpha < 0) {
                alpha = 0;
                fadeIn = true;
            }
        }
        ctx.globalAlpha = alpha;
        //drawing the text
        ctx.font = "72px Sans-Serif";
        ctx.textBaseline = "top";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(text, 150, 200);
    }

    // chuong 2: drawing on canvas
    var c2 = document.getElementById('chuong2');
    var context2 = c2.getContext("2d");
    drawScreen2();
    function drawScreen2() {
        // the basic rectangle shape
        context2.fillStyle = "#000000";
        context2.strokeStyle = "#ff00ff";
        context2.lineWidth = 2;
        context2.fillRect(10, 10, 40, 40);
        context2.strokeRect(0, 0, 60, 60);
        context2.clearRect(20, 20, 20, 20);

        context2.fillRect(120, 10, 40, 40);
        context2.lineWidth = 10;
        context2.strokeRect(100, 0, 80, 80);

        // a simple line path
        context2.strokeStyle = "black";
        context2.strokeRect = "black";
        context2.lineWidth = 10;
        context2.lineCap = 'square';
        context2.beginPath();
        context2.moveTo(20, 0);
        context2.lineTo(100, 0);
        context2.stroke();
        context2.closePath();
    }

})