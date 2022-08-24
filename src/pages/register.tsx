import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const register = () => {
    return (
        <>
            <nav className="p-2">
                <div className="block max-w-[200px] max-h-[55px] mx-auto mt-20">
                    <Link href="/">
                        <Image
                            src="/logo-with-text.svg"
                            alt="navbar-logo"
                            width={200}
                            height={55}
                            layout="responsive"
                            className="min-w-full"
                        />
                    </Link>
                </div>
            </nav>

            <div className="sm:max-w-[50vw] bg-gray-200 mx-auto mt-8">
                <form
                    action="someFunc"
                    method="post"
                    className="block max-w-fit p-4 mx-auto"
                >
                    <label htmlFor="email">Email or Phone Number</label>
                    <input
                        className="rounded border-solid border-[1px] border-gray-400 block px-2  py-1"
                        type="email"
                        name="email"
                    />
                    <label htmlFor="name">Your Name</label>
                    <input
                        className="rounded border-2 block"
                        type="text"
                        name="name"
                    />
                    <label htmlFor="password">password</label>
                    <input
                        className="rounded border-2 block"
                        type="password"
                        name="password"
                    />
                    <button type="submit">Sign up</button>
                </form>
            </div>
        </>
    );
};

export default register;
