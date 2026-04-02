import type { AnswerOf, DataOf, Question, QuestionTypeAnswerMap } from "./question.types";

export interface QuestionPlugin<TData, TAnswer> {
    type: string;
    grade(question: Question<TData>, answer: TAnswer): number;
}

export type SingleChoiceData = DataOf<"single_choice">;
export type MatchingData     = DataOf<"matching">;

export type AnyPlugin = {
    [T in keyof QuestionTypeAnswerMap]: QuestionPlugin<
        DataOf<T>,
        AnswerOf<T>
    >;
}[keyof QuestionTypeAnswerMap];