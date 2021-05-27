import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from './components/Main/Main';
import Room from './components/Room/Room'
import styled from 'styled-components';
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import {useDispatch, useSelector} from "react-redux";
// import {auth} from './actions/user';

function App() {
    const isAuth = useSelector(state => state.user.isAuth);
    const dispatch = useDispatch();

    // useEffect( () => {
    //     (async () => {
    //         await dispatch(await auth())
    //     })()
    // }, [])

    return (
        <BrowserRouter>
            <AppContainer>
                {!isAuth && <Switch>
                    <Route exact path="/" component={SignIn} />
                    <Route exact path="/registration" component={SignUp} />
                </Switch>}
                {isAuth && <Switch>
                    <Route exact path="/" component={Main} />
                    <Route exact path="/room/:roomId" component={Room}/>
                </Switch>}
            </AppContainer>
        </BrowserRouter>
    );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  font-size: calc(8px + 2vmin);
  color: white;
  background-color: #454552;
  text-align: center;
`;

export default App;
