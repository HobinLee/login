const END_POINT = 'http://localhost:3001';

const api = {
  fetchLogin: async (email, password) => {
    try {
      let loginData = {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        }
      };

      const res = await fetch(`${END_POINT}/login`, loginData);

      const data = await res.json();

      if (data.statusCode === 200) {
        return {
          isError: false,
          token: data.token,
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
  }
}

export default api;