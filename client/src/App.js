// React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// CSS for bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Application
import Home from './Home';
import CreateAccount from './CreateAccount';
import Login from './Login';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import Activity from './Activity';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="createaccount" element={<CreateAccount />} />
        <Route path="login" element={<Login />} />
        <Route path="deposit" element={<Deposit />} />
        <Route path="withdraw" element={<Withdraw />} />
        <Route path="activity" element={<Activity />} />
        
      </Routes>
    </BrowserRouter>

  );
}

export default App;
