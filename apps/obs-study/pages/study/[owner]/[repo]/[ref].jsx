import { useRouter } from 'next/router'
import { ObsFrame, useObs, Navigation, useObsNavigation } from 'obs-frame'
import styled from '@emotion/styled'
import { Paper } from '@mui/material'

const StyledPage = styled.div`
  .page {
  }
`
export function FramePage() {
  const {
    query: { owner, repo, ref },
  } = useRouter()
  const [obs] = useObs({ owner, repo })
  const { state, actions } = useObsNavigation({
    obs,
    reference: ref ?? '01:01',
  })
  const { reference } = state
  const { goNext, goPrev, changeStory } = actions

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
              <Paper
                sx={{
                  position: 'fixed',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  display: 'flex',
                  justifyContent: 'center',
                }}
                elevation={3}
              >
                <Navigation
                  reference={reference}
                  goNext={goNext}
                  goPrev={goPrev}
                />
              </Paper>
            )}
          </div>
        </div>
      </div>
    </StyledPage>
  )
}

export default FramePage
