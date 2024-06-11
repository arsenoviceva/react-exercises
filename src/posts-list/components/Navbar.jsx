import { useNavigate } from "react-router";

const routes = [
  {
    id: 1,
    path: "/posts-list",
    name: "Posts",
  },
  {
    id: 2,
    path: "/gallery",
    name: "Gallery",
  },
];

export const Navbar = ({ activeRoute }) => {
  const navigate = useNavigate();
  const onNavigationClick = (newRoute) => {
    navigate(newRoute);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand" href="/posts-list">
            <img
              src="https://react-bootstrap.netlify.app/img/logo.svg"
              className="header-logo-posts"
            />
          </a>
          <div className="navbar-nav me-auto mb-2 mb-lg-0">
            {routes?.map((route) => {
              return (
                <a
                  key={route?.id}
                  role="button"
                  className={
                    activeRoute === route?.path ? "active nav-link" : "nav-link"
                  }
                  tabIndex="0"
                  onClick={() => onNavigationClick(route?.path)}
                >
                  {route?.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
