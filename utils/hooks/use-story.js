import { useContext } from 'react'
import { GlobalContext } from 'utils/data/global-context'

export default function useStory () {
  return useContext(GlobalContext).story || ''
}
