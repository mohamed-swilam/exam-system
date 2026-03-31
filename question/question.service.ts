import { PluginRegistry } from '../plugin/plugin.registry';

export interface Question {
    id: string;
    examId: string;
    type: string;
    points: number;
    data: any;
}

export class QuestionService {
    private questions: Question[] = [];
    constructor(private registry: PluginRegistry) { }
    create(question: Question) {
        const plugin = this.registry.get(question.type);
        if (!plugin.validate(question)) {
            throw new Error('Invalid question');
        }
        this.questions.push(question);
        return question;
    }

    findByExam(examId: string) {
        return this.questions.filter(q => q.examId === examId);
    }
}