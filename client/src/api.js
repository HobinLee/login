const END_POINT = 'http://127.0.0.1:3001';

const api = {
  fetchLogin: async (email, password) => {
    try {
      let loginData = {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const res = await fetch(`${END_POINT}/login`, loginData);
      console.log(res);
      if (res.status === 200) {
        return {
          isError: false,
        }
      } else {
        const data = await res.json();
        return {
          isError: true,
          errorData: data,
        }
      }
    } catch (e) {
      return {
        isError: true,
        errorData: {
          message: e.message,
          statusCode: e.statusCode,
        }
      }
    }
  },
  
  fetchUser: async (token) => {
    try {
      let loginData = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
      };

      const res = await fetch(`${END_POINT}/user`, loginData);

      const data = await res.json();
      if (data.statusCode === 200) {
        return {
          isError: false,
          user: data.user,
        }
      } else {
        return {
          isError: true,
          errorData: data,
        }
      }
    } catch (e) {
      return {
        isError: true,
        errorData: {
          message: e.message,
          statusCode: e.statusCode,
        }
      }
    }
  },
  fetchInit: async () => {
    let loginData = {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const res = await fetch(`${END_POINT}/auth`, loginData);
    
    const data = await res.json();

    if (data.statusCode === 200) {
      return {
        isError: false,
        user: data.user,
      }
    } else {
      return {
        isError: true,
        message: data.message,
      }
    }
  },
  fetchLogout: async () => {
    let logoutData = {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await fetch(`${END_POINT}/logout`, logoutData);

    return;
  }
}

export default api;