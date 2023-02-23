import { render } from '@testing-library/react'
import AppContext from './app-context'
describe('AppContext', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppContext />)
    expect(baseElement).toBeTruthy()
  })
})
