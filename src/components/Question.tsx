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

  const letter = (index: number) => {
    return `${String.fromCharCode(65 + index)}:`
  }

  return (
    <div className="questions">
      <div className="question">{question}</div>
      <div className="answers">
        { answers.map((answer, index) =>
          <div
            className={`answer 
              ${userAnswer && userAnswer === answer ? 'answered' : ''}
              ${userAnswer && answer === correctAnswer ? 'correct' : ''}
              ${answer ? '' : 'empty'}
            `}
            onClick={() => userAnswerHandler(answer)} key={index}
          >
            <span className="letter">{answer && letter(index)}</span>
            &nbsp;{answer}
          </div>
        )}
      </div>
    </div>
  )
}

export default Question
