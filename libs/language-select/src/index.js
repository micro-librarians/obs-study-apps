import { createRoot } from 'react-dom/client'
import LanguageSelect from './lib/language-select'

// Mount function to start up the app
const mount = (el, { onLanguageSelect }) => {
  createRoot(el).render(<LanguageSelect selectedLanguage={onLanguageSelect} />)
}

export { mount, LanguageSelect }
