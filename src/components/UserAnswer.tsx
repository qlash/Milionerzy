import './UserAnswer.scss'

interface IUserAnswer {
  isCorrect: boolean,
  next: () => void,
  restart: () => void
}

function UserAnswer(props: IUserAnswer) {
  return (
    <div className={`user-answer ${props.isCorrect ? 'correct' : 'wrong'}`}>
      {
        props.isCorrect
          ? (
            <>
              <span>Dobra odpowiedź</span>
              <button onClick={props.next}>Dalej</button>
            </>
          )
          : (
            <>
              <span>ZJEBAŁES!!!!</span>
              <button onClick={props.restart}>Jeszcza raz!</button>
            </>
          )
      }
    </div>
  )
}

export default UserAnswer
