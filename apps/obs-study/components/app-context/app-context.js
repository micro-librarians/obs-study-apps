import { useState, createContext } from 'react'

const useStore = () => {
  const [project, setProject] = useState(null)
  const [language, setLanguage] = useState(null)

  return {
    project,
    language,
    setLanguage,
    setProject,
  }
}

const AppContext = createContext(null)

export const AppContextProvider = ({ children }) => (
  <AppContext.Provider value={useStore()}>{children}</AppContext.Provider>
)
