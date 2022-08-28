import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import SearchIcon from '@mui/icons-material/Search';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from 'next-themes';

const Navbar = () => {
    return (
        <>
            <nav className="flex justify-between items-center px-24 py-4 shadow-md">
                <div className="flex justify-between px-4">
                    <div className="w-[50px] h-[50px]">
                        <Image
                            width={50}
                            height={50}
                            src="/linkedin-icon.svg"
                            layout="responsive"
                            className="min-w-full"
                        ></Image>
                    </div>
                    <div className="flex items-center justify-between">
                        <i className="relative left-8">
                            <SearchIcon />
                        </i>
                        <input
                            type="text"
                            placeholder="search"
                            className="border-2 rounded pl-8 pr-2 py-2"
                        />
                    </div>
                </div>
                <div className="text-gray-700 flex justify-evenly">
                    <div className="px-4 flex flex-col  justify-center items-center text-center text-sm">
                        <HomeIcon />
                        <Link href="/dashboard">
                            <a>Home</a>
                        </Link>
                    </div>
                    <div className="px-4 flex flex-col  justify-center items-center text-center text-sm">
                        <PeopleAltIcon />
                        <Link href="/people">
                            <a>Network</a>
                        </Link>
                    </div>
                    <div className="px-4 flex flex-col  justify-center items-center text-center text-sm">
                        <BusinessCenterIcon />
                        <Link href="/jobs">
                            <a>Jobs</a>
                        </Link>
                    </div>
                    <div className="px-4 flex flex-col  justify-center items-center text-center text-sm">
                        <MessageIcon />
                        <Link href="/messages">
                            <a>Messages</a>
                        </Link>
                    </div>
                    <div className="px-4 flex flex-col  justify-center items-center text-center text-sm">
                        <NotificationsIcon />
                        <Link href="/notifications">
                            <a>Notifications</a>
                        </Link>
                    </div>
                    <div className="px-4 flex flex-col  justify-center items-center text-center text-sm">
                        <AccountCircleIcon />
                        <Link href="/account">
                            <a>Profile</a>
                        </Link>
                    </div>
                    <div className="px-4 flex flex-col  justify-center items-center text-center text-sm">
                        <MenuIcon />
                        <Link href="/work">
                            <a>Work</a>
                        </Link>
                    </div>

                    <ThemeChanger />
                </div>
            </nav>
        </>
    );
};
export default Navbar;
const ThemeChanger = () => {
    const { theme, setTheme } = useTheme();
    if (theme === 'dark') {
        return (
            <div>
                <button onClick={() => setTheme('light')}>
                    <LightModeIcon />
                </button>
            </div>
        );
    } else {
        return (
            <div>
                <button onClick={() => setTheme('dark')}>
                    <Brightness4Icon />
                </button>
            </div>
        );
    }
};
