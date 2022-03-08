import { useContext } from 'react'
import { GlobalContext } from 'utils/data/global-context'

export default function useProducts () {
  return useContext(GlobalContext).products || ''
}
