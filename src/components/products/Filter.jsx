import { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch } from "react-icons/fi";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import { useSearchParams } from "react-router-dom";

const Filter = ({categories}) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [category, setCategory] = useState(searchParams.get("category") || "all");
    const [sortOrder, setSortOrder] = useState(searchParams.get("sortBy") || "asc");
    const [searchTerm, setSearchTerm] = useState(searchParams.get("keyword") || "");

    // Search debounce -> URL update
    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchParams((prev) => {
                const newParams = new URLSearchParams(prev);
                if (searchTerm) {
                    newParams.set("keyword", searchTerm);
                } else {
                    newParams.delete("keyword");
                }
                return newParams;
            });
        }, 700);

        return () => clearTimeout(handler);
    }, [searchTerm, setSearchParams]);

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        setCategory(selectedCategory);

        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            if (selectedCategory === "all") {
                newParams.delete("category");
            } else {
                newParams.set("category", selectedCategory);
            }
            return newParams;
        });
    };

    const toggleSortOrder = () => {
        const newOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newOrder);

        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("sortBy", newOrder);
            return newParams;
        });
    };

    const handleClearFilters = () => {
        setCategory("all");
        setSortOrder("asc");
        setSearchTerm("");
        setSearchParams({});
    };

    return (
        <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
            {/* SEARCH BAR */}
            <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
                <input
                    type="text"
                    placeholder="Search Products"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
                />
                <FiSearch className="absolute left-3 text-slate-800" size={20} />
            </div>

            {/* CATEGORY SELECTION */}
            <div className="flex sm:flex-row flex-col gap-4 items-center">
                <FormControl className="text-slate-800 border-slate-800" variant="outlined" size="small">
                    <InputLabel id="category-select-label"> Category </InputLabel>
                    <Select
                        labelId="category-select-label"
                        value={category}
                        onChange={handleCategoryChange}
                        label="Category"
                        className="min-w-[120px] text-slate-800 border-slate-700"
                    >
                        <MenuItem value="all">All</MenuItem>
                        {categories.map((item) => (
                            <MenuItem key={item.categoryId} value={item.categoryName}>
                                {item.categoryName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* SORT BUTTON & CLEAR FILTER */}
                <Tooltip title="Sorted by price: asc">
                    <Button variant="contained" onClick={toggleSortOrder} color="primary" className="flex items-center gap-2 h-10">
                        Sort By
                        {sortOrder === "asc" ? <FiArrowUp size={20} /> : <FiArrowDown size={20} />}
                    </Button>
                </Tooltip>

                <button
                    className="flex items-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none"
                    onClick={handleClearFilters}
                >
                    <FiRefreshCw className="font-semibold" size={16} />
                    <span className="font-semibold">Clear Filter</span>
                </button>
            </div>
        </div>
    );
};

export default Filter;