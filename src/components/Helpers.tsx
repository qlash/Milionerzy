import './Helpers.scss'

interface IHelpers {
  helpers: boolean[],
  useHelper: (id: number) => void
}

function Helpers(props: IHelpers) {
  return (
    <div className="helpers">
      <div className={`helper ${props.helpers[0] ? 'used' : ''}`} onClick={() => props.useHelper(0)}>50:50</div>
      <div className={`helper ${props.helpers[1] ? 'used' : ''}`} onClick={() => props.useHelper(1)}><img className="icon" src="/people.svg"></img></div>
      <div className={`helper ${props.helpers[2] ? 'used' : ''}`} onClick={() => props.useHelper(2)}><img className="icon" src="/phone.svg"></img></div>
    </div>
  )
}

export default Helpers
