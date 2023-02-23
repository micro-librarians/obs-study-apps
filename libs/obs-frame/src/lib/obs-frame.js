import { useMemo } from 'react'
import { Select, MenuItem } from '@mui/material'
import styles from './obs-frame.module.css'

export function ObsFrame({ obs, reference, changeStory }) {

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


