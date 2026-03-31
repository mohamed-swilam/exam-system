import type { QuestionPlugin } from "../plugin.registry";

export class SingleChoicePlugin implements QuestionPlugin {
    type = 'single_choice';

    validate(q: any) {
        return Array.isArray(q.data?.options) || true;
    }

    grade(q: any, answer: number) {
        if (!q.data) return 0;
        return q.data.correctAnswer === answer ? q.points : 0;
    }
}