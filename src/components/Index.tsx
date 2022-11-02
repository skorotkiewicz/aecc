import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div>
      <Link to="create">Create Exam</Link>
      <Link to="check">Check Exam</Link>
    </div>
  );
};

export default Index;
