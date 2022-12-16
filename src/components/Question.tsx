import { questionType } from '../api/questions'
import './Question.scss'

interface IQuestion {
  question: questionType,
  correctAnswer: string,
  userAnswer: string,
  answerHandler: (answer: string) => void
}

function Question(props: IQuestion) {
  const { q, a } = props.question
  const { answerHandler, userAnswer, correctAnswer } = props

  const userAnswerHandler = (answer: string) => {
    if (!userAnswer) {
      answerHandler(answer)
    }
  }

  return (
    <div className="questions">
      <div className="question">{q}</div>
      <div className="answers">
        { a.map(ans => 
          <div 
            className={`answer 
              ${userAnswer && userAnswer == ans ? 'answered' : '' }
              ${userAnswer && ans == correctAnswer ? 'correct' : '' }
            `}
            onClick={() => userAnswerHandler(ans)} key={ans}
          >{ans}</div>
        )}
      </div>
    </div>
  )
}

export default Question
