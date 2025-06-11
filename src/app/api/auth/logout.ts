import axios from 'axios';

export async function logout() {
  try {
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      }
    );
    localStorage.removeItem('user_token');
    console.log('Logout successful:', resp.data);
    return resp.data;
  } catch (error) {
    console.error('Logout Error:', error);
    localStorage.removeItem('user_token');
    console.log('Logout Gagale');
    return { success: false, message: 'Logout gagal' };
  }
}
