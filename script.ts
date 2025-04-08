import { getQuestions } from './questions.js';

const infoBox = getElement<HTMLDivElement>('.info_box'),
	quizBox = getElement<HTMLDivElement>('.quiz_box'),
	scoreBox = getElement<HTMLDivElement>('.score_box'),
	scoreText = getElement<HTMLDivElement>('.score_text', scoreBox),
	optionsList = getElement<HTMLDivElement>('.option_list'),
	timeCount = getElement<HTMLDivElement>('.timer .timer_sec', quizBox),
	timeLineProgress = getElement<HTMLDivElement>('.linerProgressBar', quizBox),
	timeOff = getElement<HTMLDivElement>('.time_text', quizBox),
	user = getElement<HTMLDivElement>('.userName span', scoreBox),
	customizeUserField = getElement<HTMLDivElement>('.userInputFieldBox'),
	errorMess = getElement<HTMLDivElement>('.buttons p', customizeUserField);

const input = {
	inputUserName: getElement<HTMLInputElement>(
		'.userInputFieldBox #userNameInput'
	),
	inputQuestionLength: getElement<HTMLInputElement>(
		'.userInputFieldBox #questionNumberInput'
	),
	inputQuestionValue: getElement<HTMLInputElement>(
		'.userInputFieldBox #questionValueInput'
	),
};

const buttons = {
	startBtn: getElement<HTMLButtonElement>('.start_btn button'),
	exitBtn: getElement<HTMLButtonElement>('.buttons .quit', infoBox),
	continueBtn: getElement<HTMLButtonElement>('.buttons .restart'),
	nextBtn: getElement<HTMLButtonElement>('.next_btn', quizBox),
	exitScoreBoxBtn: getElement<HTMLButtonElement>('.quit', scoreBox),
	restartBtn: getElement<HTMLButtonElement>('.restart', scoreBox),
	languageSwitchBtn: getElement<HTMLInputElement>('input', infoBox),
	userInputBoxExitBtn: getElement<HTMLButtonElement>(
		'.quit',
		customizeUserField
	),
	userInputBoxContinueBtn: getElement<HTMLButtonElement>(
		'.restart',
		customizeUserField
	),
	customBtn: getElement<HTMLButtonElement>('.customizeBtn', infoBox),
};

function getElement<T extends HTMLElement>(
	elementName: string,
	parentElement: Document | Element = document
) {
	const element = parentElement.querySelector(elementName) as T;
	if (!element) {
		throw new Error(`Element not found: ${elementName}`);
	}
	return element;
}

function getElements(
	elementName: string,
	parentElement: Document | Element = document
) {
	const elements = parentElement.querySelectorAll(
		elementName
	) as NodeListOf<HTMLElement>;
	if (!elements) {
		throw new Error(`Elements not found: ${elementName}`);
	}
	return elements;
}

function shuffleArray<T>(array: T[]): T[] {
	return array.sort(() => Math.random() - 0.5);
}

let question = shuffleArray(getQuestions('bangla'));

interface PlayerConfig {
	userName: string;
	questionLength: number;
	eachQuestionValue: number;
	userScore: number;
	questionCount: number;
	score: number;
	counterId: number | null;
	timerValue: number;
	progressBarId: number | null;
	progressBarWidth: number;
}

const defaultValue: PlayerConfig = {
	userName: 'guest',
	questionLength: 50,
	eachQuestionValue: 2,
	userScore: 0,
	questionCount: 0,
	score: 0,
	counterId: null,
	timerValue: 15,
	progressBarId: null,
	progressBarWidth: 0,
};

buttons.userInputBoxExitBtn.addEventListener('click', () => {
	customizeUserField.classList.remove('activeInfo');
	infoBox.classList.add('activeInfo');
});

buttons.userInputBoxContinueBtn.addEventListener('click', () => {
	if (
		input.inputUserName.value != '' &&
		input.inputQuestionLength.value != '' &&
		parseInt(input.inputQuestionLength.value) > 0 &&
		parseInt(input.inputQuestionLength.value) < 51 &&
		input.inputQuestionValue.value != '' &&
		parseInt(input.inputQuestionValue.value) > 0 &&
		parseInt(input.inputQuestionValue.value) < 11
	) {
		errorMess.style.opacity = '0';
		defaultValue.userName = input.inputUserName.value;
		defaultValue.questionLength = parseInt(input.inputQuestionLength.value);
		defaultValue.eachQuestionValue = parseInt(
			input.inputQuestionValue.value
		);
		customizeUserField.classList.remove('activeInfo');
		quizBox.classList.add('activeInfo');
		showQuestions(0);
		return;
	}
	errorMess.style.opacity = '1';
});

// start quiz button clicked
buttons.startBtn.addEventListener('click', () => {
	infoBox.classList.add('activeInfo');
});

// exit button clicked
buttons.exitBtn.addEventListener('click', () => {
	infoBox.classList.remove('activeInfo');
});

// continue button clicked
buttons.continueBtn.addEventListener('click', () => {
	infoBox.classList.remove('activeInfo');
	quizBox.classList.add('activeInfo');
	showQuestions(0);
});

function optionHtmlMarker(question: string[]) {
	const optionsTag = `<div class="option"><span>${question[0]}</span></div>
    <div class="option"><span>${question[1]}</span></div>
    <div class="option"><span>${question[2]}</span></div>
    <div class="option"><span>${question[3]}</span></div>`;
	return optionsTag;
}

function addEventListenersToOptions(optionsBox: HTMLElement) {
	const options = getElements('.option', optionsBox);
	options.forEach((element) => {
		element.addEventListener('click', () => {
			optionSelected(element);
		});
	});
}

function setQuestionHeader(qusIndex: number) {
	const questionText = getElement<HTMLDivElement>('.que_text');
	timeOff.textContent = 'Time Left';

	// todo: can't get question number from array
	const questionTag = `<span>${question[qusIndex].number}. ${question[qusIndex].question} </span>`;
	questionText.innerHTML = questionTag;
}

// getting questions and options from array
function showQuestions(index: number) {
	setQuestionHeader(index);
	optionsList.innerHTML = optionHtmlMarker(question[index].options);
	addEventListenersToOptions(optionsList);

	questionCountNum();
	startTimer();
	linerProgressBar();
}

function questionCountNum() {
	const questionElement = getElement('.total_que', quizBox);
	const questionTag = `<span><p>${defaultValue.questionCount + 1}</p>Of<p>${
		defaultValue.questionLength
	}</p>Question</span>`;
	questionElement.innerHTML = questionTag;
}

function correctAnsSelected(element: Element) {
	element.classList.add('correct');
	const tickIcon =
		'<div class="icon tick"><i class="fa-sharp fa-solid fa-check"></i></div>';
	element.insertAdjacentHTML('beforeend', tickIcon);
}

function wrongAnsSelected(element: Element) {
	const xMarkIcon =
		'<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>';
	element.classList.add('inCorrect');
	element.insertAdjacentHTML('beforeend', xMarkIcon);
}

function showCorrectAns(selectedOption: Element) {
	const userSelectedAns = selectedOption.textContent;
	const correctAnswer = question[defaultValue.questionCount].answer;
	const childrenElementLength = optionsList.children.length;

	if (userSelectedAns === correctAnswer) {
		defaultValue.score++;
		defaultValue.userScore += defaultValue.eachQuestionValue;
		correctAnsSelected(selectedOption);
	} else {
		wrongAnsSelected(selectedOption);
		autoSelectedAns(childrenElementLength, correctAnswer); // if answer is wrong than auto magically select correct answer
	}
	unselectedOptionDisable(childrenElementLength, optionsList);
}

function optionSelected(answer: Element) {
	timerClear(defaultValue);
	showCorrectAns(answer);
	buttons.nextBtn.style.display = 'block';
}

const unselectedOptionDisable = (
	childrenElementLength: number,
	optionsList: HTMLElement
) => {
	for (let i = 0; i < childrenElementLength; i++) {
		optionsList.children[i].classList.add('disable');
	}
};

function timerClear(config: PlayerConfig) {
	if (config.timerValue > 0) config.timerValue = 15;
	if (config.counterId) clearInterval(config.counterId!);
	if (config.progressBarId) clearInterval(config.progressBarId!);
}

buttons.nextBtn.addEventListener('click', () => {
	timerClear(defaultValue);
	defaultValue.progressBarWidth = 0;
	timeCount.innerHTML = defaultValue.timerValue.toString();
	timeLineProgress.style.backgroundColor = '#af69ef';

	defaultValue.questionCount++;
	if (defaultValue.questionCount === defaultValue.questionLength) {
		quizBox.classList.remove('activeInfo');
		infoBox.classList.remove('activeInfo');
		defaultValue.questionCount = 0;
		showScore();
	} else {
		showQuestions(defaultValue.questionCount);
		questionCountNum();
		buttons.nextBtn.style.display = 'none';
	}
});

function autoSelectedAns(childrenElementLength: number, correctAnswer: string) {
	for (let i = 0; i < childrenElementLength; i++) {
		if (optionsList.children[i].textContent === correctAnswer) {
			optionsList.children[i].setAttribute('class', 'option correct');
		}
	}
}

function showScore() {
	scoreBox.classList.add('activeInfo');
	scoreText.innerHTML = `<span>Your final score is<p>${
		defaultValue.userScore
	}</p>out of<p>${
		defaultValue.questionLength * defaultValue.eachQuestionValue
	}</p></span>`;
	user.innerText = defaultValue.userName;
}

buttons.exitScoreBoxBtn.addEventListener('click', () => {
	window.location.reload();
	scoreBox.classList.remove('activeInfo');
});

function startTimer() {
	defaultValue.counterId = setInterval(() => {
		timer(defaultValue.timerValue);
	}, 1000);
}

function updateTimer(time: number) {
	timeCount.innerHTML = time <= 9 ? '0' + time : time.toString();
}

function endTimer() {
	defaultValue.progressBarWidth = 0;
	timeOff.textContent = 'Time Off';
	defaultValue.timerValue = 15;
	timerClear(defaultValue);
	autoDisableAllElement(optionsList);
	buttons.nextBtn.style.display = 'block';
}

function timer(time: number) {
	timeCount.innerHTML = time.toString();
	defaultValue.timerValue--;
	updateTimer(time);

	if (time === 0) {
		endTimer();
	}
}

function autoDisableAllElement(optionsList: HTMLElement) {
	const correctAnswer = question[defaultValue.questionCount].answer;
	const childrenElementLength = optionsList.children.length;
	autoSelectedAns(childrenElementLength, correctAnswer);
	unselectedOptionDisable(childrenElementLength, optionsList);
}

function linerProgressBar() {
	defaultValue.progressBarId = setInterval(() => {
		defaultValue.progressBarWidth++;
		timeLineProgress.style.width = `${defaultValue.progressBarWidth}%`;
		if (defaultValue.progressBarWidth === 70) {
			timeLineProgress.style.backgroundColor = 'red';
		}
		if (defaultValue.progressBarWidth === 100) {
			clearInterval(defaultValue.progressBarId!);
		}
	}, 159);
}

function defaultValueSet() {
	defaultValue.userName = 'guest';
	defaultValue.questionLength = 5;
	defaultValue.eachQuestionValue = 2;
	defaultValue.userScore = 0;
	defaultValue.questionCount = 0;
	defaultValue.score = 0;
	defaultValue.counterId = null;
	defaultValue.timerValue = 15;
	defaultValue.progressBarId = null;
	defaultValue.progressBarWidth = 0;
	question = shuffleArray(question);
}

buttons.restartBtn.addEventListener('click', () => {
	defaultValueSet();
	scoreBox.classList.remove('activeInfo');
	quizBox.classList.add('activeInfo');
	showQuestions(0);
});

buttons.languageSwitchBtn.addEventListener('click', () => {
	let isItTrue = buttons.languageSwitchBtn.checked;
	if (isItTrue) {
		question = getQuestions('english');
		return;
	}
	question = getQuestions('bangla');
});

// custom question setting
buttons.customBtn.addEventListener('click', () => {
	infoBox.classList.remove('activeInfo');
	customizeUserField.classList.add('activeInfo');
});

const Default = {
	userName: 'guest',
	questionLength: 50,
	eachQuestionValue: 2,
	userScore: 0,
	questionCount: 0,
	score: 0,
	counterId: null,
	timerValue: 15,
	progressBarId: null,
	progressBarWidth: 0,
};

class PlayerConfigClass {
	private config: PlayerConfig;

	constructor() {
		this.config = {
			userName: Default.userName,
			questionLength: Default.questionLength,
			eachQuestionValue: Default.eachQuestionValue,
			userScore: Default.userScore,
			questionCount: Default.questionCount,
			score: Default.score,
			counterId: Default.counterId,
			timerValue: Default.timerValue,
			progressBarId: Default.progressBarId,
			progressBarWidth: Default.progressBarWidth,
		};
	}

	getConfig() {
		return this.config;
	}

	setConfig(newConfig: Partial<PlayerConfig>) {
		this.config = { ...this.config, ...newConfig };
	}

	setDefaultValue() {
		this.config = Default;
	}
}
