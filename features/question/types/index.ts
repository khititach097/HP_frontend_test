export interface Question {
    id: string;
    question: string;
    choices: string[];
    answer: string | number;
    correct: boolean;
    done: boolean;
}