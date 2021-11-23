import axios from 'axios';

export const getAccount = async () => {
  if(!localStorage.getItem('token')) return;

  try {
    axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
    const res = await axios.get('/api/auth');
    return res.data.account;
  } catch (err) {
    console.error(err.msg);
  }
}

export const getTransactions = async () => {
  if(!localStorage.getItem('token')) return;

  try {
    axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
    const res = await axios.get('/api/transactions');
    return res.data;
  } catch (err) {
    console.error(err.msg);
  }
}