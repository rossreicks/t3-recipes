import { Button } from '@src/components/ui/button';
import { Separator } from '@src/components/ui/separator';
import { DBRecipe } from '@src/server/db/schema';
import { api } from '@src/trpc/server';
import Link from 'next/link';
import { RecipeCard } from './recipe-card';

export default async function RecentRecipes() {
    const recipes = await api.recipes.getRecipes.query();

    return (
        <div>
            <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0'>Recent Recipes</h2>
            <Separator className='my-4' />
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr'>
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe as DBRecipe} />
                ))}
            </div>
        </div>
    );
}
