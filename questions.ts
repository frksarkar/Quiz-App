import bngQuestions from './banglaQuestions.js';
import engQuestions from './englishQuestions.js';

interface Question {
	number: number;
	question: string;
	options: string[];
	answer: string;
}

type Languages = 'bangla' | 'english';

const getQuestions = (lang: Languages): Question[] => {
	switch (lang) {
		case 'bangla':
			return bngQuestions;
		case 'english':
			return engQuestions;
		default:
			return bngQuestions;
	}
};

export { bngQuestions, engQuestions, getQuestions, Question };
