import { useState } from 'react';
import axios from 'axios';
import NavigationBar from './components/NavigationBar';
import MyCard from './components/MyCard';
import MyForm from './components/MyForm';

export default function Login() {

  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');

  const handleChange = (e) => {
    switch(e.target.name){
      case 'email':
        updateEmail(e.target.value);
        break;
      case 'password':
        updatePassword(e.target.value);
        break;
      default:
        return;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/auth', {
        email,
        password
      });

      localStorage.setItem('token', res.data.token);

      updateEmail('');
      updatePassword('');

      window.location.replace('/');

    } catch (err) {
      console.error(err.msg);
    }
    
  }

  return (
    <div>
      <NavigationBar />
      <MyCard title={'Login'} text={'Fill in the following information'}>
        <MyForm 
          fieldList={
            [
              {
                name: 'email',
                controlId: 'email',
                label: 'Email',
                type: 'email',
                placeholder: 'Email',
                text: 'Enter email here',
                handleChange,
                value: email
              },
              {
                name: 'password',
                controlId: 'password',
                label: 'Password',
                type: 'password',
                placeholder: 'Password',
                text: 'Enter password here',
                handleChange,
                value: password
              }
            ]
          }
          button={
            {
              variant: 'primary',
              type: 'submit',
              text: 'Login',
              handleSubmit
            }
          }
        />
      </MyCard>
    </div>
  )
}
