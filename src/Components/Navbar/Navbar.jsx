import "./Navbar.css";
import { useState } from "react";
import { useTransition, animated } from "react-spring";
import { Link } from "react-router-dom";
import Toggle from "react-toggle";
import "react-toggle/style.css"; // for ES6 modules

function Navbar(props) {
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
    },
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
      {transition(({ opacity, transformMain }, visible) => {
        return navbarOpen && visible ? (
          <animated.nav
            style={{ opacity }}
            className="nav-bar-element-container"
          >
            <animated.ul
              style={{ transform: transformMain }}
              className="nav-bar-ul"
            >
              {menuItems.map((item) => (
                <Link
                  className="nav-bar-element"
                  onClick={() => setNavbarOpen(false)}
                  key={item.name}
                  to={item.link}
                >
                  {item.name}
                </Link>
              ))}
              <div className="dark-mode-container">
                <div className="dark-mode-title">Mode sombre :</div>
                {navbarOpen && <Toggle

                  className="dark-mode-toggle"
                  checked={props.darkMode}
                  onChange={({ target }) => props.setDarkMode(target.checked)}
                  icons={{ checked: "", unchecked: "" }}
                  aria-label="Dark mode toggle"
                />}
              </div>
            </animated.ul>
          </animated.nav>
        ) : null;
      })}
    </div>
  );
}

export default Navbar;
