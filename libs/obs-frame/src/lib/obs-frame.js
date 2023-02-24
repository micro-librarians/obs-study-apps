import { useEffect, useMemo, useState } from 'react'
import { Select, MenuItem, Typography } from '@mui/material'
import styles from './obs-frame.module.css'

export function ObsFrame({ obs, reference, changeStory }) {
  const [image, setImage] = useState('')

  useEffect(() => {
    if (reference) {
      const imageUrl = `https://cdn.door43.org/obs/jpg/360px/obs-en-${reference.story}-${reference.frame}.jpg`
      const imagePromise = obs[reference.story]?.images.get(imageUrl)
      imagePromise?.then((img) => setImage(img))
    }
  }, [reference, image, obs])

  return (
    <div className={styles['container']}>
      {reference && obs && (
        <div>
          <ObsTitle
            obs={obs}
            currentStory={reference.story}
            changeStory={changeStory}
            reference={reference}
          />
          <img src={image} style={{ maxWidth: '100%' }} alt="" />
          <p>{obs[reference.story].frames[reference.frame]}</p>
        </div>
      )}
    </div>
  )
}

export default ObsFrame

function ObsTitle({ obs, currentStory, changeStory, sx }) {
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
      sx={{ marginBottom: '1em', ...sx }}
      SelectDisplayProps={{ style: { whiteSpace: 'normal' } }}
      variant={'standard'}
      value={currentStory}
      label="Story"
      onChange={(e) => changeStory(e.target.value)}
      fullWidth
      renderValue={(selected) => (
        <Typography variant="h2" sx={{ fontSize: '1.5em', fontWeight: '500' }}>
          {obs[selected].title}
        </Typography>
      )}
    >
      {storyTitles}
    </Select>
  )
}
