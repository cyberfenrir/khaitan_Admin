export const login = async (email, password) => {
    const response = await fetch('http://localhost:3001/api/v1/users/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) {
      throw new Error('Login failed');
    }
  
    return response.json();
  };
  
  export const signUp = async (name, email, password, phoneNumber, roleId) => {
    const response = await fetch('http://localhost:3001/api/v1/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, phoneNumber, roleId }),
    });
  
    if (!response.ok) {
      throw new Error('Sign-up failed');
    }
  
    return response.json();
  };