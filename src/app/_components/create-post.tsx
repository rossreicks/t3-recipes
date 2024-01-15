'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@src/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@src/components/ui/form';
import { Input } from '@src/components/ui/input';
import { api } from '@src/trpc/react';
import { useRouter } from 'next/navigation';
import { Form, useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    name: z.string().min(2).max(50),
});

export function CreatePost() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        createPost.mutate(values);
    }

    const createPost = api.post.create.useMutation({
        onSuccess: () => {
            router.refresh();
            form.reset();
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Post Name</FormLabel>
                            <FormControl>
                                <Input placeholder='Enter post title here' {...field} />
                            </FormControl>
                            <FormDescription>This will be the name of the post</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Submit</Button>
            </form>
        </Form>
    );
}
