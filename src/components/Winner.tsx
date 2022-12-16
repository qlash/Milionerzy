import './Winner.scss'

interface IWinner {
  restart: () => void
}

function Winner(props: IWinner) {
  return (
    <div className="winner">
      <p>Wygrałeś drineczka</p>
      <img src="/drink.jpg"></img>
      <button onClick={props.restart}>Gramy o następnego!</button>
    </div>
  )
}

export default Winner
