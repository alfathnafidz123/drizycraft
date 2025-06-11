import axios from 'axios';

interface LoginPayload {
  payload: string;
  password: string;
}

export async function login(loginPayload: LoginPayload) {
  try {
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/login`,
      loginPayload
    );

    const { token } = resp.data;
    console.log('Login successful, token:', token);

    // Kirim ke tab lain (misalnya 3000)
    localStorage.setItem('user_token', token);

    return resp.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}
