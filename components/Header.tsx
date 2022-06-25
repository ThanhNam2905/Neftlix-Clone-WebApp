import { BellIcon, SearchIcon } from "@heroicons/react/outline"
import Link from "next/link"
import { useState, useEffect } from "react"


function Header() {

    // Event scroll when user scrolled change css header 
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        
        const handleScrolled = () => {
            if(window.scrollY > 0) {
                setIsScrolled(true);
            }
            else {
                setIsScrolled(false);
            }
        }

        window.addEventListener('scroll', handleScrolled);
    
        return () => {
            window.removeEventListener("scroll", handleScrolled);
        }
    }, []);


    return (
        <header className={`header ${isScrolled && 'bg-[#141414] lg:px-9 lg:py-6'}`}>
            <div className="flex items-center space-x-4 md:space-x-10">
                <img  src="https://res.cloudinary.com/nam290596/image/upload/v1652363864/neftlix-clone-app/Netflix_2015_logo_w5gci6.svg" 
                    alt="logo website"
                    width={100} height={100}
                    className="cursor-pointer object-contain"/>
                <ul className="hidden space-x-5 md:flex">
                    <li className="header__link">Home</li>
                    <li className="header__link">TV Shows</li>
                    <li className="header__link">Movies</li>
                    <li className="header__link">New & Popular</li>
                    <li className="header__link">My List</li>
                </ul>
            </div>

            <div className="flex items-center space-x-4 text-[15px]">
                <SearchIcon className="hidden w-6 h-6 sm:inline-block"/>
                <p className="hidden md:inline-block">Kids</p>
                <BellIcon className="w-6 h-6 "/>
                <Link href="/">
                    <img src="https://res.cloudinary.com/nam290596/image/upload/v1652421477/neftlix-clone-app/icon-user-neftlix_pm1k9b.png" alt="icon-user" 
                        className="cursor-pointer object-contain rounded-lg"/>
                </Link>
            </div>
        </header>
    )
}

export default Header