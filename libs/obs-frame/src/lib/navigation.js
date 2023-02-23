import { Button} from '@mui/material'
import styles from './obs-frame.module.css'


export function Navigation({ reference, goNext, goPrev }) {
    return (
      <div className={styles['navigation']}>
        <Button variant={'contained'} onClick={goPrev}>
          {'<-'}
        </Button>
        <div className={styles['navigation-reference']}>
          OBS {reference?.story}:{reference.frame}
        </div>
        <Button variant={'contained'} onClick={goNext}>
          {'->'}
        </Button>
      </div>
    )
  }

export default Navigation
