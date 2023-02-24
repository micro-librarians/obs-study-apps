import { useEffect, useState } from 'react'
import { fetchObsResources, fetchObs } from './fetchObs'

export function useObsResources({ sort, order } = {}) {
  console.log({ sort, order })
  const [resources, setResources] = useState([])

  useEffect(() => {
    fetchObsResources({ sort, order }).then((fetchedResources) =>
      setResources(fetchedResources)
    )
  }, [sort, order])

  return [resources, setResources]
}

export function useObs({ repo, owner, tag }) {
  const [obs, setObs] = useState(false)
  useEffect(() => {
    if (repo && owner) {
      fetchObs({ repo, owner, tag }).then((fetchedObs) => setObs(fetchedObs))
    }
  }, [owner, repo, tag])
  return [obs, setObs]
}

export function useObsNavigation({ obs, reference: _reference }) {
  const [reference, setReference] = useState()

  useEffect(() => {
    const [story, frame] = _reference.split(':')
    setReference({
      story: parseInt(story).toString().padStart(2, '0'),
      frame: parseInt(frame).toString().padStart(2, '0'),
    })
  }, [_reference])

  const goPrev = () => {
    setReference((prev) => {
      const { frame, story } = prev
      if (parseInt(frame) <= 1) {
        if (parseInt(story) <= 1) {
          return { story: '01', frame: '01' }
        } else {
          const prevStory = (parseInt(story) - 1).toString().padStart(2, '0')
          const lastFrame = Object.keys(obs[prevStory].frames)
            .length.toString()
            .padStart(2, '0')
          return {
            story: prevStory,
            frame: lastFrame,
          }
        }
      } else {
        return {
          ...prev,
          frame: (parseInt(prev.frame) - 1).toString().padStart(2, '0'),
        }
      }
    })
  }

  const goNext = () => {
    const { story, frame } = reference
    if (parseInt(frame) >= Object.keys(obs[story].frames).length) {
      if (parseInt(story) >= Object.keys(obs).length) {
        setReference({
          story: Object.keys(obs)[Object.keys(obs).length - 1],
          frame: Object.keys(obs[story].frames)[
            Object.keys(obs[story].frames).length - 1
          ],
        })
      } else {
        setReference({
          story: (parseInt(story) + 1).toString().padStart(2, '0'),
          frame: '01',
        })
      }
    } else {
      setReference({
        story,
        frame: (parseInt(frame) + 1).toString().padStart(2, '0'),
      })
    }
  }

  const changeStory = (newStory) => {
    setReference({ story: newStory, frame: '01' })
  }

  return {
    state: { reference },
    actions: { goPrev, goNext, changeStory },
  }
}
