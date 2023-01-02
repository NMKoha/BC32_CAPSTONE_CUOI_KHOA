import React from "react";

const Pagination = ({
  totalPageNumber,
  currentPage,
  paginate,
  handleNextBtn,
  handlePrevBtn,
}) => {
  const pageNumber = []; // biến chứa số thứ tự button
  for (let i = 1; i <= totalPageNumber; i++) {
    pageNumber.push(i);
  }

  return (
    <div>
      <ul className="paginate">
        <div className="paginate-item" onClick={handlePrevBtn}>
          <button className="paginate-button">{"<"}-Prev--</button>
        </div>
        {pageNumber.map((number) => (
          <li
            key={number}
            className={
              number === currentPage ? "paginate-item active" : "paginate-item"
            }
            onClick={() => paginate(number)}
          >
            <a >{number}</a>
          </li>
        ))}
        <div className="paginate-item" onClick={handleNextBtn}>
          <button className="paginate-button"> --Next-{">"} </button>
        </div>
      </ul>
    </div>
  );
};

export default Pagination;
