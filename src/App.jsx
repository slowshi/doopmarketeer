import './App.css'
import {useEffect } from 'react'
import {useDispatch} from "react-redux"
import DoopFeed from './routes/DoopFeed/DoopFeed'
import Search from './routes/Search/Search'
import LeaderboardCard from './routes/LeaderboardCard/LeaderboardCard'
import DoopMarket from './routes/DoopMarket/DoopMarket'
import { cacheEthers } from './utils/cacheEthers'
import { Router, globalHistory } from '@reach/router'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    loadCurrencies()
    const listener = globalHistory.listen(({ location }) => {
      const {pathname, search} = location;
      window.gtag('config', 'GA_MEASUREMENT_ID', {'page_path': pathname + search});
    });
    return () => {
      listener();
    }
  }, [])

  const loadCurrencies = async () => {
    const eth = await cacheEthers.getCurrencyConversion('eth')
    const flow = await cacheEthers.getCurrencyConversion('flow')
    dispatch({
      type: 'setEthPrice',
      payload: eth
    })
    dispatch({
      type: 'setFlowPrice',
      payload: flow
    })
  }

  return (
    <Router>
      <DoopFeed path='/'/>
      <DoopMarket path='/doopmarket'/>
      <LeaderboardCard path='/leaderboard'/>
      <Search path='/search'/>
    </Router>
  )
}

export default App