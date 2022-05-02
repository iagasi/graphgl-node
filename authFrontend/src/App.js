
import { useQuery } from '@apollo/client';
import jwtDecode from 'jwt-decode';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import { UserStateValue } from './context/globalContext';
import { LoginAction, UsersAction } from './context/userActions';
import { GETALL } from './http/Users';
import Routing from './Routing';

function App() {

  const { user, dispatch } = UserStateValue()
 


  let decoded
  const acessToken = localStorage.getItem("acessToken")

  if (acessToken && acessToken !== "null") {
    decoded = jwtDecode(acessToken)

    if (!decoded) {
      console.log("errrorr Token");
    }
  }


  useEffect(() => {
    if (decoded) { dispatch(LoginAction(decoded)) }
  }, [])

  return (
    <Routing>

    </Routing>
  );
}

export default App;
