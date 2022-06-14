import * as React from 'react'

function Container({ children }: { children: React.ReactNode }) {
  return <main className='mx-auto w-[min(60ch,100vw_-_2rem)]'>{children}</main>
}

export default Container
