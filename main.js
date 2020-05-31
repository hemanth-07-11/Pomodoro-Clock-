/.main-container
	var fccPomodoro = document.getElementById("fccPomodoro");
	//#controls
		var start = document.getElementById("start");
		var pause = document.getElementById("pause");
		var reset = document.getElementById("reset");
	//#pomodoroClock
		//#work
			var workTimer = document.getElementById("workTimer")
				var minsWorkTimer = document.getElementById("minsWorkTimer");
				var secsWorkTimer = document.getElementById("secsWorkTimer");
			//#workTuner
				var workTunerMinus = document.getElementById("workTunerMinus");
				var workTunerCount = document.getElementById("workTunerCount");
				var workTunerPlus = document.getElementById("workTunerPlus");
			//#letsWork
		//#break
			var breakTimer = document.getElementById("breakTimer");
				var minsBreakTimer = document.getElementById("minsBreakTimer");
				var secsBreakTimer = document.getElementById("secsBreakTimer");
			//#breakTuner
				var breakTunerMinus = document.getElementById("breakTunerMinus");
				var breakTunerCount = document.getElementById("breakTunerCount");
				var breakTunerPlus = document.getElementById("breakTunerPlus");
			//#letsBreak
//All get elements vairables above this line... ... ...
var workTimerMins = 25;
var workTimerSecs = 59;
var breakTimerMins = 5;
var breakTimerSecs = 59;
var setWorkTimer;
var setBreakTimer;
var workTimerMinsSwap = 25; //to store value when workTimer or breakTimer is clicked...
var breakTimerMinsSwap = 5; //to store value when workTimer or breakTimer is clicked...
var isStart = false;
var audioStart = new Audio("https://jpk-image-hosting.s3.amazonaws.com/pomodoro-app/audio/start.mp3");
var audioEnd = new Audio("https://jpk-image-hosting.s3.amazonaws.com/pomodoro-app/audio/end.mp3");
//All global variables above this line... ... ...
workTunerMinus.onclick = function() {
	workTimerMins -= 1; //decrease work timer by 1...
	//time can only be altered between 10 and 25 by clicking on minus button control...
	if (workTimerMins>9) {
		minsWorkTimer.innerHTML = workTunerCount.innerHTML = workTimerMins;
	} else if (workTimerMins<=9) {
		workTimerMins = minsWorkTimer.innerHTML = workTunerCount.innerHTML = 10;
	}
}
workTunerPlus.onclick = function() {
	workTimerMins += 1; //increase work timer by 1...
	//time can only be altered between 25 and 50 by clicking on plus button control...
	if (workTimerMins>=51) {
		workTimerMins = minsWorkTimer.innerHTML = workTunerCount.innerHTML = 50;
	} else if (workTimerMins<51) {
		minsWorkTimer.innerHTML = workTunerCount.innerHTML = workTimerMins;
	}
}
breakTunerMinus.onclick = function() {
	breakTimerMins -= 1; //decrease work timer by 1...
	//time can only be altered between 1 and 5 by clicking on minus button control...
	if (breakTimerMins>0) {
		minsBreakTimer.innerHTML = breakTunerCount.innerHTML = breakTimerMins;
	} else if (breakTimerMins<=0) {
		breakTimerMins = minsBreakTimer.innerHTML = breakTunerCount.innerHTML = 1;
	}
}
breakTunerPlus.onclick = function() {
	breakTimerMins += 1; //increase work timer by 1...
	//time can only be altered between 25 and 50 by clicking on plus button control...
	if (breakTimerMins>=11) {
		breakTimerMins = minsBreakTimer.innerHTML = breakTunerCount.innerHTML = 10;
	} else if (breakTimerMins<11) {
		minsBreakTimer.innerHTML = breakTunerCount.innerHTML = breakTimerMins;
	}
}
start.onclick = function() { //when start button is clicked...
	if (!isStart) {
		isStart = true;
		audioStart.play();
		workTimerMinsSwap = workTimerMins;
		breakTimerMinsSwap = breakTimerMins;
		//Above swap is for workTimer.onclick or breakTimer.onclick...
		minsWorkTimer.innerHTML = workTimerMins-1;
		secsWorkTimer.innerHTML = workTimerSecs;
		//Above two lines will setup the workTimer to begin with...
		setWorkTimer = setInterval(function() {getSetGoWorkTimerFun()}, 1000);
	}
}
reset.onclick = function() { //when reset button is clicked...
	doResetFun();
	audioStart.play();
}
workTimer.onclick = function() {
	doRestartFun();
	audioEnd.play();
}
breakTimer.onclick = function() {
	doRestartFun();
	audioEnd.play();
}
pause.onclick = function() {
	clearInterval(setWorkTimer);
	clearInterval(setBreakTimer);
	isStart = false;
	audioEnd.play();
}
//All function declarations below this line... ... ...
function getSetGoWorkTimerFun() { //this function will start the work timer...
	workTimerSecs -= 1;
	if (workTimerSecs<=59) {
		secsWorkTimer.innerHTML = workTimerSecs;
	}
	if (workTimerSecs<10) {
		secsWorkTimer.innerHTML = "0" + workTimerSecs;
	}
	if (workTimerSecs<0) {
		secsWorkTimer.innerHTML = workTimerSecs = 59;
		workTimerMins -= 1;
		if (workTimerMins>=10) {
			minsWorkTimer.innerHTML = workTimerMins;
		}
		if (workTimerMins<10) {
			minsWorkTimer.innerHTML = "0" + workTimerMins;
		}
		if (workTimerMins<0) {
			minsWorkTimer.innerHTML = workTunerCount.innerHTML;
			workTimerMins = Number(workTunerCount.innerHTML);
			secsWorkTimer.innerHTML = "00";
			clearInterval(setWorkTimer);
			minsBreakTimer.innerHTML = breakTimerMins-1;
			secsBreakTimer.innerHTML = breakTimerSecs;
			//Above two lines will setup the breakTimer to begin with...
			audioEnd.play();
			setBreakTimer = setInterval(function() {getSetGoBreakTimerFun()}, 1000);
		}
	}
}
function getSetGoBreakTimerFun() { //this function will start the break timer after the work timer stops on its own...
	breakTimerSecs -= 1;
	if (breakTimerSecs<=59) {
		secsBreakTimer.innerHTML = breakTimerSecs;
	}
	if (breakTimerSecs<10) {
		secsBreakTimer.innerHTML = "0" + breakTimerSecs;
	}
	if (breakTimerSecs<0) {
		secsBreakTimer.innerHTML = breakTimerSecs = 59;
		breakTimerMins -= 1;
		if (breakTimerMins>=10) {
			minsBreakTimer.innerHTML = breakTimerMins;
		}
		if (breakTimerMins<10) {
			minsBreakTimer.innerHTML = "0" + breakTimerMins;
		}
		if (breakTimerMins<0) {
			minsBreakTimer.innerHTML = breakTunerCount.innerHTML;
			breakTimerMins = Number(breakTunerCount.innerHTML);
			secsBreakTimer.innerHTML = "00";
			clearInterval(setBreakTimer);
			audioEnd.play();
			setWorkTimer = setInterval(function() {getSetGoWorkTimerFun()}, 1000);
		}
	}
}
function doResetFun() { //this function will reset the promodoro clock...
	clearInterval(setWorkTimer);
	clearInterval(setBreakTimer);
	isStart = false;
	workTimerMins = 25;
	workTimerSecs = 59;
	breakTimerMins = 5;
	breakTimerSecs = 59;
	minsWorkTimer.innerHTML = workTunerCount.innerHTML = workTimerMins;
	minsBreakTimer.innerHTML = breakTunerCount.innerHTML = breakTimerMins;
	secsWorkTimer.innerHTML = "00";
	secsBreakTimer.innerHTML = "00";
}
function doRestartFun() { //this function will restart the last settings...
	clearInterval(setWorkTimer);
	clearInterval(setBreakTimer);
	isStart = false;
	workTimerMins = workTimerMinsSwap;
	workTimerSecs = 59;
	breakTimerMins = breakTimerMinsSwap;
	breakTimerSecs = 59;
	minsWorkTimer.innerHTML = workTunerCount.innerHTML = workTimerMins;
	minsBreakTimer.innerHTML = breakTunerCount.innerHTML = breakTimerMins;
	secsWorkTimer.innerHTML = "00";
	secsBreakTimer.innerHTML = "00";
}