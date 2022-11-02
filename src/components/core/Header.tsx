import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      Header
      <Link to="create">Create Exam</Link>
      <Link to="check">Check Exam</Link>
    </div>
  );
};

export default Header;
