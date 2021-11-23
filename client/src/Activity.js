import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import NavigationBar from './components/NavigationBar';
import MyCard from './components/MyCard';
import { getAccount, getTransactions } from './util/api';

export default function Activity() {

  const [account, updateAccount] = useState();
  const [transactions, updateTransactions] = useState();

  useEffect( () => {
    async function fetchData() {
      updateAccount(await getAccount());
      updateTransactions(await getTransactions());
    }
    fetchData();
  }, []);

  
  

  return (
    <div>
      <NavigationBar account={account}/>
      {account &&
        <MyCard 
          title={`Hello, ${account.name}`}
          text={`Here is your recent activity`}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {transactions && transactions.map(
                (item, index) => {
                  return (
                      <tr key={`Row${index}`}>
                        <td>{item.date.split('T')[0]}</td>
                        <td>{item.date.split('T')[1].split('.')[0]}</td>
                        <td>{item.transactionType}</td>
                        <td>{item.amount}</td>
                        <td>{item.balanceAfter}</td>
                      </tr>
                  )
                }
              )}
            </tbody>
          </Table>
          
        </MyCard>
      }
      

    </div>
  )
}
