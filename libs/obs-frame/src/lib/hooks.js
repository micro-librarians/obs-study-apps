import { useEffect, useState } from 'react'
import jszip from 'jszip'
import JSZipUtils from 'jszip-utils'

const storyParser = (md) => {
  let _markdown = md.replaceAll('\u200B', '').split(/\n\s*\n\s*/)
  const title = _markdown.shift().trim().slice(1)
  let link = _markdown.pop().trim().slice(1, -1)
  if (link === '') {
    link = _markdown.pop().trim().slice(1, -1)
  }
  const frames = {}

  for (let n = 0; n < _markdown.length / 2; n++) {
    // let urlImage
    let text
    if (/\(([^)]*)\)/g.test(_markdown[n * 2])) {
      // urlImage = /\(([^)]*)\)/g.exec(_markdown[n * 2])[1]
      text = _markdown[n * 2 + 1]
    } else {
      text = _markdown[n * 2] + '\n' + _markdown[n * 2 + 1]
    }
    frames[(n + 1).toString().padStart(2, 0)] = text
  }
  return { frames, title, link }
}

export function useObs({ owner, repo, _reference }) {
  const [obs, setObs] = useState(false)
  const [reference, setReference] = useState()
  const _url = `https://git.door43.org/${owner}/${repo}/archive/master.zip`

  useEffect(() => {
    const main = async () => {
      const allStories = {}
      JSZipUtils?.getBinaryContent(_url, function (err, data) {
        if (err) {
          throw err
        }
        var zip = new jszip()
        zip.loadAsync(data).then(async function () {
          for (const key in zip.files) {
            if (Object.hasOwnProperty.call(zip.files, key)) {
              if (key.match(/\/content\/\d/gm)) {
                const md = await zip.files[key].async('string')
                const name = key.slice(-5, -3)
                const { title, frames } = storyParser(md)
                allStories[name] = { title, frames }
              }
            }
          }
          setObs(allStories)
        })
      })
    }
    if (_url.length > 0 && repo && owner) {
      main()
    }
  }, [_url, owner, repo])

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
    state: { obs, reference },
    actions: { goPrev, goNext, changeStory },
  }
}

export default useObs
