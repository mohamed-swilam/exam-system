import { describe, it, expect } from "bun:test";
import { MatchingPlugin, SingleChoicePlugin } from "../plugin/question-plugin";

describe("SingleChoicePlugin", () => {
    const plugin = new SingleChoicePlugin();

    it("should give full points for correct answer", () => {
        const question = {
            id: "q1",
            points: 5,
            data: { correctAnswer: 2 }
        };
        const answer = 2;
        const score = plugin.grade(question, answer);
        expect(score).toBe(5);
    });

    it("should give 0 points for wrong answer", () => {
        const question = {
            id: "q1",
            points: 5,
            data: { correctAnswer: 2 }
        };
        const answer = 1;

        const score = plugin.grade(question, answer);
        expect(score).toBe(0);
    });
});


describe("MatchingPlugin", () => {
    const plugin = new MatchingPlugin();
    it("should grade partially correct answers", () => {
        const question = {
            points: 10,
            data: { correctMapping: { egypt: "cairo", france: "paris" } }
        };
        const answer = { egypt: "cairo", france: "wrong" };
        const score = plugin.grade(question, answer);
        expect(score).toBe(5);
    });
});