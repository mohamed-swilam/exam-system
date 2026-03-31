export interface QuestionPlugin {
    type: string;
    validate(question: any): boolean;
    grade(question: any, answer: any): number;
} 

export class PluginRegistry {
    private plugins = new Map<string, QuestionPlugin>();

    register(plugin: QuestionPlugin) {
        this.plugins.set(plugin.type, plugin);
    }

    get(type: string): QuestionPlugin {
        const plugin = this.plugins.get(type);
        if (!plugin) throw new Error('Plugin not found');
        return plugin;
    }
}