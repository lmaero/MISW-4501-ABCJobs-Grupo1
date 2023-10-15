export interface Candidate {
  personId: number
  country: string
  languages: string | string[]
  academicalDataId: number
  technicalDataId: number
  workDataId: number
  isAvailable: boolean
  softSkills: string | string[]
  interviewId: number
  email: string
  password: string
  token?: string
}
