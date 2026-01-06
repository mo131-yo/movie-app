"use client";
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Badge } from "@/app/ui/Badge"
import { Input } from '../ui/Input';
import { usePathname, useRouter } from "next/navigation";
import  {SearchResult}  from './SearchResult';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher'; 
import { Loader } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Movie={
    id: number;
      title: string;
      poster_path: string;
      vote_average: number;
      backdrop_path:string;
      overview: string;
}
type Props ={
    keyword: string;
    results: Movie[];
    onClose: () => void;
}

export const Header =()=> {
  const variantType: "default" | "outline" | "secondary" | "destructive" = "outline";
  const pathname = usePathname(); 
  const {push} = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const {data, isLoading, error} = useSWR(
   `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1`,
   fetcher);

   const results= data?.results ?? [];
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
 const [clicked, setClicked] = useState(false);
  return (
    <div className='h-14.75 w-full pr-16 pl-16 flex justify-between items-center '>
      <div className='flex flex-row w-100 justify-center gap-3' >
          <img src="Vector.png" alt="vector" className='w-4 h-4 flex relative top-1' />
          <p className='text-indigo-700 text-4 font-bold'>Movie Z</p>
      </div>
      <div className='w-full flex justify-center relative'>

         <Badge variant={variantType}  className='w-24.25 h-9' onClick={() => setSearchValue("")}>Genre</Badge>
         
  {/* <div className="relative inline-block">
      <Button onClick={() => setClicked(true)}
      > {clicked && (
        <div className="absolute flex mt-12 w-144.25 h-83.25  bg-red-500 rounded shadow-lg pointer-events-none " />
      )}
        Dar!
      </Button>
    </div> */}


    {/* <div className='flex justify-center'>
      <DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent><DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>                                                                                                                                                                   
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
    </div> */}

         <div className='w-full'>
           <input type="text" className="w-full border p-2 rounded" placeholder='Хайх' onChange={handleChange} value={searchValue} />
           {isLoading && <Loader/>}
           <SearchResult keyword={searchValue} results={results} onClose={() => setSearchValue("")} />
         </div>
      </div>
      <img src="icon.png" alt="icon" className='w-9 h-9 ' />
    </div>
  )
}
