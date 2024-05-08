import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'
import RightSidebar from '@/components/RightSidebar'
const Home = () => {
  const loggedIn = { firstName: 'Aritra', lastName: 'Sarkar' ,email: 'aritras2411@gmail.com' }
  return (
    <section className='home'>
      <div className='home-content'>
          <header className='home-header'>
                <HeaderBox
                  type = "greeting"
                  title = "Welcome"
                  user = {loggedIn?.firstName || 'Guest'}
                  subtext="Access and manage your account and transactions effortlessly"
                />

                <TotalBalanceBox
                  accounts={[]}
                  totalBanks={1}
                  totalCurrentBalance={7450}
                />
          </header>
          RECENT TRANNSACTIONS
      </div>
      <RightSidebar 
        user = {loggedIn}
        transactions = {[]}
        banks = {[{currentBalance:42.42},{currentBalance:99.99}]}
      />
    </section>
  )
}

export default Home