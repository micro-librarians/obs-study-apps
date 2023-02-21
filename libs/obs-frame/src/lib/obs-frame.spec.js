import { render } from '@testing-library/react';
import ObsFrame from './obs-frame';
describe('ObsFrame', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ObsFrame />);
    expect(baseElement).toBeTruthy();
  });
});
