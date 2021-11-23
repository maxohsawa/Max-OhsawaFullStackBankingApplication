import { useState, useEffect } from 'react';
import NavigationBar from './components/NavigationBar';
import MyCard from './components/MyCard';
import { getAccount } from './util/api';

export default function Home() {

  const [account, updateAccount] = useState();

  useEffect( () => {
    async function fetchData() {
      updateAccount(await getAccount());
    }
    fetchData();
  }, []);

  return (
    <div>
      <NavigationBar account={account}/>
      {!account &&
        <MyCard 
          title={'Welcome to BANKR'}
          text={'Begin by Logging in or Creating an account'}
        />
      }
      {account &&
        <MyCard 
          title={`Hello, ${account.name}`}
          text={`Your balance is $${account.balance}`}>
          <p>Begin banking by using the navigation bar above</p>
        </MyCard>
      }
      

    </div>
  )
}
