import "./Navbar.css";
import { useState } from "react";
import { useTransition, animated } from "react-spring";
import {Link} from "react-router-dom"

function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);


  const menuItems = [
    { name: "Accueil", link: "/" },
    { name: "Galerie", link: "/galerie/" },
    { name: "Contact", link: "/contact/" },
  ];

  const transition = useTransition(navbarOpen, {
    from: {
      opacity: 0,
      transformMain: "translateX(-100%)",
    },
    enter: {
      opacity: 1,
      transformMain: "translateX(0)",
    },
    leave: {
      opacity: 0,
      transformMain: "translateX(-100%)",
    }
  });

  return (
    <div className="navbar-container">
      <div
        className="hamburger-menu-logo"
        onClick={() => setNavbarOpen(!navbarOpen)}
      >
        <div className="bar-hamburger-container">
          <div
            className={
              navbarOpen ? "bar-hamburger bar-hamburger-open1" : "bar-hamburger"
            }
          ></div>
          <div
            className={
              navbarOpen ? "bar-hamburger bar-hamburger-open2" : "bar-hamburger"
            }
          ></div>
          <div
            className={
              navbarOpen ? "bar-hamburger bar-hamburger-open3" : "bar-hamburger"
            }
          ></div>
        </div>

        <div
          className={
            navbarOpen
              ? "background-hamburger-menu background-hamburger-menu-open"
              : "background-hamburger-menu"
          }
        ></div>
      </div>
      {transition(({ opacity, transformMain}, visible) => {
    return visible ? (
      <animated.nav style={{ opacity }} className="nav-bar-element-container">
          <animated.ul style={{ transform: transformMain }} className="nav-bar-ul">
            {menuItems.map((item) => (
              <Link className="nav-bar-element" onClick={() => setNavbarOpen(false)} key={item.name} to={item.link}>
                {item.name}
              </Link>
            ))}
          </animated.ul>
          
      </animated.nav>
    ) : null;
  })}
      {/* {navbarOpen && (
        <div className="nav-bar-element-container">
          
            {liTransitions.map(({ opacity, transform }, visible) => (
              visible && 
              <ul style={opacity}>
                <animated.li style={transform}>
                    <a href="#">Test</a>
                </animated.li>
            </ul>
                
            ))}
          
        </div>
      )} */}
    </div>
  );
}

export default Navbar;
