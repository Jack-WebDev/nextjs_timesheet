import React from 'react'
import Profile from './(_components)/Profile'

export default function page(params: { id: string }) {
  return (
    <div>
        <Profile id={params.id} />
    </div>
  )
}
