import { useRouter } from 'next/router'
import { ObsFrame, useObs, Navigation } from 'obs-frame'
import styled from '@emotion/styled'
const StyledPage = styled.div`
  .page {
  }
`
export function FramePage() {
  const {
    query: { owner, repo, ref },    
  } = useRouter()
  const {
    state: { obs, reference },
    actions: { goNext, goPrev, changeStory },
  } = useObs({
    owner,
    repo,
    _reference: ref ?? '01:01',
  })


  return (
    <StyledPage>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            {owner && repo && (
              <ObsFrame
                obs={obs}
                reference={reference}
                changeStory={changeStory}
              />
            )}
            {reference && (
              <Navigation
                reference={reference}
                goNext={goNext}
                goPrev={goPrev}
              />
            )}
          </div>
        </div>
      </div>
    </StyledPage>
  )
}

export default FramePage
