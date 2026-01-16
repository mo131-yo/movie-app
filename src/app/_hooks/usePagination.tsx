"use client"
import { usePathname, useSearchParams, useRouter } from "next/navigation"

export const usePagination = () => {
    const { push } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    const totalPage = 10;
    const maxButton = 3;
    let currentPage = Number(searchParams.get("page") ?? 1);
    const handlePrev = ()=>{
        if (currentPage > 1){
            handlePageChange(currentPage - 1)()
        }
    }
       const handleNext = ()=>{
        if (currentPage < totalPage){
            handlePageChange(currentPage + 1)()
        }
    }
    const handlePageChange = (pageNumber: number) => ()=>{
        const params = new URLSearchParams()
        params.set("page", pageNumber.toString());
        push(`${pathname}?${params.toString()}`);
    };
    const getDisplayPages =()=>{
        let start = Math.max( currentPage - Math.floor(maxButton / 2), 1)
        let end = start + maxButton - 1 
        if ( end > totalPage){
            end = totalPage;
            start = Math.max(1, currentPage - maxButton + 1 )
        }
        return Array.from({length: end-start + 1}, (_, index)=> start + index );
    };
    const displayPages = getDisplayPages();
return{handlePrev, handleNext, handlePageChange, currentPage, totalPage, displayPages}
}

