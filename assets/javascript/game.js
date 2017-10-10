var options = ["r","p","s"];

        	document.onkeyup = function() {
        		var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
        		console.log("user pressed a key "+userGuess);

        		var holder = Math.random();
        		console.log("and Math.random generated "+holder);
        		var myLen = options.length;
        		console.log("Len of options array is "+myLen);
        		var myProduct = holder*myLen;
        		console.log("and the product of holderxmyLen is "+myProduct);
        		var myFloor = Math.floor(myProduct);
        		console.log("the index is "+myFloor);
        		// console.log("the index is now "+myFloor);
        		var computerGuess = options[myFloor];
        		console.log("Computer guesses "+computerGuess);
        			
        		}