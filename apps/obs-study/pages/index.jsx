import { useState, useRef, useEffect } from 'react'
import styled from '@emotion/styled'
import { LanguageSelect, mount } from 'language-select'
import { ObsFrame } from 'obs-frame'

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
    setUrl(langObject.zipball_url)
  }

  const LanguageSelectComponent = () => {
    const ref = useRef(null)

    useEffect(() => {
      mount(ref.current, { onLanguageSelect: parseSelectedLanguage })
    })

    return <div ref={ref} />
  }

  return (
    <StyledPage>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <LanguageSelectComponent />
            <ObsFrame url={url} />
          </div>
        </div>
      </div>
    </StyledPage>
  )
}

export default Index
