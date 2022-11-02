import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <h3>AECC</h3>
      <div className="menu">
        <Link to="create">Create Exam</Link>
        {/* <Link to="check">Check Exam</Link> */}
        <Link to="exams">All Exams</Link>
      </div>
    </>
  );
};

export default Header;
