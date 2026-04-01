import type { Question } from "./question.types";

export interface QuestionPlugin<TData, TAnswer> {
    type: string;
    grade(question: Question<TData>, answer: TAnswer): number;
}

export interface SingleChoiceData {
    options: number[] | string[];
    correctAnswer: number | string;
}

export interface MatchingData {
    correctMapping: Record<string, string>;
}

export type AnyPlugin =
    | QuestionPlugin<SingleChoiceData, number | string>
    | QuestionPlugin<MatchingData, Record<string, string>>;