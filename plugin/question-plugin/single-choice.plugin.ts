import type { QuestionPlugin, SingleChoiceData } from "../../types/plugin.types";
import type { AnswerOf, Question } from "../../types/question.types";

export class SingleChoicePlugin implements QuestionPlugin<SingleChoiceData, AnswerOf<"single_choice">> {
    type = "single_choice" as const;

    grade(q: Question<SingleChoiceData>, answer: AnswerOf<"single_choice">): number {
        return q.data.correctAnswer === answer ? q.points : 0;
    }
}
