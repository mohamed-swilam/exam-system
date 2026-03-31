import { questions } from './data/questions';
import { PluginRegistry } from './plugin/plugin.registry';
import { SingleChoicePlugin, MatchingPlugin } from './plugin/question-plugin';
import { AttemptService } from './service/attempt.service';

const registry = new PluginRegistry();
registry.register(new SingleChoicePlugin());
registry.register(new MatchingPlugin());


const attempt = new AttemptService(registry, questions);

const result = attempt.submit({
    q1: 2,
    q2: { egypt: "cairo", france: "paris" },
    q3: 2,
    q4: 2,
});

console.log("Total Score:", result.score);