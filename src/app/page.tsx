import Link from 'next/link';

import { CreatePost } from '@src/app/_components/create-post';
import { api } from '@src/trpc/server';

export default async function Home() {
    return (
        <main className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
            <CrudShowcase />
        </main>
    );
}

async function CrudShowcase() {
    const latestPost = await api.post.getLatest.query();

    return (
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            {latestPost ? (
                <h3 className='truncate'>Your most recent post: {latestPost.name}</h3>
            ) : (
                <h3>You have no posts yet.</h3>
            )}

            <CreatePost />
        </div>
    );
}
