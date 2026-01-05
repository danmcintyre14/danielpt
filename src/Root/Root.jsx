import { Outlet } from 'react-router-dom';
import Navigation from '../Components/Navigation/Navigation';
import CookieBanner from '../Components/CookieBanner/CookieBanner';

function Root() {
    return (
        <div>
            <CookieBanner />
            <Navigation />
            <Outlet />
        </div>

    );
};

export default Root;