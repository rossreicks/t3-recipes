import { Button } from '@src/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@src/components/ui/card';
import { DBRecipe } from '@src/server/db/schema';
import Link from 'next/link';

const getFriendlyTime = (time: number | undefined) => {
    if (!time) {
        return '';
    }

    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    return `${hours ? `${hours}h` : ''} ${minutes ? `${minutes}m` : ''}`;
};

export const RecipeCard = ({ recipe }: { recipe: DBRecipe }) => {
    return (
        <Card>
            <CardHeader>
                <CardDescription>
                    <div>
                        <img className='w-full' src={(recipe.images as string[])[0]} alt={`${recipe.name}-image`} />
                    </div>
                </CardDescription>
                <CardTitle>{recipe.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='flex justify-between mt-4 mb-4 text-gray-500'>
                    <div className='flex items-center'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-6 w-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <title>Clock</title>
                            <path
                                stroke-linecap='round'
                                stroke-linejoin='round'
                                stroke-width='2'
                                d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                        </svg>
                        <span className='ml-1 lg:text-xl'>{getFriendlyTime(recipe.totalTime)}</span>
                    </div>
                    <div className='flex items-center'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                        >
                            <title>Comment</title>
                            <path d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z' />
                            <path
                                fill-rule='evenodd'
                                d='M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z'
                                clip-rule='evenodd'
                            />
                        </svg>
                        <span className='ml-1 lg:text-xl'>{(recipe.ingredients as string[]).length}</span>
                    </div>
                    <div className='flex items-center'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                        >
                            <title>Star</title>
                            <path d='M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z' />
                        </svg>
                        <span className='ml-1 lg:text-xl'>{recipe.yield}</span>
                    </div>
                </div>
                <div>
                    <p className='mb-4 text-gray-500'>{recipe.description}</p>
                </div>
            </CardContent>
            <CardFooter>
                <Link href={`/recipes/${recipe.slug}`}>
                    <Button>View Recipe</Button>
                </Link>
            </CardFooter>
        </Card>
    );
};
