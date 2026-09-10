import { useState } from "react";
import "./Pagination.css";

export default function Pagination({ total, limit, getFn }) {
  const [currentPage, setCurrentPage] = useState(0);

  const btns = Math.ceil(total / limit);

  let btnArray = [];

  for (let i = 0; i < btns; i++) {
    btnArray.push(
      <button
        key={i}
        className={`pagination-button ${
          currentPage === i ? "active" : ""
        }`}
        onClick={() => {
          setCurrentPage(i);
          getFn(i);
        }}
      >
        {i + 1}
      </button>
    );
  }

  return (
    <div className="pagination-container">
      {btnArray}
    </div>
  );
}