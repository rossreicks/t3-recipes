import '@src/styles/globals.css';

import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';

import { Avatar, AvatarFallback, AvatarImage } from '@src/components/ui/avatar';
import { Toaster } from '@src/components/ui/sonner';
import { getServerAuthSession } from '@src/server/auth';
import { TRPCReactProvider } from '@src/trpc/react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@src/components/ui/dropdown-menu';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
});

export const metadata = {
    title: 'My Recipes',
    description: 'A simple app to store your favorite recipes',
    icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en' className='h-full bg-white'>
            <body className={`h-full font-sans ${inter.variable}`}>
                <Header />
                <TRPCReactProvider cookies={cookies().toString()}>{children}</TRPCReactProvider>
                <Toaster />
            </body>
        </html>
    );
}

const Header = async () => {
    const session = await getServerAuthSession();

    const getInitials = (name: string | null | undefined) => {
        if (!name) {
            return '';
        }

        const [first, last] = name.split(' ');

        return `${first![0]}${last![0] || ''}`;
    };

    return (
        <header className='flex items-center justify-between px-6 py-4 bg-gray-900'>
            <h1 className='text-2xl font-bold text-white'>
                <a href='/'>{metadata.title}</a>
            </h1>
            {session ? (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src={session.user.image || undefined} />
                            <AvatarFallback>{getInitials(session.user.name)}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Saved Recipes</DropdownMenuItem>
                        <DropdownMenuItem>History</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <a href='/api/auth/signout'>Logout</a>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <a href='/api/auth/signin' className='text-white'>
                    Login
                </a>
            )}
        </header>
    );
};
