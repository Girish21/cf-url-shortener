import * as React from 'react'

function Container({ children }: { children: React.ReactNode }) {
  return <main className='w-[min(60ch,100vw-2rem)] mx-auto'>{children}</main>
}

export default Container
