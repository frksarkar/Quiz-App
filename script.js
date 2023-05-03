// getting all require elements
const startBtn = document.querySelector('.start_btn button');
const infoBox = document.querySelector('.info_box');
const exitBtn = infoBox.querySelector('.buttons .quit');
const continueBtn = document.querySelector('.buttons .restart');
const quizBox = document.querySelector('.quiz_box');
const nextBtn = quizBox.querySelector('.next_btn');
const scoreBox = document.querySelector('.score_box');
const exitScoreBoxBtn = scoreBox.querySelector('.quit');
const number = {
	questionCount: 0,
	score: 0,
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

// let questionCount = 0;

// getting questions and options from array
function showQuestions(index) {
	const questionText = document.querySelector('.que_text');
	const optionsList = document.querySelector('.option_list');
	const questionTag = `<span>${question[index].number}. ${question[index].question} </span>`;
	questionText.innerHTML = questionTag;
	const optionsTag = `<div class="option"><span>${question[index].options[0]}</span></div>
    <div class="option"><span>${question[index].options[1]}</span></div>
    <div class="option"><span>${question[index].options[2]}</span></div>
    <div class="option"><span>${question[index].options[3]}</span></div>`;
	optionsList.innerHTML = optionsTag;
	questionCountNum();
	const option = optionsList.querySelectorAll('.option');
	option.forEach((element) => {
		element.setAttribute('onclick', 'optionSelected(this)');
	});
}

function questionCountNum() {
	const questionElement = quizBox.querySelector('.total_que');
	const questionTag = `<span><p>${number.questionCount + 1}</p>Of<p>${
		question.length
	}</p>Question</span>`;
	questionElement.innerHTML = questionTag;
}

function optionSelected(answer) {
	const userAnswer = answer.textContent;
	if (userAnswer === question[number.questionCount].answer) {
		number.score++;
		answer.classList.add('correct');
	} else {
	}
}

nextBtn.addEventListener('click', () => {
	number.questionCount++;
	if (number.questionCount === question.length) {
		quizBox.classList.remove('activeInfo');
		infoBox.classList.remove('activeInfo');
		number.questionCount = 0;
		showScore();
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
