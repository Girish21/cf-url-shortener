import * as React from 'react'

function Container({ children }: { children: React.ReactNode }) {
  return <main className='app-width mx-auto'>{children}</main>
}

export default Container
