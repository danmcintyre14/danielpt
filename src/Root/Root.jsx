import { Outlet } from 'react-router-dom';
import Navigation from '../Components/Navigation/Navigation';

function Root() {
    return (
        <div>
            <Navigation />
            <Outlet />
        </div>

    );
};

export default Root;