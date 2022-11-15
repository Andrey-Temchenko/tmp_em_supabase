import {Nav, Navbar} from './bootstrap';
import {Link, useNavigate, useLocation} from 'react-router-dom';

import userActions from 'actions/userActions';
import {useAppSelector, useAppDispatch} from 'hooks';

import AppIcon from 'components/common/AppIcon';

function Navigation() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useAppSelector(state => state.user.current);

  async function onLogOut() {
    await dispatch(userActions.logOut());

    navigate('/login');
  }

  function render() {
    let userFullName = '';

    if (user && user.profile && user.profile.local) {
      const local = user.profile.local;

      userFullName = `${local.firstName} ${local.lastName}`;
    }

    const pathName = location.pathname;

    return (
      <Navbar bg="light" variant="light" expand="md">
        <Navbar.Brand className="ms-5" href="/">
          Expense Manager
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="ms-5">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/records" to="/records" active={pathName === '/records'}>
              Records
            </Nav.Link>

            <Nav.Link as={Link} href="/categories" to="/categories" active={pathName === '/categories'}>
              Categories
            </Nav.Link>
          </Nav>
          <Nav className="me-5">
            <span className="navbar-text" style={{marginRight: 20}}>
              Logged as: <b>{userFullName}</b>
            </span>

            <Nav.Link href="#" onClick={onLogOut}>
              LogOut <AppIcon icon="sign-out" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

  return render();
}

export default Navigation;
