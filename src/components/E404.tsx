import { ArrowRight } from "react-feather";
import { Link } from "react-router-dom";

const E404 = () => {
  return (
    <div className="welcome">
      <p>404</p>
      <span>
        Not Found
        <div>
          <Link to={"/"}>
            go home <ArrowRight width={24} />
          </Link>
        </div>
      </span>
    </div>
  );
};

export default E404;
