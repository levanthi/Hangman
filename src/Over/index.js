
import clsx from 'clsx'
import styles from './over.module.scss'

function Over({payload,playAgain})
{
    return<div className={clsx(styles.over)}>
        <h4>{payload.title}</h4>
        {payload.message?<p>{payload.message}</p>:''}
        <button onClick={playAgain}>Play Again</button>
    </div>
}

export default Over
