import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./pagination.module.css";

function range(start: number, end: number) {
  let arr = [];
  while (start <= end) {
    arr.push(start);
    start++;
  }
  return arr;
}

export type PaginationProps = {
  itemsPerPage: number;
  totalItems: number;
  rangeSize?: number;
  classNames?: string;
  GotoPageAriaLabel?: string;
  previousText?: string;
  previousTextAriaLabel?: string;
  nextText?: string;
  nextTextAriaLabel?: string;
  currentPageAriaLabel?: string;
  paginationAriaLabel?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>, pageNum: number) => void;
};
export default function Pagination({
  itemsPerPage = 5,
  totalItems = 0,
  rangeSize = 3,
  classNames = "",
  previousText = "Previous",
  GotoPageAriaLabel = "Go to page",
  nextText = "Next",
  nextTextAriaLabel = "Go to Next page",
  previousTextAriaLabel = "Back to previous page",
  currentPageAriaLabel = "Current Page is",
  paginationAriaLabel = "Pagination",
  onClick,
}: PaginationProps) {
  const location = useLocation();
  const [rangeSlice, setRangeSlice] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const startRef = useRef(0);
  const endRef = useRef(0);

  const setUrl = (num: number) => {
    const searchParams = new URLSearchParams(location.search);
    const page = num + "";
    searchParams.set("page", page);
    const uri = location.pathname + "?" + searchParams.toString();
    return uri;
  };

  useEffect(() => {
    const page = Number(new URLSearchParams(location.search).get("page") || 1);
    if (page <= Math.floor(rangeSize / 2) + 1) {
      startRef.current = 1;
      endRef.current = rangeSize;
    } else {
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      if (totalPages >= page + Math.floor(rangeSize / 2)) {
        startRef.current = page - Math.ceil(rangeSize / 2) + 1;
        endRef.current = page + Math.floor(rangeSize / 2);
      }
    }

    setCurrentPage(page);
    setRangeSlice(range(startRef.current, endRef.current));
  }, [setRangeSlice, rangeSize, itemsPerPage, location, totalItems]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return (
    <div
      className={`${styles.flex} ${styles["items-center"]} ${styles["justify-center"]} ${classNames}`}
    >
      <div className={`previous ${styles["text-dodger"]}`}>
        {currentPage > 1 ? (
          <Link
            to={setUrl(currentPage - 1)}
            aria-label={previousTextAriaLabel}
            className={`${styles["cursor-pointer"]}`}
            onClick={(e) => {
              const page = currentPage - 1;
              onClick && onClick(e, page);
            }}
          >
            {previousText}
          </Link>
        ) : (
          <div className={`${styles.invisible}`}>{previousText}</div>
        )}
      </div>

      <nav
        aria-label={paginationAriaLabel}
        className={`${styles.flex} ${styles["mx-1"]} ${styles["list-none"]}`}
      >
        {rangeSlice.map((num, i) => {
          return (
            <Link
              to={setUrl(num)}
              key={i}
              className={`padding mx-1 ${styles["cursor-pointer"]}`}
              onClick={(e) => {
                onClick && onClick(e, num);
              }}
            >
              {currentPage === num ? (
                <span
                  role={"current"}
                  aria-label={`${currentPageAriaLabel} ${num}`}
                  aria-current={"page"}
                  className={`${styles["text-dodger"]}`}
                >
                  {num}
                </span>
              ) : (
                <span aria-label={`${GotoPageAriaLabel} ${num}`}>{num}</span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className={`next ${styles["text-dodger"]}`}>
        {currentPage <= totalPages ? (
          <Link
            to={setUrl(currentPage + 1)}
            aria-label={nextTextAriaLabel}
            className={`${styles["cursor-pointer"]}`}
            onClick={(e) => {
              const page = currentPage + 1;
              onClick && onClick(e, page);
            }}
          >
            {nextText}
          </Link>
        ) : (
          <div className={`${styles.invisible}`}>{nextText}</div>
        )}
      </div>
    </div>
  );
}
