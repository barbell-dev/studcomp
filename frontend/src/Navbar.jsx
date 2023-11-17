import { Link } from "react-router-dom"; // Import the Link component
import "./Navbar.css";
import LogoutButton from "./LogoutButton";
export default function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <table>
          <tbody>
            <tr>
              <td className="logo">
                <img src="https://png.pngtree.com/thumb_back/fw800/background/20220312/pngtree-stylish-lady-utilizing-a-tablet-for-discussing-school-assignments-with-her-companion-photo-image_12635676.jpg" />
              </td>
              <td>
                <ul className="nav-links">
                  <li id="profile">
                    <Link
                      to="http://localhost:5173/profile"
                      className="no-decoration"
                    >
                      Profile
                    </Link>
                  </li>
                  <li id="projects">
                    <Link
                      to="http://localhost:5173/projects"
                      className="no-decoration"
                    >
                      Projects
                    </Link>
                  </li>
                  <li id="teams">
                    <Link
                      to="http://localhost:5173/teams"
                      className="no-decoration"
                    >
                      Teams
                    </Link>
                  </li>
                  <li id="domains">
                    <Link
                      to="http://localhost:5173/domains"
                      className="no-decoration"
                    >
                      Domains
                    </Link>
                  </li>
                  <li id="techstack">
                    <Link
                      to="http://localhost:5173/techstack"
                      className="no-decoration"
                    >
                      Tech Stack
                    </Link>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        <LogoutButton />
      </nav>
    </div>
  );
}
