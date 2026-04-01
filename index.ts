import { questions } from './data/questions';
import { PluginRegistry } from './plugin/plugin.registry';
import { AttemptService } from './service/attempt.service';

const registry = new PluginRegistry();

const attempt = new AttemptService(registry, questions);

const result = await attempt.submit({
    q1: { egypt: "cairo", france: "paris" },
    q2: 2,
    q3: 2,
    q4: 2,
});

console.log("Total Score:", result);