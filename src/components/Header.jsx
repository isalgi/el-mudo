import { Navbar, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <div>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand href="#">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            React App
          </span>
        </Navbar.Brand>

        <Navbar.Collapse>
          <Link to="/home">Home</Link>
          <Link to="/menu">Menu</Link>
        </Navbar.Collapse>
        <div className="flex">
          {localStorage.getItem("access_token") ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <Button onClick={() => navigate("/login")}>Login</Button>
          )}
        </div>
      </Navbar>
    </div>
  );
}
