import React, { useMemo } from "react"
import Logo from "../../../../../assets/images/stork/stork-logo.svg"
import "./Navbar.scss"
import { Link, useLocation } from "react-router-dom"

function Navbar() {
  const location = useLocation()

  const ctaLinks = useMemo(() => {
    return [
      {
        title: "I am a Seller",
        link: "/join-stork",
      },
      {
        title: "Login/Sign Up",
        link: "/login",
      },
    ]
  }, [])

  return (
    <nav className="bg-white">
      <div className="container-md">
        <div className="row">
          <div className="navigation-custom">
            <Link to="/home">
              <img
                src={Logo}
                alt="Logo"
                width="180"
                className="d-inline-block align-text-top"
              />
            </Link>

            <Link
              className="navigation-custom__button"
              to={
                location.pathname === "/home"
                  ? ctaLinks[0].link
                  : ctaLinks[1].link
              }
            >
              {location.pathname === "/home"
                ? ctaLinks[0].title
                : ctaLinks[1].title}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
