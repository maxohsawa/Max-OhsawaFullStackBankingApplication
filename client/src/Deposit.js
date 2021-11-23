import { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationBar from './components/NavigationBar';
import MyCard from './components/MyCard';
import MyForm from './components/MyForm';
import { getAccount } from './util/api';

export default function Deposit() {

  const [account, updateAccount] = useState();
  const [deposit, updateDeposit] = useState(0);

  useEffect( () => {
    async function fetchData() {
      updateAccount(await getAccount());
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    switch(e.target.name){
      case 'deposit':
        updateDeposit(Number(e.target.value));
        break;
      default:
        return;
    }
  }

  const handleSubmit = async () => {
    if(deposit < 0 || localStorage.getItem('token') === null) return;
    try {
      axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
      axios.defaults.headers.common['Content-Type'] = 'application/json';
      console.log('deposit amount', deposit);
      const res = await axios.post('/api/transactions', {
        transactionType: 'DEPOSIT',
        amount: deposit
      });
      updateAccount(res.data.account);
    } catch (err) {
      console.error(err.msg);
    }
    
  }

  return (
    <div>
      <NavigationBar />
      <MyCard title={'Deposit'} text={'Fill in the following information'}>
        {account && <h1>Current Balance: ${account.balance}</h1>}
        <MyForm 
          fieldList={
            [
              {
                name: 'deposit',
                controlId: 'deposit',
                label: 'Deposit',
                type: 'number',
                placeholder: 'Amount',
                text: 'Enter amount to be deposited',
                handleChange,
                value: deposit
              }
            ]
          }
          button={
            {
              variant: 'primary',
              type: 'submit',
              text: 'Deposit',
              handleSubmit
            }
          }
        />
      </MyCard>
    </div>
  )
}
