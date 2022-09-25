enum PROBLEM_DIFFICULTY {
	EASY,
	MEDIUM,
	HARD
}

export interface Problem {
	name: string
	difficulty: PROBLEM_DIFFICULTY
}
