// getting all require elements
const startBtn = document.querySelector('.start_btn button');
const infoBox = document.querySelector('.info_box');
const exitBtn = infoBox.querySelector('.buttons .quit');
const continueBtn = document.querySelector('.buttons .restart');
const quizBox = document.querySelector('.quiz_box');
const nextBtn = quizBox.querySelector('.next_btn');
const scoreBox = document.querySelector('.score_box');
const scoreText = scoreBox.querySelector('.score_text');
const exitScoreBoxBtn = scoreBox.querySelector('.quit');
const optionsList = document.querySelector('.option_list');
const timeCount = quizBox.querySelector('.timer .timer_sec');
const timeLineProgress = quizBox.querySelector('.linerProgressBar');
const restartBtn = scoreBox.querySelector('.restart');
const languageSwitchBtn = infoBox.querySelector('input');
const xmarkIcon =
	'<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>';
const tickIcon =
	'<div class="icon tick"><i class="fa-sharp fa-solid fa-check"></i></div>';
let question = BangleQuestion;

const number = {
	scoreNum: 5,
	userScore: 0,
	questionCount: 0,
	score: 0,
	counter: null,
	timerValue: 15,
	progressBarId: null,
	progressBarWidth: 0,
};

// start quiz button clicked
startBtn.addEventListener('click', () => {
	infoBox.classList.add('activeInfo');
});

// exit button clicked

exitBtn.addEventListener('click', () => {
	infoBox.classList.remove('activeInfo');
});

// continue button clicked

continueBtn.addEventListener('click', () => {
	infoBox.classList.remove('activeInfo');
	quizBox.classList.add('activeInfo');
	showQuestions(0);
});

// getting questions and options from array
function showQuestions(index) {
	const questionText = document.querySelector('.que_text');

	const questionTag = `<span>${question[index].number}. ${question[index].question} </span>`;
	questionText.innerHTML = questionTag;
	const optionsTag = `<div class="option"><span>${question[index].options[0]}</span></div>
    <div class="option"><span>${question[index].options[1]}</span></div>
    <div class="option"><span>${question[index].options[2]}</span></div>
    <div class="option"><span>${question[index].options[3]}</span></div>`;
	optionsList.innerHTML = optionsTag;
	const options = optionsList.querySelectorAll('.option');
	questionCountNum();
	options.forEach((element) => {
		element.setAttribute('onclick', 'optionSelected(this)');
	});
	questionCountNum();
	startTimer(number.timerValue);
	linerProgressBar();
}

function questionCountNum() {
	const questionElement = quizBox.querySelector('.total_que');
	const questionTag = `<span><p>${number.questionCount + 1}</p>Of<p>${
		question.length
	}</p>Question</span>`;
	questionElement.innerHTML = questionTag;
}

function optionSelected(answer) {
	clearInterval(number.counter);
	clearInterval(number.progressBarId);
	const userAnswer = answer.textContent;
	const correctAnswer = question[number.questionCount].answer;
	const childrenElementLength = optionsList.children.length;
	if (userAnswer === correctAnswer) {
		number.score++;
		number.userScore += number.scoreNum;
		answer.classList.add('correct');
		answer.insertAdjacentHTML('beforeend', tickIcon);
	} else {
		answer.classList.add('inCorrect');
		answer.insertAdjacentHTML('beforeend', xmarkIcon);

		// if answer is wrong than auto magically select correct answer

		autoSelectedAns(childrenElementLength, correctAnswer);
	}
	nextBtn.style.display = 'block';

	// for (let i = 0; i < childrenElementLength; i++) {
	// 	optionsList.children[i].classList.add('disable');
	// }
	childElementDisable(childrenElementLength, optionsList);
}

const childElementDisable = (childrenElementLength, optionsList) => {
	for (let i = 0; i < childrenElementLength; i++) {
		optionsList.children[i].classList.add('disable');
	}
};

nextBtn.addEventListener('click', () => {
	clearInterval(number.counter);
	clearInterval(number.progressBarId);
	number.progressBarWidth = 0;
	timeLineProgress.style.backgroundColor = '#af69ef';

	number.questionCount++;
	if (number.questionCount === question.length) {
		quizBox.classList.remove('activeInfo');
		infoBox.classList.remove('activeInfo');
		number.questionCount = 0;
		showScore();
	} else {
		showQuestions(number.questionCount);
		questionCountNum();
		nextBtn.style.display = 'none';
	}
});

function autoSelectedAns(childrenElementLength, correctAnswer) {
	for (let i = 0; i < childrenElementLength; i++) {
		if (optionsList.children[i].textContent === correctAnswer) {
			optionsList.children[i].setAttribute('class', 'option correct');
		}
	}
}

function showScore() {
	scoreBox.classList.add('activeInfo');
	if (number.userScore < 40) {
		scoreText.innerHTML = `<span>and sorry, you got only<p>${
			number.userScore
		}</p>out of<p>${question.length * number.scoreNum}</p></span>`;
	} else if (number.userScore < 80) {
		scoreText.innerHTML = `<span>and great, you got only<p>${
			number.userScore
		}</p>out of<p>${question.length * number.scoreNum}</p></span>`;
	} else {
		scoreText.innerHTML = `<span>and supper, you got only<p>${
			number.userScore
		}</p>out of<p>${question.length * number.scoreNum}</p></span>`;
	}
}

exitScoreBoxBtn.addEventListener('click', () => {
	scoreBox.classList.remove('activeInfo');
});

function startTimer(time) {
	number.counter = setInterval(() => {
		timer();
	}, 1000);

	function timer() {
		timeCount.innerHTML = time;
		time--;
		if (time < 9) {
			let addZero = timeCount.textContent;
			timeCount.innerHTML = '0' + addZero;
		}
		if (time === -1) {
			number.progressBarWidth = 0;
			clearInterval(number.counter);
			clearInterval(number.progressBarId);
			autoDisableAllElement(optionsList);
			nextBtn.style.display = 'block';
		}
	}
}

function autoDisableAllElement(optionsList) {
	const correctAnswer = question[number.questionCount].answer;
	const childrenElementLength = optionsList.children.length;
	autoSelectedAns(childrenElementLength, correctAnswer);
	childElementDisable(childrenElementLength, optionsList);
}

function linerProgressBar() {
	number.progressBarId = setInterval(() => {
		number.progressBarWidth++;
		timeLineProgress.style.width = `${number.progressBarWidth}%`;
		if (number.progressBarWidth === 70) {
			timeLineProgress.style.backgroundColor = 'red';
		}
		if (number.progressBarWidth === 100) {
		}
	}, 159);
}

restartBtn.addEventListener('click', () => {
	number.scoreNum = 5;
	number.userScore = 0;
	number.questionCount = 0;
	number.score = 0;
	number.counter = null;
	number.timerValue = 15;
	number.progressBarId = null;
	number.progressBarWidth = 0;
	scoreBox.classList.remove('activeInfo');
	quizBox.classList.add('activeInfo');
	showQuestions(0);
});

languageSwitchBtn.addEventListener('click', () => {
	let isItTrue = languageSwitchBtn.checked;
	if (isItTrue) {
		question = EngQuestions;
		return;
	}
	question = BangleQuestion;
});
