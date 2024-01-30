'use client';
import { Checkbox } from '@src/components/ui/checkbox';
import { Separator } from '@src/components/ui/separator';

export const IngredientsList = ({ ingredients }: { ingredients: string[] }) => {
    return (
        <ul className='flex flex-col gap-5'>
            {ingredients.map((ingredient) => (
                <li key={ingredient}>
                    <div className='flex gap-x-2'>
                        <Checkbox id={ingredient} />
                        <label
                            htmlFor={ingredient}
                            className='leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                        >
                            {ingredient}
                        </label>
                    </div>
                </li>
            ))}
        </ul>
    );
};
