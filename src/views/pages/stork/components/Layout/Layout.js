import React from "react"
import Navbar from "../Navbar/Navbar"

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="wrapper">{children}</div>
    </>
  )
}

export default Layout
