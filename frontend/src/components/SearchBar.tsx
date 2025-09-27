import { Search } from "lucide-react"

function SearchBar() {
    return (
        <div className="flex justify-center items-center relative">
            <input type="text" placeholder="Search..." className="outline-none border-none bg-neutral-300 rounded-lg p-2 ps-7"/>
            <Search size={15} className="absolute left-2"/>
        </div>
    )
}

export default SearchBar
