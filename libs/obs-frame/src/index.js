import { createRoot } from 'react-dom/client'
import { ObsFrame } from './lib/obs-frame'

// Mount function to start up the app
const mount = (el, { url }) => {
  createRoot(el).render(<ObsFrame url={url} />)
}

export { mount }
export * from './lib/obs-frame'
export * from './lib/hooks'
