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

    return resp.data;
  } catch (error) {
    console.error('Logout Error:', error);
    return { success: false, message: 'Logout gagal' };
  }
}
