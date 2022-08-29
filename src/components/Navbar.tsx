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

const Navbar = () => {
    return (
        <>
            <nav className="flex justify-between items-center px-24 py-4 shadow-md bg-gray-800">
                <div className="flex justify-between px-4 ">
                    <div className="w-[50px] h-[50px]">
                        <Image
                            width={50}
                            height={50}
                            src="/linkedin-icon.svg"
                            layout="responsive"
                            className="min-w-full"
                            alt="logo"
                        ></Image>
                    </div>
                    <div className="flex items-center  justify-between">
                        <i className="relative left-8">
                            <SearchIcon className="text-white" />
                        </i>
                        <input
                            type="text"
                            placeholder="search"
                            className="border-2 border-gray-500 rounded pl-8 pr-2 py-2 bg-gray-500"
                        />
                    </div>
                </div>
                <div className="text-gray-200 flex justify-evenly">
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
                </div>
            </nav>
        </>
    );
};
export default Navbar;
