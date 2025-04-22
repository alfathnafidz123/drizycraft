import axios from 'axios';

export async function getHelpCenter({ page = 1, limit = 10, search = '' }) {
  try {
    const resp = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/admin/help`, {
      params: { page, limit, search }
    });
    return resp.data;
  } catch (error) {
    console.error('Error fetching FAQ:', error);
    throw error;
  }
}
