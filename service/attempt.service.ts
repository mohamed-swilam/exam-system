import type { PluginRegistry } from "../plugin/plugin.registry";

export class AttemptService {
    constructor(private registry: PluginRegistry, private questions: any[]) { }

    submit(answers: Record<string, any>) {
        let score = 0;
        for (const q of this.questions) {
            const plugin = this.registry.get(q.type);
            score += plugin.grade(q, answers[q.id]);
        }
        return { score };
    }
}