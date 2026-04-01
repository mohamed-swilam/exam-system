import type { SingleChoiceData, MatchingData } from "./plugin.types";

export interface Question<TData> {
    id: string;
    examId: string;
    type: string;
    points: number;
    data: TData;
}

export interface SingleChoiceQuestion extends Question<SingleChoiceData> {
    type: "single_choice";
}

export interface MatchingQuestion extends Question<MatchingData> {
    type: "matching";
}

export interface QuestionTypeAnswerMap {
    single_choice: number | string;
    matching: Record<string, string>;
}

export type AnswerOf<T extends AnyQuestion["type"]> = QuestionTypeAnswerMap[T];

export type GradeInput = {
    [Q in AnyQuestion as Q["id"]]: AnswerOf<Q["type"]>;
};

export type AnyQuestion = SingleChoiceQuestion | MatchingQuestion;