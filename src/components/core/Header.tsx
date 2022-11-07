import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="logo">
        <Link to="/">Aecc</Link>
      </div>
      <div className="menu">
        <Link to="create">Create Exam</Link>
        <Link to="search">Search</Link>
        <Link to="correction">Correction</Link>
        <Link to="exams">All Exams</Link>
      </div>
    </>
  );
};

export default Header;
