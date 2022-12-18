import { questionType } from '../api/questions'
import './Question.scss'

interface IQuestion {
  question: questionType,
  correctAnswer: string,
  userAnswer: string,
  answerHandler: (answer: string) => void
}

function Question(props: IQuestion) {
  const { q: question, a: answers } = props.question
  const { answerHandler, userAnswer, correctAnswer } = props

  const userAnswerHandler = (answer: string) => {
    if (!userAnswer) {
      answerHandler(answer)
    }
  }

  return (
    <div className="questions">
      <div className="question">{question}</div>
      <div className="answers">
        { answers.map(answer =>
          <div
            className={`answer 
              ${userAnswer && userAnswer === answer ? 'answered' : ''}
              ${userAnswer && answer === correctAnswer ? 'correct' : ''}
            `}
            onClick={() => userAnswerHandler(answer)} key={answer}
          >{answer}</div>
        )}
      </div>
    </div>
  )
}

export default Question
