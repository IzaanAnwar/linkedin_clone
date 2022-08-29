// import axios from 'axios';
import React from 'react';
import Link from 'next/link';

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Popup from 'reactjs-popup';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Image from 'next/image';

import Navbar from '../components/Navbar';
import Post from '../components/Post';

import {
    GetServerSideProps,
    InferGetServerSidePropsType,
    NextPage,
} from 'next';
import { IPost } from '../models/post';
import CreatePost from '../components/CreatePost';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url:
            process.env.NODE_ENV === 'development'
                ? `http://localhost:3000/api/posts/`
                : `/api/posts`,
        headers: { Cookie: `auth_token=${context.req.cookies.auth_token}` },
    };
    try {
        const response: AxiosResponse = await axios(config);

        if (response.data?.message === 'Found' && response.data?.posts) {
            const allPosts: Array<IPost> = response.data.posts;
            return {
                props: {
                    allPosts,
                },
            };
        } else {
            return {
                props: {
                    allPosts: '',
                },
            };
        }
    } catch (error) {
        console.log(error);
        return {
            props: {
                message: 'You Need to Log In',
            },
        };
    }
};

const dashboard: NextPage = ({
    allPosts,
    message = null,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    if (message) {
        return <div>{message}</div>;
    }
    return (
        <>
            <Navbar />
            <div className="sm:grid p-4 bg-gray-200">
                <div className="sm:col-start-1 sm:row-start-1 mt-2">
                    <Profile />
                </div>
                <div className="sm:row-start-2 sm:col-start1 mt-2">
                    <DiscoverBox />
                </div>
                <div className="sm:col-start-2 sm:row-start-1 mt-2">
                    <PostUpload />
                </div>
                {allPosts &&
                    allPosts.map((post: IPost) => {
                        return (
                            <div className="my-4 sm:col-start-2 sm:row-start-auto relative top-[-6rem]">
                                <Post
                                    key={post._id}
                                    name={post.name}
                                    imageURL={post.imageURL}
                                    message={post.message}
                                    likes={post.likes}
                                    _id={post._id}
                                />
                            </div>
                        );
                    })}

                <div className="sm:col-start-3 sm:row-start-1 mt-2">
                    <NewsBox />
                </div>
                <div className="sm:col-start-3 sm:row-start-2  mt-2">
                    <AdvertismentBox />
                </div>
            </div>
        </>
    );
};
export default dashboard;

function Profile() {
    return (
        <div className="sm:w-[20vw]  rounded-lg  sm:shadow-[1px_1px_10px_2px_rgba(0,0,0,0.2)]  bg-gray-200 ">
            <div className="min-w-full h-[4rem] bg-gray-700 rounded-t-lg"></div>
            <div className=" relative top-[-40px] text-center text-gray-900 w-16 h-16 mx-auto">
                <AccountCircleIcon className="w-16 h-16" />
            </div>
            <div className="text-center border-b-2 pb-4 max-h-fit text-gray-800">
                <h1>Name</h1>
                <p>email@email.com</p>
            </div>
            <div className="px-8 py-4 rounded-b-lg text-gray-800">
                <Link href="#">
                    <a className="block">who viewed your profile 367</a>
                </Link>
                <Link href="#">
                    <a className="block">views of your post 367</a>
                </Link>
            </div>
        </div>
    );
}

function DiscoverBox() {
    return (
        <div className="text-gray-800 p-4 bg-gray-200 sm:w-[20vw] rounded-lg  sm:shadow-[1px_1px_10px_2px_rgba(0,0,0,0.2)]">
            <div>
                <h1>
                    <Link href="/groups">
                        <a>Groups</a>
                    </Link>
                </h1>
            </div>
            <div>
                <h1>
                    <Link href="/events">
                        <a>Events</a>
                    </Link>
                </h1>
            </div>
            <div className="border-b-2">
                <h1>
                    <Link href="/followed">
                        <a>Followed Hashtags</a>
                    </Link>
                </h1>
            </div>
            <div className="text-[#0a66c2]">
                <Link href="/discover">
                    <a>Discover more</a>
                </Link>
            </div>
        </div>
    );
}

function PostUpload() {
    return (
        <div className="w-[40vw]  rounded-lg  sm:shadow-[1px_1px_10px_2px_rgba(0,0,0,0.2)] p-4 bg-gray-200">
            <div className="max-w-fit mx-auto flex justify-between items-center">
                <div className=" w-10 h-10 relative right-2 text-gray-800">
                    <AccountCircleIcon className="w-10 h-10" />
                </div>
                <div className="min-w-full">
                    <Popup
                        trigger={
                            <input
                                type="text"
                                placeholder="Share a post"
                                className="px-4 py-2 bg-gray-200 rounded-3xl min-w-[30vw]"
                            />
                        }
                        position="bottom right"
                    >
                        <CreatePost />
                    </Popup>
                </div>
            </div>
            <div className=" min-w-full flex justify-evenly items-center pt-4 font-bold text-[#066ac2]">
                <div>
                    <h1>Photo</h1>
                </div>
                <div>
                    <h1>Video</h1>
                </div>
                <div>
                    <h1>Job</h1>
                </div>
                <div>
                    <h1>Article</h1>
                </div>
            </div>
        </div>
    );
}

function NewsBox() {
    return (
        <div className="sm:w-[20vw] rounded-lg bg-gray-200 sm:shadow-[1px_1px_10px_2px_rgba(0,0,0,0.2)]">
            <div className=" p-2 flex justify-between items-center text-lg font-bold text-gray-900">
                <h1>LinkedIn News</h1>{' '}
                <i>
                    <NotificationsIcon />
                </i>
            </div>
            <div className="max-w-fit py-2 mx-auto text-gray-800 ">
                <div>
                    <h1>Some News bla bla bla..</h1>
                </div>
                <div>
                    <h1>Some News bla bla bla..</h1>
                </div>
                <div>
                    <h1>Some News bla bla bla..</h1>
                </div>
                <div>
                    <h1>Some News bla bla bla..</h1>
                </div>
                <div>
                    <h1>Some News bla bla bla..</h1>
                </div>
                <div>
                    <h1>Some News bla bla bla..</h1>
                </div>
                <div>
                    <h1>Some News bla bla bla..</h1>
                </div>
                <div>
                    <h1>Some News bla bla bla..</h1>
                </div>
                <div>
                    <h1>Some News bla bla bla..</h1>
                </div>
            </div>
        </div>
    );
}

function AdvertismentBox() {
    return (
        <div className=" sm:w-[20vw] rounded-lg  sm:shadow-[1px_1px_10px_2px_rgba(0,0,0,0.2)]">
            <div>
                <Link href="/register">
                    <Image
                        width={272}
                        height={272}
                        className="w-fit h-fit rounded-lg"
                        layout="responsive"
                        src="/Dashboard-Promo-Image.jpg"
                        alt="promo image"
                    ></Image>
                </Link>
            </div>
        </div>
    );
}
