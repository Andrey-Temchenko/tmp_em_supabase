import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Container, Row, Col, Button} from 'components/bootstrap';
import {isEmpty} from 'lodash';

import userActions from 'actions/userActions';
import {useAppSelector, useAppDispatch} from 'hooks';

import validationHelper from 'helpers/validationHelper';

import AppIcon from 'components/common/AppIcon';
import TextInput from 'components/common/TextInput';

function LoginPage() {
  const currentUser = useAppSelector(state => state.user.current);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({email: '', password: ''});

  const [errors, setErrors] = useState({email: '', password: ''});

  useEffect(() => {
    if (!isEmpty(currentUser)) navigate('/');
  });

  function onChange(field: string, value) {
    const newUser = {...user};

    newUser[field] = value;

    setUser(newUser);
  }

  function loginFormIsValid() {
    const errors = {
      email: '',
      password: ''
    };

    if (!user.email) {
      errors.email = 'Email field is required.';
    } else if (!validationHelper.isValidEmail(user.email)) {
      errors.email = 'Email is not valid.';
    }

    if (!user.password) {
      errors.password = 'Password field is required.';
    }

    setErrors(errors);

    return validationHelper.isEmptyErrorObject(errors);
  }

  async function login(e) {
    if (e) e.preventDefault();

    if (!loginFormIsValid()) return;

    const isSuccess: boolean = await dispatch(userActions.loginUser(user));

    if (isSuccess) {
      await dispatch(userActions.getCurrentUser());

      if (!isEmpty(user)) navigate('/records');
    }
  }

  return (
    <Container>
      <Row>
        <Col sm={{span: 6, offset: 3}}>
          <h1 className="mb-5">
            <AppIcon icon="sign-in" /> Login
          </h1>

          <form onSubmit={login}>
            <TextInput
              name="email"
              label="Email"
              type="email"
              value={user.email}
              onChange={onChange}
              placeholder="Email"
              error={errors.email}
            />

            <TextInput
              name="password"
              label="Password"
              type="password"
              value={user.password}
              onChange={onChange}
              placeholder="Password"
              error={errors.password}
            />

            <Button variant="warning" size="lg" type="submit" onClick={login}>
              Login
            </Button>
          </form>

          <hr />

          <Link to="/password-forgot">Forgot your password?</Link>

          <hr />

          <p>
            Need an account? <Link to="/sign-up">Sign Up</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
