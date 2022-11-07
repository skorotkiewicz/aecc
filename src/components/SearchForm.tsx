import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchForm = ({ type = "s" }: any) => {
  const [search, setSearch] = useState<string>("");
  let navigate = useNavigate();

  return (
    <div>
      <input
        type="text"
        className="search"
        value={search}
        placeholder={`Type ${
          type === "s" ? "Exam or " : ""
        }Test ID and press Enter`}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e: any) => {
          if (e.key === "Enter") {
            navigate(
              `/${type === "s" ? "search" : "correction"}/` + e.target.value
            );
            setSearch("");
          }
        }}
      />
    </div>
  );
};

export default SearchForm;
