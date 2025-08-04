import React from 'react'

const Layout =({children}) => {
  return (
    <div  className="min-h-screen bg-red-300" id="app">
      {children}
    </div>
  )
}

export default Layout