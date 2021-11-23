import { useState } from 'react';
import axios from 'axios';
import NavigationBar from './components/NavigationBar';
import MyCard from './components/MyCard';
import MyForm from './components/MyForm';

export default function CreateAccount({ state, updateState }) {

  const [name, updateName] = useState('');
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');

  const handleChange = (e) => {
    switch(e.target.name){
      case 'name':
        updateName(e.target.value);
        break;
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
      const res = await axios.post('/api/accounts', {
        name,
        email,
        password
      });

      localStorage.setItem('token', res.data.token);

      updateName('');
      updateEmail('');
      updatePassword('');
  
      window.location.replace('/');
    } catch (err) {
      console.error(err.message);
    }
    

  }

  return (
    <div>
      <NavigationBar />
      <MyCard title={'Create Account'} text={'Fill in the following information'}>
        <MyForm 
          fieldList={
            [
              {
                name: 'name',
                controlId: 'name',
                label: 'Name',
                type: 'text',
                placeholder: 'Name',
                text: 'Enter name here',
                handleChange,
                value: name
              },
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
              text: 'Create Account',
              handleSubmit
            }
          }
        />
      </MyCard>
    </div>
  )
}
