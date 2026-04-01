import type { QuestionPlugin, SingleChoiceData } from "../../types/plugin.types";
import type { Question, QuestionTypeAnswerMap } from "../../types/question.types";

export class SingleChoicePlugin implements QuestionPlugin<SingleChoiceData, number> {
    type = "single_choice" as const;

    grade(q: Question<SingleChoiceData>, answer: QuestionTypeAnswerMap["single_choice"]): number {
        return q.data.correctAnswer === answer ? q.points : 0;
    }
}
