import { describe, it, expect } from "bun:test";
import { MatchingPlugin } from "../plugin/question-plugin/matching.plugin";
import { SingleChoicePlugin } from "../plugin/question-plugin/single-choice.plugin";
import { PluginRegistry } from "../plugin/plugin.registry";
import { AttemptService } from "./attempt.service";
import type { SingleChoiceData, MatchingData } from "../types/plugin.types";
import type { Question } from "../types/question.types";

describe("SingleChoicePlugin", () => {
    const plugin = new SingleChoicePlugin();

    it("should give full points for correct answer", () => {
        const question: Question<SingleChoiceData> = {
            id: "q1", examId: "1", type: "single_choice", points: 5,
            data: { options: [1, 2, 3], correctAnswer: 2 },
        };
        expect(plugin.grade(question, 2)).toBe(5);
    });

    it("should give 0 points for wrong answer", () => {
        const question: Question<SingleChoiceData> = {
            id: "q1", examId: "1", type: "single_choice", points: 5,
            data: { options: [1, 2, 3], correctAnswer: 2 },
        };
        expect(plugin.grade(question, 1)).toBe(0);
    });
});

describe("MatchingPlugin", () => {
    const plugin = new MatchingPlugin();

    it("should grade partially correct answers", () => {
        const question: Question<MatchingData> = {
            id: "q2", examId: "1", type: "matching", points: 10,
            data: { correctMapping: { egypt: "cairo", france: "paris" } },
        };
        expect(plugin.grade(question, { egypt: "cairo", france: "wrong" })).toBe(5);
    });
});

describe("AttemptService", () => {
    const registry = new PluginRegistry();
    registry.register(new SingleChoicePlugin());
    registry.register(new MatchingPlugin());

    it("should calculate correct total score with breakdown", async () => {
        const service = new AttemptService(registry, [
            { id: "q1", examId: "e1", type: "single_choice", points: 5,  data: { options: [1,2,3], correctAnswer: 2 } },
            { id: "q2", examId: "e1", type: "matching",       points: 10, data: { correctMapping: { egypt: "cairo", france: "paris" } } },
        ]);

        const result = await service.submit({
            q1: 2,                                     // correct  → 5pts
            q2: { egypt: "cairo", france: "wrong" },  // partial  → 5pts
        });

        expect(result.score).toBe(10);
        expect(result.breakdown).toHaveLength(2);
        expect(result.breakdown[0]?.earned).toBe(5);
        expect(result.breakdown[1]?.earned).toBe(5);
    });

    it("should score 0 for unanswered questions", async () => {
        const service = new AttemptService(registry, [
            { id: "q1", examId: "e1", type: "single_choice", points: 5, data: { options: [1,2,3], correctAnswer: 2 } },
        ]);

        const result = await service.submit({});
        expect(result.score).toBe(0);
        expect(result.breakdown[0]?.earned).toBe(0);
    });
});
