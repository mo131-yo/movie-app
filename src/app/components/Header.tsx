"use client";

import React, { ChangeEvent, useState } from "react";
import { Badge } from "@/app/ui/Badge";
import { Input } from "../ui/Input";
import { usePathname, useRouter } from "next/navigation";
import { SearchResult } from "./SearchResult";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { Loader } from "lucide-react";
import { TbMovie } from "react-icons/tb";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
};

export const Header = () => {
  const variantType: "default" | "outline" | "secondary" | "destructive" =
    "outline";
  const pathname = usePathname();
  const { push } = useRouter();
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

  return (
    <div className="h-14.75 w-full px-16 flex justify-between items-center bg-white dark:bg-gray-900 transition-colors">
      {/* Logo */}
      <div className="flex flex-row w-100 justify-center gap-3">
        <TbMovie className="w-5 h-5 text-indigo-700" />
        <p className="text-indigo-700 font-bold text-lg">Movie Z</p>
      </div>

     {/* { Haih heseg} */}
      <div className="w-full flex justify-center relative gap-3">
        <Badge
          variant={variantType}
          className="w-24 h-9"
          onClick={() => setSearchValue("")}
        >
          Genre
        </Badge>

        <div className="w-full relative">
          <input
            type="text"
            className="w-full border p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="Хайх"
            onChange={handleChange}
            value={searchValue}
          />
          {isLoading && <Loader className="absolute right-2 top-2" />}
          <SearchResult
            keyword={searchValue}
            results={results}
            onClose={() => setSearchValue("")}
          />
        </div>
      </div>

    {/* {Dark Mode} */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
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
  );
};
