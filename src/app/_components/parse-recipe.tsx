'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@src/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@src/components/ui/form';
import { Input } from '@src/components/ui/input';
import { api } from '@src/trpc/react';
import { load } from 'cheerio';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
    recipe: z.string().url(),
});

export function ParseRecipeForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            recipe: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        createPost.mutate(values);
    }

    const createPost = api.recipes.parseRecipe.useMutation({
        onSuccess: (data) => {
            console.log('data', data);

            if (!data) {
                router.refresh();

                return;
            }

            router.push(`/recipes/${data.slug}`);
        },
        onError: (error) => {
            console.log(error);
            toast.error('Unable to parse recipe');
        },
    });

    return (
        <Form {...form}>
            <h1 className='text-4xl font-extrabold text-center text-gray-900'>Import Recipe</h1>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='recipe'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Recipe URL</FormLabel>
                            <FormControl>
                                <Input placeholder='Enter the URL for a recipe here' {...field} />
                            </FormControl>
                            <FormDescription>
                                This will attend to parse the ingredients and instructions for a recipe
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Submit</Button>
            </form>
        </Form>
    );
}
