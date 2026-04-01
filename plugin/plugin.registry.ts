import type { AnyPlugin } from "../types/plugin.types";
import type { AnyQuestion, QuestionTypeAnswerMap } from "../types/question.types";
import { SingleChoicePlugin, MatchingPlugin } from './question-plugin';

export class PluginRegistry {
    private plugins = new Map<string, AnyPlugin>();
    constructor() {
        this.register(new SingleChoicePlugin());
        this.register(new MatchingPlugin());
    }
    register(plugin: AnyPlugin): void {
        this.plugins.set(plugin.type, plugin);
    }

    getTyped<T extends AnyQuestion["type"]>(
        type: T
    ): AnyPlugin & { grade(q: Extract<AnyQuestion, { type: T }>, a: QuestionTypeAnswerMap[T]): number } {
        const plugin = this.plugins.get(type);
        if (!plugin) throw new Error(`Plugin not found for type: "${type}"`);
        return plugin as ReturnType<typeof this.getTyped<T>>;
    }
}
