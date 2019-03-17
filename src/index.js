import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import reducers from './redux/reducer';
import Login from './container/Login';
import Register from './container/Register';
import AuthRouter from './component/AuthRouter';
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRouter/>
                <Route path='/login' component={Login}></Route>
                <Route path='/regist' component={Register}></Route>
            </div>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));

