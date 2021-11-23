import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { getAccount } from '../util/api';

export default function NavigationBar() {
  
  // const loginStatus = localStorage.getItem('token') !== null;
  // // const account = JSON.parse(localStorage.getItem('account'));
  // const accountEmail = localStorage.getItem('account-email');

  // console.log(accountEmail);

  const [account, updateAccount] = useState();

  useEffect( () => {
    async function fetchData() {
      updateAccount(await getAccount());
    }
    fetchData();
  }, []);

  const handleLogout = () => {

    delete axios.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
    updateAccount();

  }

  const checkLoginStatus = () => {
    if(!account){
      return loggedOutLinks;
    } else return loggedInLinks;
  }

  const loggedOutLinks = (
    <>
      <Nav.Link href="createaccount">Create Account</Nav.Link>
      <Nav.Link href="login">Login</Nav.Link>
    </>
  );

  const loggedInLinks = (
    <>
      <Nav.Link href='deposit' >Deposit</Nav.Link>
      <Nav.Link href='withdraw' >Withdraw</Nav.Link>
      <Nav.Link href='activity' >Activity</Nav.Link>
      <Nav.Link href='/' onClick={handleLogout}>Logout</Nav.Link>
    </>
  )

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">BANKR</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {checkLoginStatus()}
            </Nav>
          </Navbar.Collapse>
          {account && 
            <p>Logged in as <strong>{account.email}</strong></p>
          }
        </Container>
      </Navbar>
    </div>
  )
}
