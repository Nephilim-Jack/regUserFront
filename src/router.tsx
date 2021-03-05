import {
    BrowserRouter, Route
} from 'react-router-dom'
import HomePage from './pages/HomePage/index'
import LoginPage from './pages/LoginPage/index'
import AccessLevelControl from './pages/ACL/index';
import PageContext from './context/index'
import Header from './components/Header/index';


const Router = () => {
    return (
        <PageContext>
            <Header />
            <BrowserRouter>
            <AccessLevelControl>
                <Route path='/' component={HomePage} exact/>:
            </AccessLevelControl>
            <Route path='/login' component={LoginPage} exact/>
            </BrowserRouter>
        </PageContext>
    )
}

export default Router