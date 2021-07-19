import ftu from './ftu';
import auth from './auth';
import months from './months';
import colors from './colors';
import dashboard from './dashboard';
import collections from './collections';

export default {
  FTU: ftu,
  AUTH: auth,
  DASHBOARD: dashboard,
  COLLECTIONS: collections,
  ...months,
  ...colors,
  PHONE: 'phone number',
  EMAIL: 'email',
  NEXT: 'Next',
  OR: 'Or',
  AND_THE: 'and the',
  SEARCH: 'Search',
  YOU_HAVE: 'You have',
  AGO: 'ago',
  PRIVATE: 'Private',
  NOT_PRIVATE: 'Not private',
  FULLNAME: 'Full name',
  AGE: 'Age',
  GENDER: 'Gender',
  HAIR_COLOR: 'Hair color',
  EYE_COLOR: 'Eye color',
  MALE: 'Male',
  FEMALE: 'Female',
  YES: 'Yes',
  NO: 'No',
  DONT_KNOW: 'Don\'t know',
  CANCEL: 'Cancel',
};
