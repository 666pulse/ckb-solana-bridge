import React from 'react'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <main>{children}</main>
      </div>
    </>
  )
}
