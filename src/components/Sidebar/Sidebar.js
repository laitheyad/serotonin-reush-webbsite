import { useLocation, NavLink } from "react-router-dom";
import logo from "../../assets/img/log.png";

import { Nav } from "react-bootstrap";
let logval = localStorage.getItem("isLoggedIn");
var isLoggedIn = false;
if (logval === "true") isLoggedIn = true;
function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <img
          src={logo}
          alt="Logo"
          style={{
            margin: 15,
            height: 55,
            width: 230,
            backgroundColor: "rgba(255,255,255,0.6)",
            borderRadius: 15,
            padding: 6,
          }}
        />
        <div className="logo d-flex align-items-center justify-content-start">
          <div className="simple-text">Serotonin Rush</div>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect)
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
