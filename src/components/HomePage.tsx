import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ExploreIcon from '@mui/icons-material/Explore';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const HomePage = () => {
    return (
        <>
            <nav className="py-2 px-8 sm:py-4 sm:px-16 flex justify-between  items-center relative max-w-[1128px] m-auto">
                <div className="block min-w-[145px] min-h-[45px]">
                    <Link href="/">
                        <Image
                            src="/logo-with-text.svg"
                            alt="navbar-logo"
                            width={145}
                            height={45}
                            layout="responsive"
                            className="min-w-full"
                        />
                    </Link>
                </div>
                <div className="flex justify-evenly">
                    <div className="hidden sm:block">
                        <Link href="/discover">
                            <div className="mx-4 flex flex-col items-center">
                                <ExploreIcon className="text-gray-500" />
                                <p className="font-light text-gray-500">
                                    Discover
                                </p>
                            </div>
                        </Link>
                    </div>
                    <div className="hidden sm:block">
                        <Link href="/people">
                            <div className="mx-4 flex flex-col items-center">
                                <PeopleAltIcon className="text-gray-500" />
                                <p className="font-light text-gray-500">
                                    People
                                </p>
                            </div>
                        </Link>
                    </div>
                    <div className="hidden sm:block">
                        <Link href="/learning">
                            <div className="mx-4 flex flex-col items-center">
                                <OndemandVideoIcon className="text-gray-500" />
                                <p className="font-light text-gray-500">
                                    Learning
                                </p>
                            </div>
                        </Link>
                    </div>
                    <div className="hidden sm:block">
                        <Link href="/jobs">
                            <div className="mx-4 mr-8 flex flex-col items-center">
                                <BusinessCenterIcon className="text-gray-500" />
                                <p className="font-light text-gray-500">Jobs</p>
                            </div>
                        </Link>
                    </div>

                    <Link href="/signin">
                        <a className="px-4 py-2 text-[#0a66c2] rounded-3xl border-[1.5px] border-[#0a66c2] hover:text-[#004182] hover:border-[#004182] hover:bg-[#0a66c21c]">
                            Sign in
                        </a>
                    </Link>
                </div>
            </nav>
            <section>
                <div className="sm:flex sm:justify-between">
                    <div className="mt-8 sm:mt-[50px] sm:max-w-[50vw] w-full">
                        <div className="p-4 sm:mb-16 sm:pl-24  text-3xl sm:text-[2.9rem] leading-normal text-orange-600">
                            <h1>Welcome to your professional community</h1>
                        </div>
                        <div className="sm:px-24 mt-4 ">
                            <GuideButtons
                                value="Search for a Job"
                                redirectTo="/jobs"
                            />
                            <GuideButtons
                                value="Find a person you know"
                                redirectTo="/people"
                            />
                            <GuideButtons
                                value="Learn a new Skill"
                                redirectTo="/learningS"
                            />
                        </div>
                    </div>
                    <div className="relative top-0">
                        <Image
                            width="650"
                            height="650"
                            src="/Landing-Page-Stock-Image.svg"
                            alt="landing page image"
                        ></Image>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;

type GuideProps = {
    value: string;
    redirectTo: string;
};

export function GuideButtons(props: GuideProps) {
    return (
        <div className="flex justify-between text-gray-700 px-4 py-2 sm:py-4 bg-white sm:rounded my-4">
            <div className="text-xl ">
                <h1>{props.value}</h1>
            </div>
            <div className="">
                <Link href={props.redirectTo}>
                    <ArrowForwardIosIcon />
                </Link>
            </div>
        </div>
    );
}
