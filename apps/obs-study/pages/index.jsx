import { useState, useRef, useEffect } from 'react'
import styled from '@emotion/styled'
import { mount as mountLanguageSelect } from 'language-select'
import { mount as mountObsFrame } from 'obs-frame'

const StyledPage = styled.div`
  .page {
  }
`

export function Index() {
  const [url, setUrl] = useState('')

  const ObsFrameComponent = () => {
    const ref = useRef(null)

    useEffect(() => {
      mountObsFrame(ref.current, { url })
    }, [])

    return <div ref={ref} />
  }

  return (
    <StyledPage>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <MountLanguageComponent setUrl={setUrl} />
            <ObsFrameComponent />
          </div>
        </div>
      </div>
    </StyledPage>
  )
}

const MountLanguageComponent = ({setUrl}) => {
  const ref = useRef(null)
  useEffect(() => {
    mountLanguageSelect(ref.current, {
      onLanguageSelect: (langObject) => {
        setUrl(langObject?.zipball_url)
      },
    })
  }, [setUrl])

  return <div ref={ref} />
}

export default Index
