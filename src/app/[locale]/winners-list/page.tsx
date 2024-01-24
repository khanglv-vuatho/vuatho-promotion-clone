'use client'

import { useEffect, useState } from 'react'

import WinderList from '.'
import instance from '@/services/axiosConfig'

const WinnerListPage = () => {
  const [onFetching, setOnFetching] = useState(false)
  const [dataWinnerList, setDataWinnerList] = useState([{}])

  const join = [
    {
      listUserWinners: [
        {
          rank: 1,
          name: 'Lâm Hoài Bảo',
          bingo: '0123',
        },
        {
          rank: 2,
          name: 'Trần',
          bingo: '3213',
        },
        {
          rank: 3,
          name: 'Nguyễn Trà ',
          bingo: '4231',
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
          name: ' Hoài Bảo',
          bingo: '1235',
        },
        {
          rank: 2,
          name: 'Tính',
          bingo: '6453',
        },
        {
          rank: 3,
          name: 'Nguyễn Tranh Huy',
          bingo: '6531',
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
          name: 'Lâm  Bảo',
          bingo: '5231',
        },
        {
          rank: 2,
          name: 'Trần Tấn',
          bingo: '8776',
        },
        {
          rank: 3,
          name: 'Nguyễn Trà Tuy',
          bingo: '4521',
        },
      ],
      time: {
        round: 1,
        public_at: '123',
      },
    },
  ]

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

  return <WinderList data={dataWinnerList} onFetching={onFetching} />
}

export default WinnerListPage
