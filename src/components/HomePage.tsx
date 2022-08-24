import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ExploreIcon from '@mui/icons-material/Explore';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

const HomePage = () => {
    return (
        <>
            <nav className="py-4  flex justify-between  items-center relative max-w-[1128px] m-auto ">
                <div className="">
                    <Image
                        width="145"
                        height="45"
                        src="/logo-with-text.svg"
                    ></Image>
                </div>
                <div className="flex justify-evenly ">
                    <Link href="/discover">
                        <div className="mx-4 flex flex-col items-center">
                            <ExploreIcon className="text-gray-500" />
                            <p className="font-light text-gray-500">Discover</p>
                        </div>
                    </Link>
                    <Link href="/people">
                        <div className="mx-4 flex flex-col items-center">
                            <PeopleAltIcon className="text-gray-500" />
                            <p className="font-light text-gray-500">People</p>
                        </div>
                    </Link>
                    <Link href="/learning">
                        <div className="mx-4 flex flex-col items-center">
                            <OndemandVideoIcon className="text-gray-500" />
                            <p className="font-light text-gray-500">Learning</p>
                        </div>
                    </Link>
                    <Link href="/jobs">
                        <div className="mx-4 mr-8 flex flex-col items-center">
                            <BusinessCenterIcon className="text-gray-500" />
                            <p className="font-light text-gray-500">Jobs</p>
                        </div>
                    </Link>

                    <Link href="/">
                        <a className="px-4 py-2 text-[#0a66c2] rounded-3xl border-[1.5px] border-[#0a66c2] hover:text-[#004182] hover:border-[#004182] hover:bg-[#0a66c21c]">
                            Sign in
                        </a>
                    </Link>
                </div>
            </nav>
            <section>
                <div className="flex justify-between min-w-full">
                    <div className="pl-20 mt-[50px]">
                        <div className="text-5xl leading-normal text-orange-600 max-w-[45vw]">
                            <h1>Welcome to your professional community</h1>
                        </div>
                    </div>
                    <div className="relative top-0">
                        <Image
                            width="650"
                            height="650"
                            src="/Landing-Page-Stock-Image.svg"
                        ></Image>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
