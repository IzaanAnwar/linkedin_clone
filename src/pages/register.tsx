import React, { FormEvent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const register = () => {
    const redirect = useRouter();

    const [passwordType, setPasswordType] = useState('password');
    const [passwordInput, setPasswordInput] = useState('show');

    const [name, setName] = useState('');
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');

    const [authMessage, setAuthMessage] = useState(null);

    const handlePasswordType = () => {
        if (passwordInput === 'show') {
            setPasswordType('text');
        } else {
            setPasswordType('password');
        }
    };

    const handleSubmit = async () => {
        const options: AxiosRequestConfig = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },

            url: '/api/auth/register',
            data: {
                name,
                email: emailOrPhone,
                password,
            },
        };
        const response: AxiosResponse = await axios(options);

        if (response.status === 200) {
            setAuthMessage(response.data.message);
            return false;
        } else if (response.status === 201) {
            redirect.push('/dashboard');
        } else {
            setAuthMessage('Something went wrong!');
        }
    };
    return (
        <>
            <nav className="p-2 text-center ">
                <div className="block max-w-[140px] max-h-[30px] mx-auto mt-12">
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
                <div className="text-lg text-gray-800 p-4">
                    <h1>Join Linkedin now —— it's free</h1>
                </div>
            </nav>

            <div className="sm:max-w-[50vw] w-screen mx-auto ">
                <div className="min-w-[50vw] h-[2rem]  text-center text-red-600">
                    {authMessage}
                </div>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        await handleSubmit();

                        console.log(authMessage);
                    }}
                    className="block max-w-fit sm:p-4 mx-auto"
                >
                    <label htmlFor="email" className="text-gray-500">
                        Email or Phone Number
                    </label>
                    <input
                        className="mb-6 sm:rounded border-solid border-[1px] border-gray-400 block px-2  py-1 sm:py-2 w-screen sm:w-[24rem]"
                        type="email"
                        name="email"
                        required
                        onChange={(e) => {
                            setEmailOrPhone(e.target.value);
                        }}
                        value={emailOrPhone}
                    />
                    <label className="text-gray-500" htmlFor="name">
                        Your Name
                    </label>
                    <input
                        className="mb-6  sm:rounded border-solid border-[1px] border-gray-400 block px-2  py-1 sm:py-2 w-screen sm:w-[24rem]"
                        type="text"
                        name="name"
                        required
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        value={name}
                    />
                    <label className="text-gray-500" htmlFor="password">
                        Password
                    </label>
                    <div>
                        <input
                            className="mb-6  sm:rounded border-solid border-[1px] border-gray-400  px-2  py-1 sm:py-2 w-screen sm:w-[24rem]"
                            type={passwordType}
                            name="password"
                            required
                            minLength={10}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            value={password}
                        />
                        <i
                            className="text-[#0a66c2] cursor-pointer ml-[-50px]"
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
                    <input
                        type="submit"
                        className="text-white px-4 py-2 w-screen sm:w-full sm:rounded-3xl bg-[#0a66c2]"
                        value="Continue"
                    />
                </form>
                <div className="mx-auto w-full text-center p-4">
                    <p className="sm:inline">already on Linkedin? </p>
                    <Link href="/signin">
                        <a className="text-[#0a66c2]">Sign in</a>
                    </Link>
                </div>
            </div>
            <div></div>
        </>
    );
};

export default register;
