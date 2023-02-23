import { useRouter } from 'next/router'
import { ObsFrame } from 'obs-frame'

import styled from '@emotion/styled'

const StyledPage = styled.div`
  .page {
  }
`

export function FramePage() {
  const {
    query: { owner, repo, ref },
  } = useRouter()
  return (
    <StyledPage>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            {owner && repo && (
              <ObsFrame
                url={`https://git.door43.org/${owner}/${repo}/archive/master.zip`}
                startReference={ref}
              />
            )}
          </div>
        </div>
      </div>
    </StyledPage>
  )
}

export default FramePage
