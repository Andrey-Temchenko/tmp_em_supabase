interface User {
  email: string;
  profile: Profile;
}

interface Profile {
  local: Local;
  google: object;
  facebook: object;
}

interface Local {
  firstName: string;
  lastName: string;
  password: string;
  isActivated: boolean;
  activation: Activation;
  reset: Activation;
}

interface Activation {
  token: string;
  created: Date;
}
