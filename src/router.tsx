import {
    BrowserRouter, Route
} from 'react-router-dom'
import HomePage from './pages/HomePage/index'
import LoginPage from './pages/LoginPage/index'
import RegisterPage from './pages/RegisterPage/index'
import AccessLevelControl from './pages/ACL/index';
import PageContext from './context/index'
import Header from './components/Header/index';
import InfoModal from './components/InfoModal/index'
import './index.css'


const Router = () => {
    return (
        <PageContext>
            <Header />
            <BrowserRouter>
                <InfoModal />
                <AccessLevelControl>
                    <Route path='/' component={HomePage} exact/>
                </AccessLevelControl>
                <Route path='/login' component={LoginPage} exact/>
                <Route path='/register' component={RegisterPage} exact/>
            </BrowserRouter>
        </PageContext>
    )
}

export default Router