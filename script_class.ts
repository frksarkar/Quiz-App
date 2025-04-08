import { getQuestions, Question } from './questions.js';

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

interface DivElements {
	[key: string]: HTMLDivElement;
	infoBox: HTMLDivElement;
	quizBox: HTMLDivElement;
	scoreBox: HTMLDivElement;
	scoreText: HTMLDivElement;
	optionsList: HTMLDivElement;
	timeCount: HTMLDivElement;
	timeLineProgress: HTMLDivElement;
	timeOff: HTMLDivElement;
	user: HTMLDivElement;
	customizeUserField: HTMLDivElement;
	errorMess: HTMLDivElement;
}

interface ButtonElements {
	[key: string]: HTMLButtonElement | HTMLInputElement;
	startBtn: HTMLButtonElement;
	exitBtn: HTMLButtonElement;
	continueBtn: HTMLButtonElement;
	nextBtn: HTMLButtonElement;
	exitScoreBoxBtn: HTMLButtonElement;
	restartBtn: HTMLButtonElement;
	languageSwitchBtn: HTMLInputElement;
	userInputBoxExitBtn: HTMLButtonElement;
	userInputBoxContinueBtn: HTMLButtonElement;
	customBtn: HTMLButtonElement;
}

interface InputElements {
	[key: string]: HTMLInputElement;
	inputUserName: HTMLInputElement;
	inputQuestionLength: HTMLInputElement;
	inputQuestionValue: HTMLInputElement;
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

abstract class InitializeElements {
	protected divElements!: DivElements;
	protected input!: InputElements;
	protected buttons!: ButtonElements;

	// Initialize all DOM elements
	protected initializeElements(): void {
		this.divElements = {
			infoBox: this.getElement<HTMLDivElement>('.info_box'),
			quizBox: this.getElement<HTMLDivElement>('.quiz_box'),
			scoreBox: this.getElement<HTMLDivElement>('.score_box'),
			scoreText: this.getElement<HTMLDivElement>(
				'.score_text',
				this.divElements?.scoreBox
			),
			optionsList: this.getElement<HTMLDivElement>('.option_list'),
			timeCount: this.getElement<HTMLDivElement>(
				'.timer .timer_sec',
				this.divElements?.quizBox
			),
			timeLineProgress: this.getElement<HTMLDivElement>(
				'.linerProgressBar',
				this.divElements?.quizBox
			),
			timeOff: this.getElement<HTMLDivElement>(
				'.time_text',
				this.divElements?.quizBox
			),
			user: this.getElement<HTMLDivElement>(
				'.userName span',
				this.divElements?.scoreBox
			),
			customizeUserField:
				this.getElement<HTMLDivElement>('.userInputFieldBox'),
			errorMess: this.getElement<HTMLDivElement>(
				'.buttons p',
				this.divElements?.customizeUserField
			),
		};

		this.input = {
			inputUserName: this.getElement<HTMLInputElement>(
				'.userInputFieldBox #userNameInput'
			),
			inputQuestionLength: this.getElement<HTMLInputElement>(
				'.userInputFieldBox #questionNumberInput'
			),
			inputQuestionValue: this.getElement<HTMLInputElement>(
				'.userInputFieldBox #questionValueInput'
			),
		};

		this.buttons = {
			startBtn: this.getElement<HTMLButtonElement>('.start_btn button'),
			exitBtn: this.getElement<HTMLButtonElement>(
				'.buttons .quit',
				this.divElements.infoBox
			),
			continueBtn:
				this.getElement<HTMLButtonElement>('.buttons .restart'),
			nextBtn: this.getElement<HTMLButtonElement>(
				'.next_btn',
				this.divElements.quizBox
			),
			exitScoreBoxBtn: this.getElement<HTMLButtonElement>(
				'.quit',
				this.divElements.scoreBox
			),
			restartBtn: this.getElement<HTMLButtonElement>(
				'.restart',
				this.divElements.scoreBox
			),
			languageSwitchBtn: this.getElement<HTMLInputElement>(
				'input',
				this.divElements.infoBox
			),
			userInputBoxExitBtn: this.getElement<HTMLButtonElement>(
				'.quit',
				this.divElements.customizeUserField
			),
			userInputBoxContinueBtn: this.getElement<HTMLButtonElement>(
				'.restart',
				this.divElements.customizeUserField
			),
			customBtn: this.getElement<HTMLButtonElement>(
				'.customizeBtn',
				this.divElements.infoBox
			),
		};
		console.log(this.divElements);
	}

	// Utility method to get a single element
	protected getElement<T extends HTMLElement>(
		selector: string,
		parent: Document | Element = document
	): T {
		const element = parent.querySelector(selector) as T;
		if (!element) {
			throw new Error(`Element not found: ${selector}`);
		}
		return element;
	}

	// Utility method to get multiple elements
	protected getElements<T extends HTMLElement>(
		selector: string,
		parent: Document | Element = document
	): NodeListOf<T> {
		const elements = parent.querySelectorAll(selector) as NodeListOf<T>;
		if (elements.length === 0) {
			throw new Error(`Elements not found: ${selector}`);
		}
		return elements;
	}
}

class QuizApp extends InitializeElements {
	question: Question[];
	utility: Utility;
	timer: Timer;
	constructor() {
		super();
		this.question = this.shuffleArray(getQuestions('bangla'));
		this.initializeElements();
		this.utility = new Utility();
		this.timer = new Timer(
			this.divElements,
			this.buttons,
			this.utility,
			this
		);
		this.addEventToElements();
	}

	addEventToElements() {
		this.buttons.userInputBoxExitBtn.addEventListener('click', () => {
			this.divElements.customizeUserField.classList.remove('activeInfo');
			this.divElements.infoBox.classList.add('activeInfo');
		});
		this.buttons.userInputBoxContinueBtn.addEventListener('click', () => {
			if (
				this.input.inputUserName.value != '' &&
				this.input.inputQuestionLength.value != '' &&
				parseInt(this.input.inputQuestionLength.value) > 0 &&
				parseInt(this.input.inputQuestionLength.value) < 51 &&
				this.input.inputQuestionValue.value != '' &&
				parseInt(this.input.inputQuestionValue.value) > 0 &&
				parseInt(this.input.inputQuestionValue.value) < 11
			) {
				this.divElements.errorMess.style.opacity = '0';
				defaultValue.userName = this.input.inputUserName.value;
				defaultValue.questionLength = parseInt(
					this.input.inputQuestionLength.value
				);
				defaultValue.eachQuestionValue = parseInt(
					this.input.inputQuestionValue.value
				);
				this.divElements.customizeUserField.classList.remove(
					'activeInfo'
				);
				this.divElements.quizBox.classList.add('activeInfo');
				this.showQuestions(0);
				return;
			}
			this.divElements.errorMess.style.opacity = '1';
		});

		this.buttons.startBtn.addEventListener('click', () => {
			this.divElements.infoBox.classList.add('activeInfo');
		});

		this.buttons.exitBtn.addEventListener('click', () => {
			this.divElements.infoBox.classList.remove('activeInfo');
		});

		this.buttons.continueBtn.addEventListener('click', () => {
			this.divElements.infoBox.classList.remove('activeInfo');
			this.divElements.quizBox.classList.add('activeInfo');
			this.showQuestions(0);
		});

		this.buttons.nextBtn.addEventListener('click', () => {
			this.utility.timerClear(defaultValue);
			defaultValue.progressBarWidth = 0;
			this.divElements.timeCount.innerHTML =
				defaultValue.timerValue.toString();
			this.divElements.timeLineProgress.style.backgroundColor = '#af69ef';

			defaultValue.questionCount++;
			if (defaultValue.questionCount === defaultValue.questionLength) {
				this.divElements.quizBox.classList.remove('activeInfo');
				this.divElements.infoBox.classList.remove('activeInfo');
				defaultValue.questionCount = 0;
				this.showScore();
			} else {
				this.showQuestions(defaultValue.questionCount);
				this.questionCountNum();
				this.buttons.nextBtn.style.display = 'none';
			}
		});

		this.buttons.exitScoreBoxBtn.addEventListener('click', () => {
			window.location.reload();
			this.divElements.scoreBox.classList.remove('activeInfo');
		});

		this.buttons.restartBtn.addEventListener('click', () => {
			this.defaultValueSet();
			this.divElements.scoreBox.classList.remove('activeInfo');
			this.divElements.quizBox.classList.add('activeInfo');
			this.showQuestions(0);
		});

		this.buttons.languageSwitchBtn.addEventListener('click', () => {
			let isItTrue = this.buttons.languageSwitchBtn.checked;
			if (isItTrue) {
				this.question = getQuestions('english');
				return;
			}
			this.question = getQuestions('bangla');
		});

		this.buttons.customBtn.addEventListener('click', () => {
			this.divElements.infoBox.classList.remove('activeInfo');
			this.divElements.customizeUserField.classList.add('activeInfo');
		});
	}

	optionHtmlMarker(question: string[]) {
		const optionsTag = `<div class="option"><span>${question[0]}</span></div>
    <div class="option"><span>${question[1]}</span></div>
    <div class="option"><span>${question[2]}</span></div>
    <div class="option"><span>${question[3]}</span></div>`;
		return optionsTag;
	}

	addEventListenersToOptions(optionsBox: HTMLElement) {
		const options = this.getElements('.option', optionsBox);
		options.forEach((element) => {
			element.addEventListener('click', () => {
				this.optionSelected(element);
			});
		});
	}

	setQuestionHeader(qusIndex: number) {
		const questionText = this.getElement<HTMLDivElement>('.que_text');
		this.divElements.timeOff.textContent = 'Time Left';

		// todo: can't get question number from array
		const questionTag = `<span>${this.question[qusIndex].number}. ${this.question[qusIndex].question} </span>`;
		questionText.innerHTML = questionTag;
	}

	showQuestions(index: number) {
		const optionsList = this.divElements.optionsList;
		this.setQuestionHeader(index);
		optionsList.innerHTML = this.optionHtmlMarker(
			this.question[index].options
		);
		this.addEventListenersToOptions(optionsList);

		this.questionCountNum();
		this.timer.startTimer();
		this.timer.linerProgressBar();
	}

	questionCountNum() {
		const questionElement = this.getElement(
			'.total_que',
			this.divElements.quizBox
		);
		const questionTag = `<span><p>${
			defaultValue.questionCount + 1
		}</p>Of<p>${defaultValue.questionLength}</p>Question</span>`;
		questionElement.innerHTML = questionTag;
	}

	correctAnsSelected(element: Element) {
		element.classList.add('correct');
		const tickIcon =
			'<div class="icon tick"><i class="fa-sharp fa-solid fa-check"></i></div>';
		element.insertAdjacentHTML('beforeend', tickIcon);
	}

	wrongAnsSelected(element: Element) {
		const xMarkIcon =
			'<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>';
		element.classList.add('inCorrect');
		element.insertAdjacentHTML('beforeend', xMarkIcon);
	}

	showCorrectAns(selectedOption: Element) {
		const optionsList = this.divElements.optionsList;
		const userSelectedAns = selectedOption.textContent;
		const correctAnswer = this.question[defaultValue.questionCount].answer;

		if (userSelectedAns === correctAnswer) {
			defaultValue.score++;
			defaultValue.userScore += defaultValue.eachQuestionValue;
			this.correctAnsSelected(selectedOption);
		} else {
			this.wrongAnsSelected(selectedOption);
			this.utility.autoSelectedAns(optionsList, correctAnswer); // if answer is wrong than auto magically select correct answer
		}
		this.utility.unselectedOptionDisable(optionsList);
	}

	shuffleArray<T>(array: T[]): T[] {
		return array.sort(() => Math.random() - 0.5);
	}

	optionSelected(answer: Element) {
		this.utility.timerClear(defaultValue);
		this.showCorrectAns(answer);
		this.buttons.nextBtn.style.display = 'block';
	}

	showScore() {
		this.divElements.scoreBox.classList.add('activeInfo');
		this.divElements.scoreText.innerHTML = `<span>Your final score is<p>${
			defaultValue.userScore
		}</p>out of<p>${
			defaultValue.questionLength * defaultValue.eachQuestionValue
		}</p></span>`;
		this.divElements.user.innerText = defaultValue.userName;
	}

	autoDisableAllElement(optionsList: HTMLElement) {
		const correctAnswer = this.question[defaultValue.questionCount].answer;
		this.utility.unselectedOptionDisable(optionsList);
		this.utility.autoSelectedAns(optionsList, correctAnswer);
	}

	defaultValueSet() {
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
	}
}

class Utility {
	autoSelectedAns(optionsList: HTMLElement, correctAnswer: string) {
		for (let option of optionsList.children) {
			if (option.textContent === correctAnswer) {
				option.setAttribute('class', 'option correct');
			}
		}
	}

	unselectedOptionDisable(optionsList: HTMLElement) {
		for (let option of optionsList.children) {
			option.classList.add('disable');
		}
	}

	timerClear(config: PlayerConfig) {
		if (config.timerValue > 0) config.timerValue = 15;
		if (config.counterId) clearInterval(config.counterId!);
		if (config.progressBarId) clearInterval(config.progressBarId!);
	}
}

class Timer {
	protected divElements!: DivElements;
	protected buttons!: ButtonElements;
	protected utility: Utility;
	protected quiz: QuizApp;

	constructor(
		divElements: DivElements,
		buttons: ButtonElements,
		utility: Utility,
		quiz: QuizApp
	) {
		this.divElements = divElements;
		this.buttons = buttons;
		this.utility = utility;
		this.quiz = quiz;
	}
	updateTimer(time: number) {
		this.divElements.timeCount.innerHTML =
			time <= 9 ? '0' + time : time.toString();
	}

	startTimer() {
		defaultValue.counterId = setInterval(() => {
			this.timer(defaultValue.timerValue);
		}, 1000);
	}

	endTimer() {
		defaultValue.progressBarWidth = 0;
		this.divElements.timeOff.textContent = 'Time Off';
		defaultValue.timerValue = 15;
		this.utility.timerClear(defaultValue);
		this.quiz.autoDisableAllElement(this.divElements.optionsList);
		this.buttons.nextBtn.style.display = 'block';
	}

	timer(time: number) {
		this.divElements.timeCount.innerHTML = time.toString();
		defaultValue.timerValue--;
		this.updateTimer(time);

		if (time === 0) {
			this.endTimer();
		}
	}

	linerProgressBar() {
		defaultValue.progressBarId = setInterval(() => {
			defaultValue.progressBarWidth++;
			this.divElements.timeLineProgress.style.width = `${defaultValue.progressBarWidth}%`;
			if (defaultValue.progressBarWidth === 70) {
				this.divElements.timeLineProgress.style.backgroundColor = 'red';
			}
			if (defaultValue.progressBarWidth === 100) {
				clearInterval(defaultValue.progressBarId!);
			}
		}, 159);
	}
}

window.addEventListener('DOMContentLoaded', () => {
	new QuizApp();
});

// const Default = {
// 	userName: 'guest',
// 	questionLength: 50,
// 	eachQuestionValue: 2,
// 	userScore: 0,
// 	questionCount: 0,
// 	score: 0,
// 	counterId: null,
// 	timerValue: 15,
// 	progressBarId: null,
// 	progressBarWidth: 0,
// };

// class PlayerConfigClass {
// 	private config: PlayerConfig;

// 	constructor() {
// 		this.config = {
// 			userName: Default.userName,
// 			questionLength: Default.questionLength,
// 			eachQuestionValue: Default.eachQuestionValue,
// 			userScore: Default.userScore,
// 			questionCount: Default.questionCount,
// 			score: Default.score,
// 			counterId: Default.counterId,
// 			timerValue: Default.timerValue,
// 			progressBarId: Default.progressBarId,
// 			progressBarWidth: Default.progressBarWidth,
// 		};
// 	}

// 	getConfig() {
// 		return this.config;
// 	}

// 	setConfig(newConfig: Partial<PlayerConfig>) {
// 		this.config = { ...this.config, ...newConfig };
// 	}

// 	setDefaultValue() {
// 		this.config = Default;
// 	}
// }
