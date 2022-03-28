import Image from 'next/image';
import { getProviders, signIn as signIntoProvider } from 'next-auth/react';
import Header from '../../components/Header';
import FullLogo from '../../assets/2880px-Instagram_logo.svg.png';

// Happening at browser level
function signIn({ providers }) {
    return (
        <>
            <Header />
            <div className='flex flex-col items-center justify-center min-h-screen py-2 -mt-56 px-14 text-center'>
                <div className='w-80'>
                    <Image src={FullLogo} alt="Logo" />
                </div>
                <p className='font-xs italic'>This is not a real app. Functions are limited.</p>
                <div className='mt-40 '>
                    {Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                            <button className='p-3 bg-blue-500 rounded-lg text-white' onClick={() => signIntoProvider(provider.id, {callbackUrl: '/'})}>
                                Sign in with {provider.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

// Happening at middle layer server level
export async function getServerSideProps(context) {
    const providers = await getProviders();
    return {
        props: {
            providers
        }
    };
}

export default signIn
