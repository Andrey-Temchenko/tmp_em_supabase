import {useState, useEffect} from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {Container, Row, Col, Button} from 'components/bootstrap';

import userActions from 'actions/userActions';
import {useAppDispatch} from 'hooks';

import validationHelper from 'helpers/validationHelper';
import uiHelper from 'helpers/uiHelper';

import TextInput from 'components/common/TextInput';

function PasswordResetPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {hash} = useLocation();

  const [userData, setUserData] = useState({password: '', confirmPassword: '', token: '', refreshToken: ''});

  const [errors, setErrors] = useState({password: '', confirmPassword: ''});

  useEffect(() => {
    if (!hash) return;

    const parsedHash = new URLSearchParams(hash.substring(1));

    const token = parsedHash.get('access_token');
    const refreshToken = parsedHash.get('refresh_token');

    if (token && refreshToken) {
      setUserData({...userData, token, refreshToken});
    }
  }, [hash]);

  function onChange(field: string, value) {
    const user = {...userData};

    user[field] = value;

    setUserData(user);
  }

  function resetFormIsValid() {
    const errors = {
      password: '',
      confirmPassword: ''
    };

    if (!userData.password) {
      errors.password = 'Password field is required.';
    }

    if (!userData.confirmPassword) {
      errors.confirmPassword = 'Please confirm the password.';
    }

    if (userData.password && userData.confirmPassword && userData.password !== userData.confirmPassword) {
      errors.confirmPassword = 'Wrong password.';
    }

    setErrors(errors);

    return validationHelper.isEmptyErrorObject(errors);
  }

  async function onResetPassword() {
    if (!resetFormIsValid()) return;

    const response: AuthResponse = await dispatch(userActions.resetPassword(userData));

    if (response?.message) {
      uiHelper.showMessage(response.message);

      navigate('/login');
    }
  }

  return (
    <Container>
      <Row>
        <Col sm={{span: 6, offset: 3}}>
          <h1 className="mb-3">Reset Password</h1>

          <TextInput
            name="password"
            label="New Password"
            type="password"
            value={userData.password}
            onChange={onChange}
            placeholder="New password"
            error={errors.password}
          />

          <TextInput
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={userData.confirmPassword}
            onChange={onChange}
            placeholder="Confirm password"
            error={errors.confirmPassword}
          />

          <Button variant="warning" size="lg" onClick={onResetPassword}>
            Save Password
          </Button>

          <hr />

          <p>
            Redirect to login page: <Link to="/login">Login</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default PasswordResetPage;
