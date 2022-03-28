import Image from 'next/image';
import { SearchIcon, PlusCircleIcon, UserGroupIcon, HeartIcon, BellIcon, MenuIcon } from '@heroicons/react/outline';
import { HomeIcon } from '@heroicons/react/solid'
import FullLogo from '../assets/2880px-Instagram_logo.svg.png';
import Logo from '../assets/insta-logo.png';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';

function Header() {
    const { data: session } = useSession();
    const [openModal, setOpenModal] = useRecoilState(modalState);
    const router = useRouter();
    return (
        <div className='shadow-sm border-b bg-white sticky top-0 z-50'>
            <div className='flex justify-between max-w-6xl mx-5 lg:mx-auto'>
                {/* left logo section*/}
                <div onClick={() => router.push('/')} className='relative hidden lg:inline-grid w-24 cursor-pointer'>
                    <Image src={FullLogo} layout='fill' objectFit='contain' />
                    {/* For src links we need to add whitelist in next.config.js */}
                    {/* <Image src='https://links.papareact.com/ocw' layout='fill' /> */}
                </div>
                <div onClick={() => router.push('/')} className='relative w-10 lg:hidden flex-shrink-0 cursor-pointer'>
                    <Image src={Logo} layout='fill' objectFit='contain' />
                </div>

                {/* middle search bar section*/}
                <div className='max-w-xs'>
                    <div className='relative mt-1 p-3 rounded-md'>
                        <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                            <SearchIcon className='h-5 w-5 text-gray-500' />
                        </div>
                        <input className='bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black' type='text' placeholder='Search' />
                    </div>
                </div>

                {/* right options bar section*/}
                <div className='flex items-center justify-end space-x-4'>
                    <HomeIcon onClick={() => router.push('/')} className='navBtn' />
                    <MenuIcon className='h-6 md:hidden cursor-pointer' />
                    {session ? (
                        <>
                            <div className='relative navBtn'>
                                <BellIcon className='navBtn' />
                                <div className='badge'>3</div>
                            </div>
                            <PlusCircleIcon onClick={() => setOpenModal(true)} className='navBtn' />
                            <UserGroupIcon className='navBtn' />
                            <HeartIcon className='navBtn' />
                            <img onClick={signOut} src={session.user.image} alt="profile picture" className='h-10 w-10 object-cover rounded-full border p-[1px] cursor-pointer' />
                        </>
                    ) : (<button onClick={signIn}>Sign In</button>)}
                </div>
            </div>
        </div>
    )
}

export default Header
