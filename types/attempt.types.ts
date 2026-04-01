export interface AttemptResult {
    score: number;
    breakdown: { questionId: string; earned: number; total: number }[];
}