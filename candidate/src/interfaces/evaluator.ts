export interface Test {
  isFinished: boolean
  questions: Question[]
  results: Results
}

export interface Question {
  id: number
  statement: string
  correctAnswer: string
  wrongAnswer: string[]
  difficulty: string
  points: number
  testId: number
}

export interface Results {
  id: number
  technicalScore: number
  psychologicalScore: number
}
