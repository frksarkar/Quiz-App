// getting all require elements
const startBtn = document.querySelector('.start_btn button');
const infoBox = document.querySelector('.info_box');
const exitBtn = infoBox.querySelector('.buttons .quit');
const continueBtn = document.querySelector('.buttons .restart');
const quizBox = document.querySelector('.quiz_box');
const nextBtn = quizBox.querySelector('.next_btn');
const scoreBox = document.querySelector('.score_box');
const exitScoreBoxBtn = scoreBox.querySelector('.quit');
const optionsList = document.querySelector('.option_list');
const timeCount = quizBox.querySelector('.timer .timer_sec');
const xmarkIcon =
	'<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>';
const tickIcon =
	'<div class="icon tick"><i class="fa-sharp fa-solid fa-check"></i></div>';
const number = {
	questionCount: 0,
	score: 0,
	counter: null,
	timerValue: 15,
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
	const userAnswer = answer.textContent;
	const correctAnswer = question[number.questionCount].answer;
	const allChildren = optionsList.children.length;
	if (userAnswer === correctAnswer) {
		number.score++;
		answer.classList.add('correct');
		answer.insertAdjacentHTML('beforeend', tickIcon);
	} else {
		answer.classList.add('inCorrect');
		answer.insertAdjacentHTML('beforeend', xmarkIcon);

		// if answer is wrong than auto magically select correct answer

		for (let i = 0; i < allChildren; i++) {
			if (optionsList.children[i].textContent === correctAnswer) {
				optionsList.children[i].setAttribute('class', 'option correct');
			}
		}
	}

	// for (let i = 0; i < allChildren; i++) {
	// 	optionsList.children[i].classList.add('disable');
	// }
	childElementDisable(allChildren, optionsList);
}

const childElementDisable = (allChildren, optionsList) => {
	for (let i = 0; i < allChildren; i++) {
		optionsList.children[i].classList.add('disable');
	}
};

nextBtn.addEventListener('click', () => {
	clearInterval(number.counter);
	number.questionCount++;
	if (number.questionCount === question.length) {
		quizBox.classList.remove('activeInfo');
		infoBox.classList.remove('activeInfo');
		number.questionCount = 0;
		showScore();
		clearInterval(counter);
	} else {
		showQuestions(number.questionCount);
		questionCountNum();
	}
});

function showScore() {
	scoreBox.classList.add('activeInfo');
	console.log(number.score);
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
		if (time === -1) {
			clearInterval(number.counter);
		}
	}
}
