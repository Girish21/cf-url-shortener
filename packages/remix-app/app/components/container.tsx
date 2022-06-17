import * as React from 'react'

function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className='app-width mx-auto flex h-full flex-col gap-6 pt-16'>
      {children}
    </main>
  )
}

export default Container
