import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { usePagination } from "../_hooks/usePagination";

type DynamicPaginationProps = {
  totalPages: number
};
export const DynamicPagination = ({totalPages}: DynamicPaginationProps)=>{
  const {currentPage, handleNext, handlePageChange, handlePrev, totalPages }= usePagination();
  return(
    <div>
    <Pagination>
  <PaginationContent>
    {currentPage > 1 &&(
    <PaginationItem>
      <PaginationPrevious onClick={handlePrev} />
    </PaginationItem>
    )}

    <PaginationItem>
      <PaginationLink onClick={handlePageChange}>1</PaginationLink>
    </PaginationItem>

    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
{ currentPage < totalPages && (
    <PaginationItem>
      <PaginationNext onClick={handleNext} />
    </PaginationItem>
    )}

  </PaginationContent>
</Pagination>
    </div>
  )
}