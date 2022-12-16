import { useMemo } from "react";
import { questionType } from '../api/questions'
import './Question.scss'

interface IQuestion {
  question: questionType,
  userAnswer: string,
  answerHandler: (answer: string) => void
}

function Question(props: IQuestion) {
  const { q, a } = props.question
  const { answerHandler, userAnswer } = props

  const shuffledAnswers = useMemo(
    () => [...a].sort(() => (Math.random() > 0.5) ? 1 : -1), 
    [a]
  )

  const userAnswerHandler = (answer: string) => {
    if (!userAnswer) {
      answerHandler(answer)
    }
  }

  return (
    <div className="questions">
      <div className="question">{q}</div>
      <div className="answers">
        { shuffledAnswers.map(ans => 
          <div 
            className={`answer 
              ${userAnswer && userAnswer == ans ? 'answered' : '' }
              ${userAnswer && ans == a[0] ? 'correct' : '' }
            `}
            onClick={() => userAnswerHandler(ans)} key={ans}
          >{ans}</div>
        )}
      </div>
    </div>
  )
}

export default Question
