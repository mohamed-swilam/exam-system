import type { QuestionPlugin, MatchingData } from "../../types/plugin.types";
import type { AnswerOf, Question, QuestionTypeAnswerMap } from "../../types/question.types";

export class MatchingPlugin implements QuestionPlugin<MatchingData, AnswerOf<"matching">> {
    type = "matching" as const;

    grade(q: Question<MatchingData>, answer: AnswerOf<"matching">): number {
        const correct = q.data.correctMapping;
        const total = Object.keys(correct).length;
        if (total === 0) return 0;

        let matchCount = 0;
        for (const key in correct) {
            if (answer[key] === correct[key]) matchCount++;
        }
        return (matchCount / total) * q.points;
    }
}
