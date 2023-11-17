import Signup from "./Signup";
import Login from "./Login";
import "./Home.css";
function Home() {
  return (
    <div>
      <h1 className="Heading">
        UniCollab
        {/* UniCollab "UniCollab: Fostering Student Collaboration for University Projects" */}
      </h1>
      <Login />
    </div>
  );
}
export default Home;
