import { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationBar from './components/NavigationBar';
import MyCard from './components/MyCard';
import MyForm from './components/MyForm';
import { getAccount } from './util/api';

export default function Withdraw() {

  const [account, updateAccount] = useState();
  const [withdraw, updateWithdraw] = useState(0);

  useEffect( () => {
    async function fetchData() {
      updateAccount(await getAccount());
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    switch(e.target.name){
      case 'withdraw':
        updateWithdraw(e.target.value);
        break;
      default:
        return;
    }
  }

  const handleSubmit = async () => {
    if(withdraw < account.balance && localStorage.getItem('token')){
      try {
        axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        const res = await axios.post('/api/transactions', {
          transactionType: 'WITHDRAWAL',
          amount: withdraw
        });
        updateAccount(res.data.account);
      } catch (err) {
        console.error(err.msg);
      }
    }
  }

  return (
    <div>
      <NavigationBar />
      <MyCard title={'Withdraw'} text={'Fill in the following information'}>
        {account && <h1>Current Balance: ${account.balance}</h1>}
        <MyForm 
          fieldList={
            [
              {
                name: 'withdraw',
                controlId: 'withdraw',
                label: 'Withdraw',
                type: 'number',
                placeholder: 'Amount',
                text: 'Enter amount to be withdrawn',
                handleChange,
                value: withdraw
              }
            ]
          }
          button={
            {
              variant: 'primary',
              type: 'submit',
              text: 'Withdraw',
              handleSubmit
            }
          }
        />
      </MyCard>
    </div>
  )
}
