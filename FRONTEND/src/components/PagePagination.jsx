import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";


const PagePagination = ({
  numOfPages,
  handleSetPage,
  page,
  decreasePageValue,
  increasePageValue,
}) => {
  const numbers = Array.from({ length: numOfPages }, (_, i) => i + 1);
  const firstNumber = numbers[0];
  const lastNumber = numbers[numbers.length - 1];

  return (
    <Pagination className="my-6">
      <PaginationContent>
        {page !== firstNumber && (
          <PaginationItem>
            <button onClick={decreasePageValue}>
              <PaginationPrevious />
            </button>
          </PaginationItem>
        )}

        {numbers.map((num) => (
          <PaginationItem key={num}>
            <button onClick={() => handleSetPage(num)}>
              <PaginationLink isActive={page === num}>{num}</PaginationLink>
            </button>
          </PaginationItem>
        ))}

        {page !== lastNumber && (
          <PaginationItem>
            <button onClick={increasePageValue}>
              <PaginationNext />
            </button>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PagePagination;


