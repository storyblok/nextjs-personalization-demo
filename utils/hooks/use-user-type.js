import { useContext } from 'react'
import { GlobalContext } from 'utils/data/global-context'

export default function useUserType () {
  return useContext(GlobalContext).user_type || ''
}
