import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Container, Row, Col, Button} from 'components/bootstrap';

import userActions from 'actions/userActions';
import {useAppDispatch} from 'hooks';

import validationHelper from 'helpers/validationHelper';
import uiHelper from 'helpers/uiHelper';

import AppIcon from 'components/common/AppIcon';
import TextInput from 'components/common/TextInput';

function SignUpPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({firstName: '', lastName: '', email: '', password: '', confirmPassword: ''});

  const [errors, setErrors] = useState({firstName: '', lastName: '', email: '', password: '', confirmPassword: ''});

  function onChange(field: string, value) {
    const newUser = {...user};

    newUser[field] = value;

    setUser(newUser);
  }

  function signUpFormIsValid() {
    const errors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    if (!user.firstName) {
      errors.firstName = 'First Name field is required.';
    }

    if (!user.lastName) {
      errors.lastName = 'Last Name field is required.';
    }

    if (!user.email) {
      errors.email = 'Email field is required.';
    } else if (!validationHelper.isValidEmail(user.email)) {
      errors.email = 'Email is not valid.';
    }

    if (!user.password) {
      errors.password = 'Password field is required.';
    }

    if (!user.confirmPassword) {
      errors.confirmPassword = 'Please confirm the password.';
    }

    if (user.password && user.confirmPassword && user.password !== user.confirmPassword) {
      errors.confirmPassword = 'Wrong password.';
    }

    setErrors(errors);

    return validationHelper.isEmptyErrorObject(errors);
  }

  async function onSignUp() {
    if (!signUpFormIsValid()) return;

    const response: AuthResponse = await dispatch(userActions.signUp(user));

    if (response?.message) {
      uiHelper.showMessage(response.message);

      navigate('/login');
    }
  }

  return (
    <Container>
      <Row>
        <Col sm={{span: 6, offset: 3}}>
          <h1 className="mb-3">
            <AppIcon icon="sign-in" /> Sign Up
          </h1>

          <TextInput
            name="firstName"
            label="First Name"
            value={user.firstName}
            onChange={onChange}
            placeholder="First Name"
            error={errors.firstName}
          />

          <TextInput
            name="lastName"
            label="Last Name"
            value={user.lastName}
            onChange={onChange}
            placeholder="Last Name"
            error={errors.lastName}
          />

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

          <TextInput
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={user.confirmPassword}
            onChange={onChange}
            placeholder="Confirm Password"
            error={errors.confirmPassword}
          />

          <Button variant="warning" size="lg" onClick={onSignUp}>
            Sign Up
          </Button>

          <hr />

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpPage;
