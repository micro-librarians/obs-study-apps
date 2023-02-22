import { useMemo } from 'react'
import { Button, Select, MenuItem } from '@mui/material'
import styles from './obs-frame.module.css'
import useObs from './hooks'

const _reference = { story: '01', frame: '01' }

export function ObsFrame({ url }) {
  const {
    state: { obs, reference },
    actions: { goNext, goPrev, changeStory },
  } = useObs({
    _url: url ?? 'https://git.door43.org/unfoldingWord/en_obs/archive/v8.zip',
    _reference,
  })

  return (
    <div className={styles['container']}>
      {reference && obs && (
        <div>
          <Title
            obs={obs}
            currentStory={reference.story}
            changeStory={changeStory}
            reference={reference}
          />
          <img
            src={`https://cdn.door43.org/obs/jpg/360px/obs-en-${reference.story}-${reference.frame}.jpg`}
            style={{ maxWidth: '100%' }}
            alt=""
          />
          <p>{obs[reference.story].frames[reference.frame]}</p>
          <div className={styles['navigation-wrap']}>
            <Navigation reference={reference} goNext={goNext} goPrev={goPrev} />
          </div>
        </div>
      )}
    </div>
  )
}

export default ObsFrame

function Title({ obs, currentStory, changeStory }) {
  const storyTitles = useMemo(() => {
    const titles = []

    for (const story in obs) {
      if (Object.hasOwnProperty.call(obs, story)) {
        titles.push(
          <MenuItem key={story} value={story}>
            {obs[story].title}
          </MenuItem>
        )
      }
    }
    // titles.sort((a,b)=>a.localeCompare(b))
    titles.sort((a, b) => a.key.localeCompare(b.key))
    return titles

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obs, currentStory])

  return (
    <Select
      value={currentStory}
      label="Story"
      onChange={(e) => changeStory(e.target.value)}
      fullWidth
    >
      {storyTitles}
    </Select>
  )
}

function Navigation({ reference, goNext, goPrev }) {
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
