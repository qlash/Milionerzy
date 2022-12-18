import { questions, questionType } from './api/questions'
import { useEffect, useMemo, useState } from 'react'
import Question from './components/Question'
import UserAnswer from './components/UserAnswer'
import Amount from './components/Amount'
import './App.scss'
import Winner from './components/Winner'
import Helpers from './components/Helpers'

function App() {
  const [current, setCurrent] = useState(0)
  const [road, setRoad] = useState<number[]>([])
  const [userAnswered, setUserAnswer] = useState('')
  const [winner, setWinner] = useState(false)

  const newGame = () => {
    const newRoad = new Set<number>([])

    setUserAnswer('')
    setWinner(false)

    do {
      newRoad.add(Math.floor(Math.random() * questions.length))
    } while (newRoad.size < 12)

    setRoad([...newRoad])
    setCurrent(0)
  }

  useEffect(newGame, [])

  const currentQuestion = useMemo<questionType | null>(() => {
    if (road.length) {
      const question = structuredClone(questions[road[current]])

      question.a = question.a.sort(() => (Math.random() > 0.5) ? 1 : -1)

      return question
    }
    return null
  }, [current, road])

  const correctAnswer = useMemo(() => {
    return road.length ? questions[road[current]].a[0] : ''
  }, [current, road])

  const nextQuestion = () => {
    setUserAnswer('')
    setCurrent(current + 1)

    if (current === 1) {
      setRoad([])
      setWinner(true)
    }
  }

  return (
    <div className="App">
      <div className="game">
        <Helpers></Helpers>
        {!winner && <Amount current={current}></Amount>}

        {userAnswered && <UserAnswer
          isCorrect={userAnswered === correctAnswer}
          next={nextQuestion}
          restart={newGame}
        ></UserAnswer>}

        {winner && <Winner restart={newGame}></Winner>}
      </div>

      {currentQuestion && <Question
        question={currentQuestion}
        userAnswer={userAnswered}
        correctAnswer={correctAnswer}
        answerHandler={setUserAnswer}
      ></Question>}
    </div>
  )
}

export default App
