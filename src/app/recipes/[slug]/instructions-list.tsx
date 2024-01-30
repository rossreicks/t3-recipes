'use client';
import { Separator } from '@src/components/ui/separator';
import { useState } from 'react';

export const InstructionsList = ({ instructions }: { instructions: string[] }) => (
    <ul className='flex flex-col gap-3'>
        {instructions.map((instruction, i) => (
            <ListItem key={`ingredient-${i}`}>
                {instruction}
                <Separator className='my-2' />
            </ListItem>
        ))}
    </ul>
);

export const ListItem = ({ children }: { children: React.ReactNode }) => {
    const [checked, setChecked] = useState(false);

    const toggleChecked = () => setChecked((prev) => !prev);

    return (
        <li onClick={toggleChecked} onKeyDown={toggleChecked} className={checked ? 'line-through' : ''}>
            {children}
        </li>
    );
};
