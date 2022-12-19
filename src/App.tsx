import { questions, questionType } from './api/questions'
import { useEffect, useMemo, useState } from 'react'
import Question from './components/Question'
import UserAnswer from './components/UserAnswer'
import Amount from './components/Amount'
import './App.scss'
import Winner from './components/Winner'
import Helpers from './components/Helpers'
import CurrentHelper from './components/CurrentHelper'
import { CurrentHelperType } from './components/CurrentHelperType'

console.info('Baza pytań', questions.length)

function App() {
  const [current, setCurrent] = useState(0)
  const [road, setRoad] = useState<number[]>([])
  const [userAnswered, setUserAnswer] = useState('')
  const [winner, setWinner] = useState(false)

  const [helpers, setHelpers] = useState([false, false, false])

  const [currentHelper, setCurrentHelper] = useState<CurrentHelperType>({ helper: '' })

  const newGame = () => {
    const newRoad = new Set<number>([])

    setUserAnswer('')
    setWinner(false)
    setHelpers([false, false, false])
    setCurrentHelper({ helper: '' })

    do {
      newRoad.add(Math.floor(Math.random() * questions.length))
    } while (newRoad.size < 12)

    setRoad([...newRoad])
    setCurrent(0)
  }

  useEffect(newGame, [])

  const currentQuestion = useMemo<questionType | undefined>(() => {
    if (road.length) {
      const question = structuredClone(questions[road[current]])

      question.a = question.a.sort(() => (Math.random() > 0.5) ? 1 : -1)

      return question
    }
    return undefined
  }, [current, road])

  const correctAnswer = useMemo(() => {
    return road.length ? questions[road[current]].a[0] : ''
  }, [current, road])

  const nextQuestion = () => {
    setUserAnswer('')
    setCurrent(current + 1)

    if (current === 11) {
      setRoad([])
      setWinner(true)
    }
  }

  const userAnswerHandler = (answer: string) => {
    setCurrentHelper({ helper: '' })
    setUserAnswer(answer)
  }

  const helperFiftyFifty = () => {
    const answers = questions[road[current]].a
    const correctAnswers = [answers[0], answers[Math.floor(Math.random() * 3 + 1)]]

    if (currentQuestion) {
      currentQuestion?.a.forEach((a, i) => {
        if (!correctAnswers.includes(a)) {
          currentQuestion.a[i] = ''
        }
      })
    }

    setCurrentHelper({
      helper: 'fifty',
      text: 'Usuwamy dwie błędne odpowiedzi....'
    })
  }

  const helperCrowd = () => {
    setCurrentHelper({
      helper: 'crowd',
      current: current,
      question: questions[road[current]],
      currentQuestion: currentQuestion
    })
  }

  const helperPhone = () => {
    setCurrentHelper({
      helper: 'phone',
      current: current,
      question: questions[road[current]],
      currentQuestion: currentQuestion
    })
  }

  const useHelperHandler = (id: number) => {
    const updatedHelpers = helpers.map((v, i) => i === id ? true : v)

    switch (id) {
    case 0: helperFiftyFifty(); break
    case 1: helperCrowd(); break
    case 2: helperPhone(); break
    }

    setHelpers(updatedHelpers)
  }

  return (
    <div className="App">
      <div className="game">
        {!winner && <Helpers
          helpers={helpers}
          useHelper={useHelperHandler}></Helpers>}

        {!winner && <Amount current={current}></Amount>}

        {userAnswered && <UserAnswer
          isCorrect={userAnswered === correctAnswer}
          next={nextQuestion}
          restart={newGame}
        ></UserAnswer>}

        {currentHelper.helper && <CurrentHelper
          helper={currentHelper.helper}
          current={currentHelper.current}
          question={currentHelper.question}
          currentQuestion={currentHelper.currentQuestion}
        ></CurrentHelper>}

        {winner && <Winner restart={newGame}></Winner>}
      </div>

      {currentQuestion && <Question
        question={currentQuestion}
        userAnswer={userAnswered}
        correctAnswer={correctAnswer}
        answerHandler={userAnswerHandler}
      ></Question>}
    </div>
  )
}

export default App
