import './Amount.scss'
import { amounts } from '../api/amounts';

interface IAmount {
  current: number;
}

function Amount(props: IAmount) {
  const amountsList = [...amounts].reverse()
  
  return (
    <ul className="amount">
      {amountsList.map((amount, index) => 
        <li className={`price ${amount.guaranteed ? 'guaranteed' : ''} ${11-props.current == index ? 'active' : ''}`} key={index}>
          <span>{12-index}</span>
          <span>
            {new Intl.NumberFormat('pl', { style: 'currency', currency: 'PLN' }).format(amount.price)}
          </span>
        </li>
      )}
    </ul>
  )
}

export default Amount
