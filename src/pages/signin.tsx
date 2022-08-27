import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const signin = () => {
    const router = useRouter();
    const [passwordType, setPasswordType] = useState('password');
    const [passwordInput, setPasswordInput] = useState('show');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [recMessage, setRecMessage] = useState('');

    const handlePasswordType = () => {
        if (passwordInput === 'show') {
            setPasswordType('text');
        } else {
            setPasswordType('password');
        }
    };

    const handleSubmit = async () => {
        const body = {
            email,
            password,
        };
        const options: AxiosRequestConfig = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },

            url: '/api/auth/register',
            params: body,
        };

        const response: AxiosResponse = await axios(
            '/api/auth/signin',
            options,
        );

        if (response.status === 200 && response?.data?.isAuthenticated) {
            setRecMessage(response.data.message);
            router.push('/dashboard');
        } else if (
            response.status === 200 &&
            !response?.data?.isAuthenticated
        ) {
            setRecMessage(response.data.message);
        } else {
            setRecMessage('Something Went Wrong!!!');
        }
    };

    return (
        <>
            <nav className="p-2 sm:text-left text-center sm:px-24">
                <div className="block max-w-[140px] sm:mx-0  mx-auto max-h-[30px] mt-8">
                    <Link href="/">
                        <Image
                            src="/logo-with-text.svg"
                            alt="navbar-logo"
                            width={140}
                            height={40}
                            layout="responsive"
                            className="min-w-full"
                        />
                    </Link>
                </div>
            </nav>
            <div className="flex flex-col  items-center sm:max-w-[30vw] sm:min-h-[70vh] sm:mx-auto sm:shadow-[4px_4px_15px_3px_rgba(0,0,0,0.2)] sm:px-4 sm:rounded-md">
                <div className="text-gary-700 sm:w-[20rem] text-center sm:text-left pt-4 mt-4">
                    <h1 className="text-3xl font-bold">Sign in</h1>
                    <p className="text-base">
                        Stay updated to your professional world
                    </p>
                </div>
                <div className="text-red-500 sm:w-[20rem] text-center sm:text-left min-h-[2rem]">
                    <p>{recMessage}</p>
                </div>
                <form
                    className="sm:min-w-fit w-full"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        await handleSubmit();
                    }}
                    method="get"
                >
                    <input
                        className="block rounded border-2 p-2 mt-4 sm:w-[20rem] mx-auto w-full"
                        type="email"
                        placeholder="Email or Phone"
                        required
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <div>
                        <input
                            className="block rounded border-2 p-2 mt-4 sm:w-[20rem] mx-auto w-full"
                            type={passwordType}
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <i
                            className="text-[#0a66c2] cursor-pointer relative bottom-9 left-[21rem] sm:left-[18rem]"
                            onClick={(e) => {
                                if (passwordInput === 'show') {
                                    setPasswordInput('hide');
                                    e.currentTarget.textContent = passwordInput;
                                } else {
                                    setPasswordInput('show');

                                    e.currentTarget.textContent = passwordInput;
                                }
                                handlePasswordType();
                            }}
                        >
                            {passwordInput}
                        </i>
                    </div>
                    <Link href="/">
                        <a className="w-full sm:ml-[1.8rem] text-[#0a66c2]">
                            Forgot password?
                        </a>
                    </Link>
                    <input
                        type="submit"
                        className="my-4 text-white py-2 w-screen sm:w-[20rem] sm:ml-[1.8rem] sm:rounded-3xl bg-[#0a66c2]"
                        value="Continue"
                    />
                </form>
            </div>
            <div className="my-4 mx-auto sm:max-w-[30vw] text-center">
                <h1 className="inline pr-2">New to LinkedIn?</h1>
                <Link href="/register">
                    <a className="text-[#0a66c2]">Sign up</a>
                </Link>
            </div>
        </>
    );
};

export default signin;
