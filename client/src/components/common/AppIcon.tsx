import {FontAwesomeIcon as FaIcon} from '@fortawesome/react-fontawesome';

//reduce bundle size by importing required icons only
import {faPlus, faTrashAlt, faPencilAlt, faSignInAlt, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {faQuestionCircle} from '@fortawesome/free-regular-svg-icons';

const unknownIcon = faQuestionCircle;

const map = {
  plus: faPlus,
  delete: faTrashAlt,
  edit: faPencilAlt,
  'sign-out': faSignOutAlt,
  'sign-in': faSignInAlt
};

interface Props {
  icon: string;
}

function AppIcon(props: Props) {
  let icon = unknownIcon;

  if (map[props.icon]) {
    icon = map[props.icon];
  }

  return <FaIcon {...props} icon={icon} />;
}

export default AppIcon;
