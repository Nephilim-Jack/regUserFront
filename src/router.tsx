import {
    BrowserRouter, Route
} from 'react-router-dom'
import HomePage from './pages/HomePage/index'


const Router = () => {
    return (
        <BrowserRouter>
            <Route path='/' component={HomePage} exact/>
        </BrowserRouter>
    )
}

export default Router