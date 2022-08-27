// import axios from 'axios';
import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
// import { IPost } from '../models/post';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const dashboard = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className="grid">
                <Profile />
            </div>
        </>
    );
};

function Profile() {
    return (
        <div className="sm:w-[20vw] rounded  m-4 sm:shadow-[4px_4px_15px_3px_rgba(0,0,0,0.2)] ">
            <div className="min-w-full h-[4rem] bg-gray-500 rounded-t-md"></div>
            <div className=" relative top-[-40px] text-center w-16 h-16 mx-auto">
                <AccountCircleIcon className="w-16 h-16" />
            </div>
            <div className="text-center border-b-2 pb-4 max-h-fit">
                <h1>Name</h1>
                <p>email@email.com</p>
            </div>
            <div className="px-8 py-4 border-b-2 text-[#0a66c2]">
                <Link href="#">
                    <a className="block">who viewed your profile</a>
                </Link>
                <Link href="#">
                    <a className="block">views of your post</a>
                </Link>
            </div>
            <div></div>
        </div>
    );
}

export default dashboard;

// export async function GetStaticProps(Context: NextPageContext) {
//     const response = await axios.get('/api/posts/');
//     const allPosts: Array<IPost> | object = response?.data;
//     return {
//         porps: {
//             allPosts,
//         },
//     };
// }
