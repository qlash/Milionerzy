import { questions } from './api/questions'
import { useEffect, useState } from 'react'
import Question from './components/Question'
import UserAnswer from './components/UserAnswer'
import Amount from './components/Amount'
import './App.scss'
import Winner from './components/Winner'

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

  const userAnswerHandler = (answer: string) => {
    setUserAnswer(answer)
  }

  const nextQuestion = () => {
    setUserAnswer('')
    setCurrent(current+1)

    if (current == 0) {
      setRoad([])
      setWinner(true)
    }
  }

  return (
    <div className="App">
      <div className="game">
        {winner 
          ? ''
          : <Amount current={current}></Amount>
        }

        {userAnswered && <UserAnswer 
          isCorrect={userAnswered === questions[road[current]].a[0]}
          next={nextQuestion}
          restart={newGame}
        ></UserAnswer>}

        {winner 
          ? <Winner restart={newGame}></Winner> 
          : ''
        }
      </div>

      {road.length 
        ? <Question 
            question={questions[road[current]]} 
            userAnswer={userAnswered}
            answerHandler={userAnswerHandler}
          ></Question>
        : ''
      }
    </div>
  )
}

export default App
