import Cookies from 'js-cookie';

function lsTest() {
  const test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

export default function (state = null, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    // check for localStorage support. Fallback to cookies if not;
      if (lsTest() === true) {
        localStorage.setItem('profile', JSON.stringify(action.payload));
        return JSON.parse(localStorage.getItem('profile'));
      }
      else {
        Cookies.set('profile', JSON.stringify(action.payload));
        return JSON.parse(Cookies.get('profile'));
      }
    case 'LOGOUT':
      console.log('LOGOUT FIRING');
      localStorage.setItem('profile', JSON.stringify(null));
      Cookies.set('profile', JSON.stringify(null));
      return null;
    default:
      if (localStorage.profile) return JSON.parse(localStorage.profile);
      if (Cookies.get('profile')) {
        return JSON.parse(Cookies.get('profile'));
      }
      return state;
  }
}
