import { NavLink } from 'react-router-dom';
import logoBlack from '../../assets/Images/logoBlack.png';
import styles from './Navigation.module.css';

function Navigation() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <img alt='logoBlack' src={logoBlack} />
            </div>
            <ul className={styles.navLinks}>
                <li>
                    <NavLink to="/homePage">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/membersPage">Members</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
