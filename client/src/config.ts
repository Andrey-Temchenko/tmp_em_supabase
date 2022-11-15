const isDevLocal = process.env.NODE_ENV !== 'production';

export default {
  isDevLocal,
  baseUrl: process.env.REACT_APP_BASE_URL,
  format: {
    date: 'dd/MM/yyyy',
    datePicker: 'd/m/Y'
  }
};
