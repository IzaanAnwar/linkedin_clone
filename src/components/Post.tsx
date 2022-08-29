import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IPost } from '../models/post';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';

export default function Post(props: IPost) {
    const router = useRouter();
    const hadleDeletePost = async () => {
        const config: AxiosRequestConfig = {
            method: 'DELETE',
            url:
                process.env.NODE_ENV === 'development'
                    ? `http://localhost:3000/api/posts/${props._id}`
                    : `https://link-up-beta.vercel.app/api/posts${props._id}`,
        };
        const response: AxiosResponse = await axios(config);
        if (response.status === 200) {
            router.reload();
        }
    };
    return (
        <div className="sm:w-[40vw] bg-gray-200 text-gray-800 rounded-lg sm:shadow-[1px_1px_10px_2px_rgba(0,0,0,0.2)] h-fit w-full">
            <div className="flex p-4 justify-start items-center">
                <div className="w-10 h-10">
                    <AccountCircleIcon className="w-10 h-10" />
                </div>
                <div className="px-4 ">
                    <h1 className="underline">{props?.name}</h1>

                    <p className="text-[0.75rem] ">2 sec ago</p>
                </div>
            </div>
            <div className="border-b-2 border-black ">
                <h1 className="p-4 break-words">{props?.message}</h1>
                {props?.imageURL && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        className="min-w-full"
                        src={props?.imageURL}
                        alt="post image"
                    />
                )}
            </div>
            <div className="rounded-b-ld p-4 text-gray-800 flex justify-evenly items-center cursor-pointer">
                <a className="cursor-pointer border-2 px-4 py-2 rounded-3xl border-black hover:text-gray-100 hover:bg-gray-700 duration-200">
                    Like
                </a>
                <a
                    className="cursor-pointer  border-2 px-4 py-2 rounded-3xl border-black hover:text-gray-100 hover:bg-gray-700 duration-200"
                    onClick={(e) => {
                        e.preventDefault();
                        hadleDeletePost();
                    }}
                >
                    Delete
                </a>
            </div>
        </div>
    );
}
