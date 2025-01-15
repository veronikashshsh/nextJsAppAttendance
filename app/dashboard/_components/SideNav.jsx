"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import { GraduationCap, Hand, HomeIcon, LayoutIcon, Settings } from 'lucide-react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Link from 'next/link'
import { usePathname } from 'next/navigation';

function SideNav() {  // Component name should start with a capital letter

    const { user } = useKindeBrowserClient();

    const menuList = [
        {
            id: 1, 
            name: 'Головна сторінка', 
            icon: LayoutIcon, 
            path: '/dashboard',
        },
        {
            id: 2, 
            name: 'Робітники', 
            icon: GraduationCap, 
            path: '/dashboard/students',
        },
        {
            id: 3, 
            name: 'Відвідуваність', 
            icon: Hand, 
            path: '/dashboard/attendance',
        },
        {
            id: 4, 
            name: "Добавити об'єкт", 
            icon: HomeIcon, 
            path: '/dashboard/addObject',
        },
        {
            id: 5, 
            name: 'Налаштування', 
            icon: Settings, 
            path: '/dashboard/settings',
        },
    ];

    const path=usePathname();
    useEffect(()=>{
        console.log(path)
    })

    return (
        <div className='border shadow-md h-screen p-5'>
            <Image src='/logo.svg' width={120} height={40} alt='logo' priority/>
            <hr className='my-5' />
            {menuList.map((menu) => (
               <Link key={menu.id} href={menu.path}>
                <h2 
                    key={menu.id} // Added a key for better React performance
                    className={`flex items-center gap-3 text-md p-4
                     text-slate-500
                     hover:bg-primary
                     hover:text-white
                     cursor-pointer
                     rounded-lg
                     my-2
                     ${path==menu.path&&'bg-primary text-white'}
                     `}>
                    <menu.icon />
                    {menu.name}
                </h2>
                </Link>
            ))}

            <div className='flex gap-2 items-center bottom-5 fixed p-2'>
                {user?.picture ? (
                    <Image 
                        src={user?.picture} 
                        width={35} 
                        height={35} 
                        alt='user' 
                        className='rounded-full' 
                    />
                    ) : (
                        // Якщо user.picture не визначено, можна відобразити інше зображення або просто пропустити компонент
                        <div className="w-8 h-8 rounded-full bg-gray-400" />
                )}
                <div>
                    <h2 className='text-sm font-bold'>{user?.given_name} {user?.family_name}</h2>
                    <h2 className='text-xs text-slate-400'>{user?.email}</h2>
                </div>
            </div>
        </div>
    );
}

export default SideNav;
