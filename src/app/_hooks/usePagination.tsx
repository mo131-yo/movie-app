"use client"

import { usePathname, useSearchParams, useRouter } from "next/navigation"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export const usePagination= ()=>{
    const {push}= useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const totalPages = 10; 
    const maxVisibleButtons = 3
    const currentPage=  Number(searchParams.get("page") ?? 1)

    const handlePrev= ()=>{}
    const handleNext = ()=>{};
    const handlePageChange= (pageNumbe: Number)=>()=>{}
    return{ handlePrev,handleNext, handlePageChange,currentPage, totalPages}
}