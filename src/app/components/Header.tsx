  "use client";
  import React, { ChangeEvent, useState } from "react";
  import { usePathname, useRouter } from "next/navigation";
  import { SearchResult } from "./SearchResult";
  import useSWR from "swr";
  import { fetcher } from "../utils/fetcher";
  import { Loader } from "lucide-react";
  import { TbMovie } from "react-icons/tb";
  import { Moon, Sun } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { SlArrowDown } from "react-icons/sl";
  import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
  import { useTheme } from "next-themes";
  import Link from "next/link";
  import { motion } from "framer-motion"; 
  import SearchGenre from "./SearchGenre";
  import { IoSearch } from "react-icons/io5";

  type Movie = {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    backdrop_path: string;
    overview: string;
  };

  type Props = {
    id: string;
    keyword: string;
    results: Movie[];
    onClose: () => void;
  };
  export const Header = () => {
    const variantType: "default" | "outline" | "secondary" | "destructive" =
      "outline";
    const [searchValue, setSearchValue] = useState("");
    const { data, isLoading } = useSWR(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1`,
      fetcher
    );

    const results = data?.results ?? [];

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    };

  const { theme, setTheme } = useTheme();
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  return (
    // <div className="h-16 w-full px-16 flex justify-between items-center transition-colors">
    //   <div className="flex flex-row w-100 justify-center gap-3">
    //       <motion.div
    //     whileHover={{ scale: 1.05 }}
    //     className="relative w-60 rounded-xl sm:w-20"
    //     transition={{ duration: 0.25 }}>
    //     <Link href={"/"} className="flex gap-3 pl-4">
    //      <TbMovie className="w-5 h-5 text-indigo-700 relative top-1"/>
    //      <p className="text-indigo-700 font-bold text-lg">Movie Z</p>
    //     </Link>
    //     </motion.div>
    //   </div>
    //   <SearchGenre/>
    //   <div className="w-full flex justify-center relative gap-3" >
    //     {/* {Search heseg} */}
    //    <div> <div className="w-full relative">
    //       <IoSearch />
    //       <input type="text" className="w-120 border p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white sm:w-9" placeholder="Хайх" onChange={handleChange} value={searchValue}/>
    //       {isLoading && <Loader className="absolute right-2 top-2" />}
    //       <SearchResult keyword={searchValue} results={results} onClose={() => setSearchValue("")}/>
    //     </div></div>
    //   </div>
    // {/* {Dark Mode} */}
    //   <DropdownMenu>
    //     <DropdownMenuTrigger asChild>
    //       <Button variant="outline" size="icon">
    //         <Sun className="h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
    //         <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    //         <span className="sr-only">Toggle theme</span>
    //       </Button>
    //     </DropdownMenuTrigger>
    //     <DropdownMenuContent align="end">
    //       <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
    //       <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
    //       <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
    //     </DropdownMenuContent>
    //   </DropdownMenu>
    // </div>

    <div className="h-16 w-full px-4 sm:px-8 lg:px-16 flex justify-between items-center transition-colors bg-white dark:bg-gray-900 border-b dark:border-gray-800">
  
  {/* 1. Logo Section */}
  <div className="flex items-center">
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative rounded-xl"
      transition={{ duration: 0.25 }}
    >
      <Link href={"/"} className="flex items-center gap-2">
        <TbMovie className="w-6 h-6 text-indigo-700" />
        <p className="text-indigo-700 font-bold text-lg hidden sm:block">Movie Z</p>
      </Link>
    </motion.div>
  </div>

  {/* 2. Search & Genre Section (Desktop-т голлуулна) */}
  <div className="flex-1 flex items-center justify-center gap-2 sm:gap-4 px-2 sm:px-10">
    <div className="hidden md:block">
      <SearchGenre />
    </div>

    <div className="relative w-full max-w-120">
      {/* Search Icon */}
      <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
      <input
        type="text"
        className="
          w-full pl-10 pr-10 py-2 border rounded-xl outline-none transition-all
          bg-gray-50 dark:bg-gray-800 
          text-gray-900 dark:text-white 
          border-gray-200 dark:border-gray-700
          focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
        "
        placeholder="Хайх..."
        onChange={handleChange}
        value={searchValue}
      />

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <Loader className="w-4 h-4 animate-spin text-indigo-600" />
        </div>
      )}

      <SearchResult keyword={searchValue} results={results} onClose={() => setSearchValue("")} />
    </div>
  </div>

  {/* 3. Dark Mode & Actions */}
  <div className="flex items-center ml-2">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full dark:border-gray-700">
          <Sun className="h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</div>
  );
};
