import {useEffect} from 'react';
import {isEmpty} from 'lodash';
import Helmet from 'react-helmet';

import userActions from 'actions/userActions';
import {useAppSelector, useAppDispatch} from 'hooks';

import Navigation from 'components/Navigation';

interface Props {
  title: string;
  public?: boolean;
  children?: any;
}

function AppPage(props: Props) {
  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.user.current);

  useEffect(() => {
    if (!isAuthenticated()) dispatch(userActions.getCurrentUser());
  }, [user]);

  function isAuthenticated() {
    if (props.public) return true;
    return !isEmpty(user);
  }

  function getTitle() {
    return props.title ? `Expense Manager - ${props.title}` : 'Expense Manager';
  }

  function isReady() {
    return isAuthenticated();
  }

  function render() {
    if (!isReady()) return null;

    const title = getTitle();

    return (
      <div>
        <Helmet title={title} />

        {!props.public && <Navigation />}

        {props.children}
      </div>
    );
  }

  return render();
}

export default AppPage;
