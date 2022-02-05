import { FC } from "react";

interface PaginationProps {
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}

const Pagination: FC<PaginationProps> = ({
  handleNextPage,
  handlePreviousPage,
}) => (
  <div className="mt-4 mb-20">
    <div className="flex flex-row justify-between align-center">
      <button
        onClick={handlePreviousPage}
        className="underl{}ine text-blue-600 cursor-pointer"
      >{`< Prev page`}</button>
      <button
        onClick={handleNextPage}
        className="underline text-blue-600 cursor-pointer"
      >{`Next page >`}</button>
    </div>
  </div>
);

export default Pagination;
