'use client'

import React, { useEffect, useState } from 'react'

import WinderList from '.'
import instance from '@/services/axiosConfig'

const WinnerListPage = () => {
  const [onFetching, setOnFetching] = useState(false)
  const join = [
    {
      listUserWinners: [
        {
          rank: 1,
          name: 'Lâm Hoài Bảo',
          bingo: ['42', '12', '23', '45', '44', '63'],
        },
        {
          rank: 2,
          name: 'Trần Tấn Tính',
          bingo: ['12', '45', '11', '54', '42', '54'],
        },
        {
          rank: 3,
          name: 'Nguyễn Trà Thanh Huy',
          bingo: ['63', '54', '12', '65', '23', '45'],
        },
      ],
      time: {
        round: 1,
        public_at: '123',
      },
    },
    {
      listUserWinners: [
        {
          rank: 1,
          name: 'Lâm Hoài Bảo',
          bingo: ['42', '12', '23', '45', '44', '63'],
        },
        {
          rank: 2,
          name: 'Trần Tấn Tính',
          bingo: ['12', '45', '11', '54', '42', '54'],
        },
        {
          rank: 3,
          name: 'Nguyễn Trà Thanh Huy',
          bingo: ['63', '54', '12', '65', '23', '45'],
        },
      ],
      time: {
        round: 1,
        public_at: '123',
      },
    },
    {
      listUserWinners: [
        {
          rank: 1,
          name: 'Lâm Hoài Bảo',
          bingo: ['42', '12', '23', '45', '44', '63'],
        },
        {
          rank: 2,
          name: 'Trần Tấn Tính',
          bingo: ['12', '45', '11', '54', '42', '54'],
        },
        {
          rank: 3,
          name: 'Nguyễn Trà Thanh Huy',
          bingo: ['63', '54', '12', '65', '23', '45'],
        },
      ],
      time: {
        round: 1,
        public_at: '123',
      },
    },
  ]
  const [dataWinnerList, setDataWinnerList] = useState([{}])

  const _HandleFetching = async () => {
    try {
      // const { data } = await instance.get('/promotion/bingo')
      setDataWinnerList(join)
    } catch (error) {
      console.log(error)
    } finally {
      setOnFetching(false)
    }
  }

  useEffect(() => {
    onFetching && _HandleFetching()
  }, [onFetching])

  useEffect(() => {
    setOnFetching(true)
  }, [])

  return <WinderList data={dataWinnerList} onLoading={onFetching} />
}

export default WinnerListPage
