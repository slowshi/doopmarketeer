import { useEffect } from 'react'
import {useSelector, useDispatch} from "react-redux"
import DoodleCard from '../DoodleCard/DoodleCard'

function SingleDoop({tokenId}) {
  const dispatch = useDispatch()
  const loading = useSelector((state)=>state.app.searchLoading)

  useEffect(()=>{
    dispatch({
      type: 'setSearchLoading',
      payload: false
    })
  },[tokenId, loading])

  return(
    !isNaN(tokenId) ?
      <DoodleCard doop={{
        tokenId,
        functionName: '',
        timeStamp: 0,
        from: ''
      }}></DoodleCard>
    : ''
  )
}
export default SingleDoop;