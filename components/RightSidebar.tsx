import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import BankCard from './BankCard'
const RightSidebar = ({user,transactions,banks}:RightSidebarProps) => {
  return (
    <aside className='right-sidebar'>
        <section className='flex flex-col pb-8'>
            <div className='profile-banner' />
            <div className='profile'>
                <div className='profile-img'>
                    <span className='text-5xl text-bold text-blue-900'>{user.firstName[0]}</span>
                </div>
                <div className="profile-details">

                    <h1 className='profile-name'>{user.firstName} {user.lastName}</h1>

                    <p className='profile-email'>{user.email}</p>
                </div>
            </div>
        </section>

        <section className='banks'>
            <div className='flex w-full justify-between'>
                <h2 className='header-2'> My Banks</h2>
                <Link href="/" className='gap-2 flex'>
                    <Image  
                    src="/icons/plus.svg"
                    height={20}
                    width={20}
                    alt='plus'
                    />
                    <h2 className='text-14 font-semibold text-gray-700'>Add Bank</h2>
                </Link>
            </div>

            {banks?.length > 0 && (
                <div className='relative flex flex-1 flex-col justify-center items-center gap-5'>
                    <div className="relative z-10">
                        <BankCard
                            key={banks[0].$id}
                            account={banks[0]}
                            userName = {`${user.firstName} ${user.lastName}`}
                            showBalance = {false}
                        />
                    </div>
                    {banks[1] && (
                        <div className='absolute z-0 right-0 top-8 w-[90%]'>
                            <BankCard 
                            key={banks[1].$id}
                            account={banks[1]}
                            userName = {`${user.firstName} ${user.lastName}`}
                            showBalance = {false}/>
                        </div>
                    )}
                </div>
            )}
        </section>
    </aside>
  )
}

export default RightSidebar