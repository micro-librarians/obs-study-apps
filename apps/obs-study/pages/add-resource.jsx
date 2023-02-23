import { LanguageSelect } from 'language-select'
import styled from '@emotion/styled'

const StyledPage = styled.div`
  .page {
  }
`

export function AddResourcePage() {
  return (
    <StyledPage>
      <div className="wrapper">
        <div className="container">
          <div>
            <LanguageSelect />
          </div>
        </div>
      </div>
    </StyledPage>
  )
}

export default AddResourcePage
