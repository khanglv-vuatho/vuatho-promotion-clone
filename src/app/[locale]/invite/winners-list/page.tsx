'use client'

import { memo, useEffect, useState } from 'react'

import WinderList from '../../winners-list'
import instance from '@/services/axiosConfig'

const WinnerListInvitePage = () => {
  const [onFetching, setOnFetching] = useState(false)

  const invite = [
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
        public_at: '135',
      },
    },
    {
      listUserWinners: [
        {
          rank: 1,
          name: 'Lâm  Bảo',
          bingo: ['42', '12', '23', '45', '44', '63'],
        },
        {
          rank: 2,
          name: 'Trần Tấn ',
          bingo: ['12', '45', '11', '54', '42', '54'],
        },
        {
          rank: 3,
          name: 'Nguyễn Huy',
          bingo: ['63', '54', '12', '65', '23', '45'],
        },
      ],
      time: {
        round: 2,
        public_at: '150',
      },
    },
    {
      listUserWinners: [
        {
          rank: 1,
          name: 'Lâm',
          bingo: ['42', '12', '23', '45', '44', '63'],
        },
        {
          rank: 2,
          name: 'Tính',
          bingo: ['12', '45', '11', '54', '42', '54'],
        },
        {
          rank: 3,
          name: 'Nguyễn',
          bingo: ['63', '54', '12', '65', '23', '45'],
        },
      ],
      time: {
        round: 3,
        public_at: '1235',
      },
    },
  ]

  const [dataInviteWinnerList, setDataInviteWinnerList] = useState([{}])

  const _HandleFetching = async () => {
    try {
      // const { data } = await instance.get('/promotion/bingo')
      setDataInviteWinnerList(invite)
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

  return <WinderList data={dataInviteWinnerList} onFetching={onFetching} />
}

export default memo(WinnerListInvitePage)
