import { toggleSidebar } from '@/lib/navbar-helper'
import React from 'react'

const MobileNavbar = () => {
  return (
    <div className="mobile">
    <div className="container">
      {/* Mobile */}
      <div className="menu-mobile" onClick={toggleSidebar}>
        <span className="item item-1" />
        <span className="item item-2" />
        <span className="item item-3" />
      </div>
      {/* End Mobile */}
      {/* Logo */}
      <div className="logo">
        <a href="index.html">
        </a>
      </div>
      {/* End Logo */}
    </div>
  </div>
  )
}

export default MobileNavbar