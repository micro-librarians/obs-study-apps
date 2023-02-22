import { useState, useRef, useEffect } from 'react'
import styled from '@emotion/styled'
import { mount as mountLanguageSelect } from 'language-select'
import { mount as mountObsFrame } from 'obs-frame'

const StyledPage = styled.div`
  .page {
  }
`

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.@emotion/styled file.
   */
  const [url, setUrl] = useState('')
  const parseSelectedLanguage = (langObject) => {
    setUrl(langObject?.zipball_url)
  }

  const LanguageSelectComponent = () => {
    const ref = useRef(null)

    useEffect(() => {
      mountLanguageSelect(ref.current, {
        onLanguageSelect: parseSelectedLanguage,
      })
    })

    return <div ref={ref} />
  }

  const ObsFrameComponent = () => {
    const ref = useRef(null)

    useEffect(() => {
      mountObsFrame(ref.current, { url })
    })

    return <div ref={ref} />
  }

  return (
    <StyledPage>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <LanguageSelectComponent />
            <ObsFrameComponent />
          </div>
        </div>
      </div>
    </StyledPage>
  )
}

export default Index
