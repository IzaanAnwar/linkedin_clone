import axios from 'axios';
import { NextPageContext } from 'next';
import React from 'react';
import { IPost } from '../models/post';

const dashboard = ({ allPosts: _potss }) => {
    return <div>dashboard</div>;
};

export default dashboard;

export async function GetStaticProps(Context: NextPageContext) {
    const response = await axios.get('/api/posts/');
    const allPosts: Array<IPost> | object = response?.data;
    return {
        porps: {
            allPosts,
        },
    };
}
