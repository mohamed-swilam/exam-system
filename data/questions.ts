import type { AnyQuestion } from "../types/question.types";

export const questions: AnyQuestion[] = [
    {
        id: "q1",
        examId: "1",
        type: "matching",
        points: 10,
        data: {
            correctMapping: {
                egypt: "cairo",
                france: "paris",
            },
        },
    },
    {
        id: "q2",
        examId: "1",
        type: "single_choice",
        points: 5,
        data: {
            options: [1, 2, 3],
            correctAnswer: 2,
        },
    },
    {
        id: "q3",
        examId: "1",
        type: "single_choice",
        points: 5,
        data: {
            options: [1, 2, 3],
            correctAnswer: 2,
        },
    },
    {
        id: "q4",
        examId: "1",
        type: "single_choice",
        points: 5,
        data: {
            options: [1, 2, 3],
            correctAnswer: 2,
        },
    },
];
