import { auth } from '@/auth'
import React from 'react'

const ChallengePage = async () => {
    const session = await auth()
    console.log({session})
  return (
    <div>ChallengePage</div>
  )
}

export default ChallengePage