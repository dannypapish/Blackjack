alert("Welcome! Start by Placing a bet, then press 'Start Game'. After getting the initial two cards, Use the 'Yes' and 'No' Buttons if you want to get additional cards. Once you have finished a hand, you can either play another one or cashout. Good luck!");

let summ=0;  // Intermediate variable for the user's sum bfore 'aceControl'
let dSumm=0; // Intermediate variable for the dealer's sum bfore 'aceControl'
let mainDsum=0; //Will store the final sum of dealer cards, after 'aceControl'
let mainSum=0;  //Will store the final sum of dealer cards, after 'aceControl'
let BankRoll=5000; // Initial Bank roll amount
let BET=0; // stores the 'bet' the user chooses to apply
let sUM = document.getElementById("sum"); // a variable stores the sum of cards of the user for display purposes
let dSUM = document.getElementById("dealerHas"); // a variable stores the sum of cards of the dealer for display purposes
let cardsInGame = []; //an array that stores objects of all the cards in the game, dealer + user
let cardsInGameUser = []; //an array stores the user's card deck object
let cardsInGameDealer =[]; //an array stores the dealers's card deck object

let jackPot = document.getElementById("bankRoll"); // a variable stores the bankroll for display purposes
let messageEl=document.getElementById("message-el"); // a variable stores the sum of cards of the user for display purposes
let startBtn =document.getElementById("btnText"); // a varibale that stores the user's bet amount for display purposes
let playerImages = document.getElementById('pImage'); // a variable that will store the user's card images for later display
let dealerImages = document.getElementById('dImage'); // a variable that will store the dealers's card images for later display


function alertText() { // Distinguishes between a case where one or both cards is Ace -
	// and notifies the user that one of the Aces get the value of 1, and all other cases, where the message stays standard.

	if (mainSum < 17 && mainSum !==2 && (cardsInGameUser[0].cardValue===1 || cardsInGameUser[1].cardValue===1)) return ("The sum of your cards is " + mainSum + " (Ace/'s get value of 1).");
	else return "The sum of your cards is " + mainSum;
}
function alertTextDealer() { // same as the above function, only for the dealer.
	if (mainDsum < 17 && mainSum !==2 && (cardsInGameDealer[0].cardValue===1 || cardsInGameDealer[1].cardValue===1)) return (" and his new sum is " + mainSum + " (Ace/'s get value of 1).");
	else return " and his new sum is " + mainDsum;
}


function nullify() {  // nullifys all the main parameters once a hand is complete
	document.getElementById('message-el').style.display = "none"; 
	sUM.innerText="Sum:";
	dSUM.innerText="Sum:";
	summ=0;
	dSumm=0;
	BET=0;
	cardsInGame.length = 0;
	cardsInGameUser.length = 0;
	cardsInGameDealer.length =0;
	document.getElementById('cards').style.display="none";
	document.getElementById('Dcards').style.display="none";
	document.getElementById('betBtn').style.display="inline-block";
	document.getElementById('Start').style.display="inline-block";
	removeAllChildNodes(playerImages);
	removeAllChildNodes(dealerImages);
	presentTense();

}

function whileCardsOnTable() { //removes all unnecessary buttons in an itermediate stage- 
	//where the user finished a hand and needs to decide whether to play another hand or cashout.

	pastTense();
	mainDsum=0;
	mainSum=0;
	document.getElementById('betBtn').style.display="none";
	document.getElementById('Start').style.display="none";
	document.getElementById('cash').style.marginRight="2%";
	jackPot.innerText="Bank Roll: $"+BankRoll;
}

function removeAllChildNodes(parent) { // removes the flipped card image of the dealer that is displayed initially.
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function pastTense() { //Gives the user a summary of the last 'hand' by displaying all the info in past tense.
	messageEl.innerText = "Your bet was: $" + BET;
	document.getElementById('yourCards').innerText = "Your cards were:";
	document.getElementById('dealersCards').innerText = "Dealer's cards were:";
}

function presentTense() { // converts everything to 'present tense' in the following round
	messageEl.innerText = "Your bet is: $" + BET;
	document.getElementById('yourCards').innerText = "Your cards are:";
	document.getElementById('dealersCards').innerText = "Dealer's cards are:";
}

function aceControl(arr,sum) { // A function that optimizes the sum calculation in case one/both of the cards are "Ace".
  let count=0;                 // Since ace can get either the value of 1 or 11, the idea is to determine what is more 
                               // beneficial gamewise, and give the cards value accordingly.



  for (let i=0; i<arr.length; i++) {

	if ((arr[i].cardValue===11 && sum<17) || (arr[i].cardValue===11 && sum>21)) { 
		arr[i].cardValue=1;
		count++;

	}
  }
  if (count>1 && sumOfCards(arr)<8) {
	arr[0].cardValue+=10;
  }

  sum=sumOfCards(arr);			
  console.log("sum: " + sum);
  return sum;  
}

function sumOfCards(arr) { //Calcutes the sum of cards of given deck. The point of this function is that we can use
	                       // it at any stage when needed to accurately track the sum of cards.
	let count=0;
	for (let i=0;i<arr.length;i++) {
		count+=arr[i].cardValue;
	}
	return count;
}

function ifCardsTheSame (a) {    // Makes sure theres no duplicates by comparing the card objects
	for (let i=0; i<a.length;i++) {  // if duplicates exist, it deletes the most recent card object
		                             // ,generates a new one and puts it back in the array
		                           
		for (let j=i+1; j<a.length;j++) {
			if (a[i].id === a[j].id) {
				console.log("In case of same random cards the display of the whole array with the 2 similar cards next to eachotehr");
				console.log(a);
				a.splice(j,1);
				console.log("the whole array after the splice");
				console.log(a);
				let temp = randomizeCard();                       
				a.splice(j,0,temp);
				console.log("the whole array after the insertion of new card");
				console.log(a);
				
			}
			
		}
	}
	return a;
}


function placeBet () {  //In case the user clicks "place Bet" more than one time
	
	if (BET>0) alert ("Youv'e placed your bet! chips are on the table! finish the current round before putting anohter one.");
	else if (document.getElementById('cards').style.display==="block") { alert("Press 'Play Another Hand' first to clear the table");}
	else {
		document.getElementById('bet').style.display = "block";
		document.getElementById('bet').style.marginBottom="20px";
	}
	}

	

function submit() { //Makes sure the BET amount is within the range of the Bank Roll. Displays errors in case of any mistake
	
    if (parseInt(document.getElementById("betValue").value)<=0) alert("Bet amount has to be bigger than 0");
	else {
		BET += parseInt(document.getElementById("betValue").value);
		if (BankRoll===0) {
			alert("You have 0 dollars in your bank roll. Don't worry though, we got you! Adding additional $5000 to your account!");
			BankRoll=5000;
			BET=0;
			jackPot.innerText = "Bank Roll: $"+BankRoll;
		}	
		else if (BET>BankRoll) {
			alert("You have $"+BankRoll + " in your bank roll, and you are trying to bet $"+ BET+". Please enter a lower amount.");
			BET=0;

		}

		else { //In case everything is correct, it deducts the BET amount from the Bank Roll and Prompts the user to start the game
		BankRoll=parseInt(BankRoll-BET);
		jackPot.innerText="Bank Roll: $"+BankRoll;
		
		messageEl.innerText = "Your bet is: $"+BET;
		messageEl.style.display="block";
		document.getElementById('bet').style.display = "none";
		alert("Press 'Start Game' to play!");
		}
	}
	
	
}
function randomizeCard() { //Deals cards to the user and the dealer randomly, and matches pictures and sums so that the user
	let output={          // will know exactly what is going on in any stage of the game
		cardType:'',
		cardDescription:'',
		cardValue:0,
		id:0
	};
	let card = Math.floor(Math.random() * 13) + 1;
	if (card===2) {
		let kind = Math.floor(Math.random() * 4);
		if (kind===0) {
			output.cardType="clubs_2.svg";
			output.cardDescription="2 Clubs";
			output.cardValue+=card;
			output.id+=1;
		}
		else if (kind===1) {
			output.cardType="diamonds_2.svg";
			output.cardDescription="2 Diamonds";
			output.cardValue+=card;
			output.id+=2;
		}
		else if (kind===2) {
			output.cardType="hearts_2.svg";
			output.cardDescription="2 Hearts";
			output.cardValue+=card;
			output.id+=3;
		}
		else if (kind===3) {
			output.cardType="spades_2.svg";
			output.cardDescription="2 Spades";
			output.cardValue+=card;
			output.id+=4;
		}


	} else if (card===3) {
		let kind = Math.floor(Math.random() * 4);
		if (kind===0) {
			output.cardType="clubs_3.svg";
			output.cardDescription="3 Clubs";
			output.cardValue+=card;
			output.id+=5;
		}
		else if (kind===1) {
			output.cardType="diamonds_3.svg";
			output.cardDescription="3 Diamonds";
			output.cardValue+=card;
			output.id+=6;
		}
		else if (kind===2) {
			output.cardType="hearts_3.svg";
			output.cardDescription="3 Hearts";
			output.cardValue+=card;
			output.id+=7;
		}
		else if (kind===3) {
			output.cardType="spades_3.svg";
			output.cardDescription="3 Spades";
			output.cardValue+=card;
			output.id+=8;
		} 
	}   else if (card===4) {
		let kind = Math.floor(Math.random() * 4);
		if (kind===0) {
			output.cardType="clubs_4.svg";
			output.cardDescription="4 Clubs";
			output.cardValue+=card;
			output.id+=9;
		}
		else if (kind===1) {
			output.cardType="diamonds_4.svg";
			output.cardDescription="4 Diamonds";
			output.cardValue+=card;
			output.id+=10;
		}
		else if (kind===2) {
			output.cardType="hearts_4.svg";
			output.cardDescription="4 Hearts";
			output.cardValue+=card;
			output.id+=11;
		}
		else if (kind===3) {
			output.cardType="spades_4.svg";
			output.cardDescription="4 Spades";
			output.cardValue+=card;
			output.id+=12;
		} 
	}   else if (card===5) {
		let kind = Math.floor(Math.random() * 4);
		if (kind===0) {
			output.cardType="clubs_5.svg";
			output.cardDescription="5 Clubs";
			output.cardValue+=card;
			output.id+=13;
		}
		else if (kind===1) {
			output.cardType="diamonds_5.svg";
			output.cardDescription="5 Diamonds";
			output.cardValue+=card;
			output.id+=14;
		}
		else if (kind===2) {
			output.cardType="hearts_5.svg";
			output.cardDescription="5 Hearts";
			output.cardValue+=card;
			output.id+=15;
		}
		else if (kind===3) {
			output.cardType="spades_5.svg";
			output.cardDescription="5 Spades";
			output.cardValue+=card;
			output.id+=16;
		} 
	}   else if (card===6) {
		let kind = Math.floor(Math.random() * 4);
		if (kind===0) {
			output.cardType="clubs_6.svg";
			output.cardDescription="6 Clubs";
			output.cardValue=+card;
			output.id+=17;
		}
		else if (kind===1) {
			output.cardType="diamonds_6.svg";
			output.cardDescription="6 Diamonds";
			output.cardValue+=card;
			output.id+=18;
		}
		else if (kind===2) {
			output.cardType="hearts_6.svg";
			output.cardDescription="6 Hearts";
			output.cardValue+=card;
			output.id+=19;
		}
		else if (kind===3) {
			output.cardType="spades_6.svg";
			output.cardDescription="6 Spades";
			output.cardValue+=card;
			output.id+=20;
		} 
	}   else if (card===7) {
		let kind = Math.floor(Math.random() * 4);
		if (kind===0) {
			output.cardType="clubs_7.svg";
			output.cardDescription="7 Clubs";
			output.cardValue+=card;
			output.id+=21;
		}
		else if (kind===1) {
			output.cardType="diamonds_7.svg";
			output.cardDescription="7 Diamonds";
			output.cardValue+=card;
			output.id+=22;
		}
		else if (kind===2) {
			output.cardType="hearts_7.svg";
			output.cardDescription="7 Hearts";
			output.cardValue+=card;
			output.id+=23;
		}
		else if (kind===3) {
			output.cardType="spades_7.svg";
			output.cardDescription="7 Spades";
			output.cardValue+=card;
			output.id+=24;
		} 
	}   else if (card===8) {
		let kind = Math.floor(Math.random() * 4);
		if (kind===0) {
			output.cardType="clubs_8.svg";
			output.cardDescription="8 Clubs";
			output.cardValue+=card;
			output.id+=25;
		}
		else if (kind===1) {
			output.cardType="diamonds_8.svg";
			output.cardDescription="8 Diamonds";
			output.cardValue+=card;
			output.id+=26;
		}
		else if (kind===2) {
			output.cardType="hearts_8.svg";
			output.cardDescription="8 Hearts";
			output.cardValue+=card;
			output.id+=27;
		}
		else if (kind===3) {
			output.cardType="spades_8.svg";
			output.cardDescription="8 Spades";
			output.cardValue+=card;
			output.id+=28;
		} 
	}   else if (card===9) {
		let kind = Math.floor(Math.random() * 4);
		if (kind===0) {
			output.cardType="clubs_9.svg";
			output.cardDescription="9 Clubs";
			output.cardValue+=card;
			output.id+=29;
		}
		else if (kind===1) {
			output.cardType="diamonds_9.svg";
			output.cardDescription="9 Diamonds";
			output.cardValue+=card;
			output.id+=30;
		}
		else if (kind===2) {
			output.cardType="hearts_9.svg";
			output.cardDescription="9 Hearts";
			output.cardValue+=card;
			output.id+=31;
		}
		else if (kind===3) {
			output.cardType="spades_9.svg";
			output.cardDescription="9 Spades";
			output.cardValue+=card;
			output.id+=32;
		} 

	}   else if (card===10) {
		let kind = Math.floor(Math.random() * 4);
		if (kind===0) {
			output.cardType="clubs_10.svg";
			output.cardDescription="10 Clubs";
			output.cardValue+=card;
			output.id+=33;
		}
		else if (kind===1) {
			output.cardType="diamonds_10.svg";
			output.cardDescription="10 Diamonds";
			output.cardValue+=card;
			output.id+=34;
		}
		else if (kind===2) {
			output.cardType="hearts_10.svg";
			output.cardDescription="10 Hearts";
			output.cardValue+=card;
			output.id+=35;
		}
		else if (kind===3) {
			output.cardType="spades_10.svg";
			output.cardDescription="10 Spades";
			output.cardValue+=card;
			output.id+=36;
		} 

	}   else if (card===11) {
		let kind = Math.floor(Math.random() * 4);
		if (kind===0) {
			output.cardType="clubs_jack.svg";
			output.cardDescription="Jack Clubs";
			output.cardValue+=10;
			output.id+=37;
		}
		else if (kind===1) {
			output.cardType="diamonds_jack.svg";
			output.cardDescription="Jack Diamonds";
			output.cardValue+=10;
			output.id+=38;
		}
		else if (kind===2) {
			output.cardType="hearts_jack.svg";
			output.cardDescription="Jack Hearts";
			output.cardValue+=10;
			output.id+=39;
		}
		else if (kind===3) {
			output.cardType="spades_jack.svg";
			output.cardDescription="Jack Spades";
			output.cardValue+=10;
			output.id+=40;
		} 
   
	}   else if (card===12) {
		let kind = Math.floor(Math.random() * 4);
		if (kind===0) {
			output.cardType="clubs_queen.svg";
			output.cardDescription="Queen Clubs";
			output.cardValue+=10;
			output.id+=41;
		}
		else if (kind===1) {
			output.cardType="diamonds_queen.svg";
			output.cardDescription="Queen Diamonds";
			output.cardValue+=10;
			output.id+=42;
		}
		else if (kind===2) {
			output.cardType="hearts_queen.svg";
			output.cardDescription="Queen Hearts";
			output.cardValue+=10;
			output.id+=43;
		}
		else if (kind===3) {
			output.cardType="spades_queen.svg";
			output.cardDescription="Queen Spades";
			output.cardValue+=10;
			output.id+=44;
		} 
	}   else if (card===13) {
		let kind = Math.floor(Math.random() * 4);
		if (kind===0) {
			output.cardType="clubs_king.svg";
			output.cardDescription="King Clubs";
			output.cardValue+=10;
			output.id+=45;
		}
		else if (kind===1) {
			output.cardType="diamonds_king.svg";
			output.cardDescription="King Diamonds";
			output.cardValue+=10;
			output.id+=46;
		}
		else if (kind===2) {
			output.cardType="hearts_king.svg";
			output.cardDescription="King Hearts";
			output.cardValue+=10;
			output.id+=47;
		}
		else if (kind===3) {
			output.cardType="spades_king.svg";
			output.cardDescription="King Spades";
			output.cardValue+=10;
			output.id+=48;
		} 
	}   else if (card===1) {
		let kind = Math.floor(Math.random() * 4);
		if (kind===0) {
			output.cardType="clubs_ace.svg";
			output.cardDescription="Ace Clubs";
			output.cardValue+=11;
			output.id+=49;
		}
		else if (kind===1) {
			output.cardType="diamonds_ace.svg";
			output.cardDescription="Ace Diamonds";
			output.cardValue+=11;
			output.id+=50;
		}
		else if (kind===2) {
			output.cardType="hearts_ace.svg";
			output.cardDescription="Ace Hearts";
			output.cardValue+=11;
			output.id+=51;
		}
		else if (kind===3) {
			output.cardType="spades_ace.svg";
			output.cardDescription="Ace Spades";
			output.cardValue+=11;
			output.id+=52;
		} 
	}   
	return output;
// [0,2,3]
}





function startGame() { //assigns cards, pictures, descriptions to the user and the dealer using the "randomizeCard()" function,
	                   // and pushes it to an array. That way it'll be easy to track duplicate card objects.
					   // Also, calculates and displays sums at every stage
		
		document.getElementById('hitButtons').style.display="block";	
		if (BET===0) alert("Place a bet before starting!");

		else {
			cardsInGame[0] = randomizeCard();
			cardsInGame[1] = randomizeCard();
			cardsInGame[2] = randomizeCard();
			cardsInGame[3] = randomizeCard();
			ifCardsTheSame(cardsInGame);
			cardsInGameUser.push(cardsInGame[0],cardsInGame[1]);
			cardsInGameDealer.push(cardsInGame[2],cardsInGame[3]);
			console.log("cards in game:");
			console.log(cardsInGame);
			console.log("cards in game player:");
			console.log(cardsInGameUser);
	

		
		
		
			if (document.getElementById('cards').style.display!="none") alert("You are in the middle of a hand! Finish it first.");
			 //In case the user
			//presses the 'Start Game' button in the middle of a hand
			else {
			alert('Your first card is: ' + cardsInGameUser[0].cardDescription);
			alert('Your second card is: ' + cardsInGameUser[1].cardDescription);
			alert('Dealers first card is: ' + cardsInGameDealer[0].cardDescription);
			

			

			for (let i=0; i<2;i++) {
				let playerImg = document.createElement("img");
				playerImg.src = cardsInGameUser[i].cardType;
				playerImages.appendChild(playerImg);
            }

			let dealerImg = document.createElement("img");
			dealerImg.src = cardsInGameDealer[0].cardType;
			dealerImages.appendChild(dealerImg);
			let dealerInitial = document.createElement("img");
			dealerInitial.src = 'down.png';
			dealerImages.appendChild(dealerInitial);
			

			document.getElementById('cards').style.display="block";
			document.getElementById('Dcards').style.display="block";
			
			summ = sumOfCards(cardsInGameUser);
			dSumm = sumOfCards(cardsInGameDealer);
			mainSum+=aceControl(cardsInGameUser,summ);
			mainDsum+=aceControl(cardsInGameDealer,dSumm);
			sUM.innerText += " "+ " "+mainSum;
			dSUM.innerText += " "+ " "+mainDsum-(cardsInGameDealer[1].cardValue);
			if (mainSum<21) { //if the sum of the cards is less than 21, it prompts the user to take another card if he wishes.

				alert(alertText() + " and is less than 21. You can take another card.");
			}
			else if (mainSum===21) { // if the sum is equal to 21, let's the user know he won and indicates the exact profit
				alert(alertText() + ' Congrgulations, you hit Blacjack! you earned $' + (BET*1.5)+ ' out of which $' + (BET*1.5-BET) + ' is profit! You can play another hand or cashout.');
				BankRoll = BankRoll+(BET*1.5);
				
				whileCardsOnTable();
			
				
			}

           }


						
	


		}
	}
     const mediaQuery = window.matchMedia('(max-width: 500px)'); // create responsiveness

    if (mediaQuery.matches) {

		document.getElementById('cards').style.marginRight='13px';

    }

    function displayAllCards(element,arr) {

		
			let image = document.createElement("img");
			image.src = arr[arr.length-1].cardType;
			element.appendChild(image);
		
	
    }
	function hit() { // if the user chooses to 'hit', accounting for every case: sum of cards > 21 (automatic loss), 
		// < 21(can press 'hit' and take another card, or 'do not hit' and let the dealer play)
		// or = 21 (automatic win) and claculates the profit/loss.
		
		if (mainSum===0) { // In case the user presses 'Start Game' in the middle of a hand

			alert("Press the 'Start Game' Button first to be dealt with the initial 2 cards!");
		}

		else {

				mainSum=0;
				let newCard = randomizeCard();
				cardsInGame.push(newCard);
				ifCardsTheSame(cardsInGame);
				cardsInGameUser.push(cardsInGame[cardsInGame.length-1]);
				displayAllCards(playerImages,cardsInGameUser);
				mainSum += sumOfCards(cardsInGameUser);
				mainSum = aceControl(cardsInGameUser,mainSum);
				sUM.innerText="Sum: "+ " "+ mainSum;
				if (mainSum<21) alert("Your new card is " + newCard.cardDescription + " and your new sum is "+mainSum+ ". You can take another card!");
				else if (mainSum===21) { 
					alert("Your new card is " + newCard.cardDescription + " and your new sum is "+mainSum+ ". Congratulations, you hit Blacjack! you earned $" + (BET*1.5)+ " out of which $" + (BET*1.5-BET) + " is profit! You can play another hand or cashout.");
					BankRoll=BankRoll+(BET*1.5);
				
					whileCardsOnTable();
					
				}

				else  { 
					alert("Sorry, Your new card is " + newCard.cardDescription + " and your sum is now "+mainSum+ " and it is above 21. You lost! your bank roll will decrease by $"+BET + ". You can play another hand or cash out.");
		
					whileCardsOnTable();

				}
			
		}
	}

	function doNotHit() { //In case the user chooses no to hit, the dealer take cards. 
		                  //accounting for every case: sum of cards >21 (automatic win for the user), 
						  // <21 (takes another more card) or = 21 (automatic win for the dealer) and claculates the profit/loss.
	
		if (mainSum===0) {

			alert("Press the 'Start Game' Button first to be dealt with the initial 2 cards!");
		}

		else {
			dealerImages.removeChild(dealerImages.lastChild);
			let dealerImg = document.createElement("img");
			dealerImg.src = cardsInGameDealer[1].cardType;
			dealerImages.appendChild(dealerImg);
			alert('Dealers second card is: ' + cardsInGameDealer[1].cardDescription);
			dSUM.innerText = "Sum: "+mainDsum

			while (mainDsum<17) {
				mainDsum=0;
				let newCard = randomizeCard();
				cardsInGame.push(newCard);
				ifCardsTheSame(cardsInGame);
				cardsInGameDealer.push(cardsInGame[cardsInGame.length-1]);
				displayAllCards(dealerImages,cardsInGameDealer);
				mainDsum+= sumOfCards(cardsInGameDealer);
				mainDsum = aceControl(cardsInGameDealer,mainDsum);
				dSUM.innerText="Sum: "+ " "+ mainDsum;
				alert("Dealer takes another card. " + "Dealer's card is " + newCard.cardDescription + alertTextDealer());
			}
			if (mainDsum===mainSum) {
					alert("You and the dealer both have "+ mainDsum +". It's a tie! Your bet amount will be added back to your bank roll. You can play another hand or cashout.");
					BankRoll=BankRoll+BET;
					pastTense();
					

					whileCardsOnTable();
				
			}
			else if (mainDsum===21) {
					alert ("Dealer has 21. You lost.  your bank roll will decrease by $"+BET + ". You can play another hand or cashout.");
					pastTense();
					
					mainDsum=0;
					mainSum=0;

					whileCardsOnTable();
				
					

			}
			else if (mainDsum>21) {
					
				alert("Dealer has "+mainDsum+ " which is above 21. You Won! you earned $" + (BET*2)+ " out of which $" + (BET*2-BET) + " is profit! You can play another hand or cashout.");
				BankRoll=BankRoll+(BET*2);
				whileCardsOnTable();
		


			}
			else {
				whoWon();
			}
				
		}	
	}
	
	function whoWon() { //In case neither the user or the dealer hit 21 or went above it, we apply this function which checks who 
		                // is closer to 21 and acts accordingly by notifying who won and 'clears' the table.

			let finalSum = mainSum;
			let finalDSum = mainDsum;
			if ((21-finalSum)<(21-finalDSum)) {
				alert('Congratulations, you have ' + finalSum + ' and dealer has ' + finalDSum + '. you won!  you earned $' + (BET*2)+ ' out of which $' + (BET*2-BET) + ' is a profit! You can play another hand or cashout.');
				BankRoll=BankRoll+(BET*2);
				whileCardsOnTable();

				
		

				
			}
			else { 
			
				alert  ('Dealer has ' + finalDSum + ' and you have ' + finalSum + '. Dealer wins! your bank roll will decrease by $'+BET + ". You can play another hand or cashout.");
				

				whileCardsOnTable();
		
			
			}

	}
    function playAnotherHand() { //prepares the setup in case the user chooses to play another hand.
		if (document.getElementById('cards').style.display === 'none') {alert("You have to place a bet followed by 'Start Game' before you can use this function")}
		else if (mainSum !== 0) {alert('You have to finish this hand first!')}
		
		else {
			nullify();
		
			
		}
	}
	function preCashout() { // Deals exceptions in case the user press 'cash out; - the user have no money in bankroll,
		                    // or the user didn't finish a hand 
		if (BankRoll===0) { 
			alert("You have no money left on your BankRoll!");
			return;
		}
		if (mainSum!==0) {
			if (window.confirm("You have chips on the table. Are you sure you want to cash out?")) {
				cashOut();
				return;
				
			}
			else {
				return;
			}
		}
		

		else {
			cashOut();
			
		}
	}
	function cashOut() { // Once the user chooses to cash out, the app notifies him exactly how much money he's cashing out with 
		                 // and what is the profit/loss compared to the initial $5000 he started with.
		
			if (!window.confirm("You have $" + BankRoll + " in your bank roll. Are you sure you want to cash out?")) {return};
				
			
				
			
				if (BankRoll>5000) {
					alert("Congratulations. You are cashing out with a total of $" + BankRoll + " , Which is a $" + (BankRoll-5000) + " Profit!");
					BankRoll=5000;

					location.reload();
				}
				else if (BankRoll<5000) {
					alert("You are cashing out with a total of $" + BankRoll + " , Which unfourtunately is a $" + (5000-BankRoll) + " Loss.");
					BankRoll=5000;

					location.reload();
				}
				else {
					alert("You are cashing out with $5000 which is the same amount you started with. You are break even!");
					location.reload();
				}
			
		
			

	}




 