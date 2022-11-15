import {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Container, Row, Col} from 'components/bootstrap';

import userActions from 'actions/userActions';
import {useAppDispatch} from 'hooks';

import * as styled from './ActivationPage.styled';

function ActivationPage() {
  const dispatch = useAppDispatch();

  const {token} = useParams();

  const [activationData, setActivationData] = useState<ActivationResponse>({message: '', status: ''});

  useEffect(() => {
    activateAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function activateAccount() {
    const data: ActivationResponse = await dispatch(userActions.activateUserAccount(token));

    if (data) setActivationData(data);
  }

  const status = activationData.status;

  return (
    <Container>
      <Row>
        <Col sm={{span: 6, offset: 3}}>
          <h1 className="mb-3">Activation Page</h1>

          <br />

          {activationData.message && (
            <styled.alert
              className="alert"
              isSuccess={status === 'success'}
              isWarning={status === 'warning'}
              isError={status === 'error'}>
              {activationData.message}
            </styled.alert>
          )}

          <hr />

          <p>
            Redirect to login page: <Link to="/login">Login</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default ActivationPage;
