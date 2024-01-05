'use client'

import React, { useEffect, useState } from 'react'

import WinderList from '../../winners-list'
import { useLocale } from 'next-intl'
import { useGetAllQueryParams } from '@/hooks/useGetAllQueryParams'
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
  const [dataInviteWinnerList, setDataInviteWinnerList] = useState([{}])

  const locale = useLocale()
  const allQueryParams: any = useGetAllQueryParams()

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

export default WinnerListInvitePage
