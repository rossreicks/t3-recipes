import Link from 'next/link';

import { ParseRecipeForm } from '@src/app/_components/parse-recipe';
import { Button } from '@src/components/ui/button';
import { api } from '@src/trpc/server';
import RecentRecipes from './_components/recent-recipes';

export default async function Home() {
    return (
        <main className='flex min-h-full flex-col justify-center p-6 lg:px-8'>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-y-4'>
                <div className='col-span-3'>
                    <RecentRecipes />
                </div>
                <div className='col-span-1'>
                    <ParseRecipeForm />
                </div>
            </div>
        </main>
    );
}
