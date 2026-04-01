import type { PluginRegistry } from "../plugin/plugin.registry";
import type { AttemptResult } from "../types/attempt.types";
import type { AnyQuestion, GradeInput, QuestionTypeAnswerMap } from "../types/question.types";

export class AttemptService {
    constructor(
        private registry: PluginRegistry,
        private questions: AnyQuestion[]
    ) { }
    
    async submit(gradeInput: GradeInput): Promise<AttemptResult> {
        const breakdown = await Promise.all(this.questions.map(async q => {
            const answer = gradeInput[q.id];
            const earned = answer ? this.gradeQuestion(q, answer) : 0;
            return { questionId: q.id, earned, total: q.points };
        }));
        const score = breakdown.reduce((s, r) => s + r.earned, 0);
        return { score, breakdown };
    }

    private gradeQuestion<T extends AnyQuestion["type"]>(
        q: Extract<AnyQuestion, { type: T }>,
        answer: QuestionTypeAnswerMap[T]
    ) {
        const plugin = this.registry.getTyped(q.type);
        return plugin.grade(q, answer);
    }
}