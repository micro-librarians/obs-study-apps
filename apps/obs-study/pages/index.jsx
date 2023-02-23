import styled from '@emotion/styled'
import Link from 'next/link'

const StyledPage = styled.div`
  .page {
  }
`

export function Index() {
  return (
    <StyledPage>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            Downloaded resources List
            <br />
            <br />
            <Link href={'/add-resource'}>Add new resource</Link>
            <br />
            <br />
            <Link href={'/study/ru_gl/ru_obs/1:1'}>Go to Obs</Link>
          </div>
        </div>
      </div>
    </StyledPage>
  )
}

export default Index
