import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const CreatePost = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [imageURL, setImageURL] = useState('');

    const router = useRouter();
    const handleSubmit = async () => {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url:
                process.env.NODE_ENV === 'development'
                    ? `http://localhost:3000/api/posts/`
                    : `https://link-up/api/posts/`,
            data: {
                name,
                message,
                imageURL,
                likes: 0,
            },
        };

        const response: AxiosResponse = await axios(config);
        if (response.status === 201) {
            router.reload();
        }
    };

    return (
        <div className="bg-gray-500  sm:w-[40vw] sm:shadow-[1px_1px_10px_2px_rgba(0,0,0,0.2)] w-screen rounded-md relative left-12 top-16 z-10">
            <form
                method="post"
                className="min-w-fit flex flex-col mx-auto"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <div className="mx-auto py-2">
                    <input
                        type="text"
                        placeholder="name"
                        className="s-full sm:w-[30vw] px-4 py-2 rounded"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        value={name}
                    />
                </div>
                <div className="mx-auto py-2">
                    <input
                        type="text"
                        className="s-full sm:w-[30vw] px-4 py-2 rounded"
                        my-2
                        placeholder="what do you want to talk about?"
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                        value={message}
                    />
                </div>
                <div className="mx-auto py-2">
                    <input
                        type="text"
                        className="s-full sm:w-[30vw] px-4 py-2 rounded"
                        my-2
                        placeholder="Paste an image url"
                        onChange={(e) => {
                            setImageURL(e.target.value);
                        }}
                        value={imageURL}
                    />
                </div>
                <input
                    className="bg-[#0a66c2] px-4 py-1 my-2 w-fit mx-auto rounded-3xl text-gray-200"
                    type="submit"
                    value="Post"
                />
            </form>
        </div>
    );
};

export default CreatePost;
