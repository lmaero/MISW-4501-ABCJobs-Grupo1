import { Request, Response } from 'express'
import Dao from "../database/dao";
import results from "../routes/results";


export async function getResultsByUser (req: Request, res: Response) {
  try {
    let results = [];
    const candidateId = req.params.candidateId
    if (candidateId) {
      const dao = new Dao()
      const dbResult = await dao.getTestsResults(candidateId)
      if(dbResult.msg === "201") {
        const candidateDbResults = dbResult["tests"];
        const totalQuestions = candidateDbResults?.length;
        let correctAnswers = 0;
        let resultsWithScore = {
          id : '',
          testName: '',
          result: '',
          score: ''
        }
        for(let prueba in candidateDbResults) {
          resultsWithScore.id = (Number(prueba) + 1).toString();
          resultsWithScore.testName = candidateDbResults[Number(prueba)].test_name;

          for (let answer in candidateDbResults[Number(prueba)].questions) {
            const questionCorrectAnswer = candidateDbResults[Number(prueba)].questions[Number(answer)].rightAnswer;
            const candidateAnswer = candidateDbResults[Number(prueba)].answers[Number(answer)][1];
            const correctAnswer = questionCorrectAnswer === candidateAnswer.toLowerCase()
            if (correctAnswer) {
              correctAnswers++;
            }
          }

          let score = correctAnswers / Number(totalQuestions);
          correctAnswers = 0;
          resultsWithScore.score = score.toString();
          if (score <= 50) {
            resultsWithScore.result = "Bad";
          } else if (score <= 70) {
            resultsWithScore.result = "Reproved";
          } else if (score <= 80) {
            resultsWithScore.result = "Satisfactory";
          } else {
            resultsWithScore.result = "Excellent";
          }
          await dao.updateCandidateTestScore(candidateId, prueba, Number(score))
          results.push(resultsWithScore)
          resultsWithScore = {
            id : '',
            testName: '',
            result: '',
            score: ''
          }
        }
      }
      return res.status(200).json({ results })
    } else {
      return res.status(400).json({ message: 'No candidate user provided' })
    }
  }
    catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
    }
}


export default {
  getResultsByUser,
}
