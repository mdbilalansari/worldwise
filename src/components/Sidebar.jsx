import AppNave from './AppNav';
import Logo from './Logo';
import Footer from './Footer';
import styles from './Sidebar.module.css';
import { Outlet } from 'react-router-dom';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNave />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Sidebar;
