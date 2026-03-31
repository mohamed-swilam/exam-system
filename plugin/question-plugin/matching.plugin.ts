import type { QuestionPlugin } from '../plugin.registry';

export class MatchingPlugin implements QuestionPlugin {
    type = 'matching';

    validate(q: any) {
        return typeof q.data?.correctMapping === 'object';
    }

    grade(q: any, answer: Record<string, string>) {
        if (!q.data || !q.data.correctMapping) return 0;
        const correct = q.data.correctMapping;
        let score = 0;
        const total = Object.keys(correct).length;
        for (const key in correct) {
            if (answer[key] === correct[key]) score += q.points / total;
        }
        return score;
    }
}