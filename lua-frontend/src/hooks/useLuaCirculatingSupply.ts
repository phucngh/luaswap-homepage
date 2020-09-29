import { useCallback, useEffect, useState } from 'react'
import Web3 from 'web3'
import { provider } from 'web3-core'
import { useWallet } from 'use-wallet'
import config from '../config'
import useSushi from './useSushi'
import { getLuaCirculatingSupply } from '../sushi/utils'
import BigNumber from 'bignumber.js'
// import debounce from 'debounce'

var CACHE = {
  time: 0,
  old: 60 * 60 * 1000,
  value: new BigNumber(0)
}

const useLuaCirculatingSupply = () => {
  const sushi = useSushi()
  const [newReward, setNewRewad] = useState<BigNumber>(CACHE.value)
  
  useEffect(() => {
    async function fetchData() {
      const v = await getLuaCirculatingSupply(sushi)
      CACHE.time = new Date().getTime()
      CACHE.value = v;
      setNewRewad(v)
    }
    if (sushi 
      && CACHE.time + CACHE.old <= new Date().getTime()) {
      fetchData()
    }
  }, [sushi, setNewRewad])

  return newReward
}

export default useLuaCirculatingSupply
