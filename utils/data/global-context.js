import {createContext} from 'react'
export const GlobalContext = createContext('')

export default function GlobalContextProvider(data) {
  return (
    <GlobalContext.Provider value={data}>
      {data.children}
    </GlobalContext.Provider>
  )
}
