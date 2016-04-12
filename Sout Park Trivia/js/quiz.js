var testContent, pos=0, optionable, clickedEl, options, question, opt1, opt2, opt3, opt4, answer, updatedOption, selected, score = 0;
var backgroundImage = document.getElementsByTagName("html")[0];													//target html ~ returns array so you must use array selecter [0]

var questions = [
	["Which character has a reputation for dying?","Kenny","Stan","Butters","Cartman","Kenny"],
	["Which of the boys has a Canadian family member?","Stan","Kyle","Cartman","Craig","Kyle"],
	["What animal did the boys send to the moon on a rocket?","Monkey","Whale","Pack of wolves","Goldfish","Whale"],
	["Who is Eric Cartman's father?","Mr. Marsh","Mr. Mackey","Mr. Tennorman","His own mother","Mr. Tennorman"],
	["How many seasons of South Park are there?","12","16","17","18","18"],
	["What is the name of the South Park movie?","Bigger, Longer, and Uncut","Not Without my Anus","Asses of Fire","South Park: The movie","Bigger, Longer, and Uncut"],
	["Kenny has a super-hero alter ego known as...?","The Coon","Toolshed","Mysterion","MintBerry Crunch","Mysterion"],
	["In season 3, Chef nearly marries what type of woman?","A blonde","A dentist","A Porfessional Roller Derby player","A Succubus","A Succubus"],
	['Who is famous for saying "mmkay"?',"Mr Garrison","Mr Macky","Kenny","Randy Marsh","Mr Macky"],
	["Which real life celebrity battles Randy Marsh for the world record of producing the biggest crap?","Bono","Madonna","Obama","Katie Couric","Bono"],
	["The secret identity of South Park evil villin Professor Chaos is none other than...?","Tweak","Craig","Butters","Ike","Butters"]
]

document.getElementsByClassName("startQuiz")[0].addEventListener("click", buildQuestion, false);				//change page after clicking start button
document.getElementsByClassName("submit")[0].addEventListener("click", checkAnswer, false);
document.getElementsByClassName("playAgain")[0].addEventListener("click", function(){
		location.reload()
	}, false);



function getEl(x) {
	return document.getElementById(x);																			//quick getElementById function to use later
}

function buildQuestion () {	
	
	if (pos >= questions.length){
		getEl("test").style.display = "none";
		getEl("end").style.display = "inline";
		backgroundImage.setAttribute("class", "end")
		
		document.getElementsByClassName("score")[0].textContent = "You answered "+score+" out of "+questions.length+" questions correctly!";
		return false;
	}
	
	if (pos == 0) {																								//this only needs to run once.. hence [0]
	backgroundImage.setAttribute("class", "test");																//change html background image base on class
	getEl("intro").style.display = "none";																		//hide intro scene html
	getEl("test").style.display = "inline";																		//show test html
	}
	
	document.getElementsByClassName("status")[0].textContent = "Question "+(pos+1)+" out of "+questions.length;	//show what question you are on
		
	question = questions[pos][0];																				//get question from array
	document.getElementsByClassName("question")[0].textContent = question;										//write question

	opt1 = questions[pos][1];																					//get options from array
	opt2 = questions[pos][2];	
	opt3 = questions[pos][3];
	opt4 = questions[pos][4];
	
	options = document.getElementsByTagName("span");															//collect spans in array
	for (i = 0; i < options.length; i++) {																		//loop through them
		options[i].setAttribute("class", "");																	//remove class "selected" for all of them
		updatedOption = questions[pos][i+1];																	//create variable containing text from array value ~ has to be i+1 so it starts at [1]
		options[i].textContent = updatedOption;																	//update text content, then move on to next one
	}		
}														

optionable = document.getElementsByTagName("span");
for (i = 0; i < optionable.length; i++){																		//loop through all four choices
	optionable[i].addEventListener("click", function  () {														//add event listener for click to all of them
		for (i=0; i < optionable.length; i++){																	//when on is clicked, loop through all four again
			if (optionable[i].className.match(/(?:^|\s)selected(?!\S)/)){										//find if any of them have class "selected"
		        optionable[i].className = optionable[i].className.replace(/(?:^|\s)selected(?!\S)/g, '');		//if so, remove class selected from that one
			}
		}
		this.setAttribute("class", "selected");																	//now get the one that was clicked (this) and add class "selected" to it
	}, false);																									//end event listener
}

function checkAnswer () {
	answer = questions[pos][5];																					//get answer from array and make variable from it
	selected = document.getElementsByClassName("selected")[0].textContent;										//get text content of select element
	
	if (selected == answer){																					//if that one matches the answer
		score++																									//a 1 to score
	}
	pos++																										//add 1 to position
	buildQuestion ();																							//and build the next question
}
