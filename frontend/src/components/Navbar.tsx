import '../App.css';
import SearchBar from './SearchBar';
import { Bell } from 'lucide-react';

function Navbar() {
    return (
        <header className="h-[10%] w-full border-b flex justify-center items-center bg-white shadow-md">
            <nav className="flex justify-between items-center gap-10 w-full px-6">
                <div className="flex justify-center items-center gap-10">
                    <span className="font-bold text-2xl">LOGO</span>
                    <ul className="flex">
                        <li className="list-none flex gap-5">
                            <a href="/">Home</a>
                            <a href="/">About</a>
                            <a href="/">Contact Us</a>
                        </li>
                    </ul>
                </div>
                <div className="flex justify-center items-center gap-5">
                    <SearchBar />
                    <div className="flex justify-center items-center bg-neutral-300 p-3 rounded-lg hover:bg-neutral-400 hover:cursor-pointer">
                        <Bell size={15} />
                    </div>
                    <button className="bg-neutral-300 p-2 rounded-lg hover:bg-neutral-400 hover:cursor-pointer">
                        Login
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
