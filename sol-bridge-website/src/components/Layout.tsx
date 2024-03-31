import React from 'react'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-900">
        <main>{children}</main>
      </div>
    </>
  )
}
