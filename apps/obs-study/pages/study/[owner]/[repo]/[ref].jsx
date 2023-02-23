import { useRouter } from 'next/router'
import { ObsFrame } from 'obs-frame'

import styled from '@emotion/styled'


const StyledPage = styled.div`
  .page {
  }
`

export function Index() {
  const {
    query: { owner, repo, ref },
  } = useRouter()

  return (
    <StyledPage>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <ObsFrame
              url={`https://git.door43.org/${owner}/${repo}/archive/master.zip`}
              ref={ref}
            />
          </div>
        </div>
      </div>
    </StyledPage>
  )
}

export default Index
