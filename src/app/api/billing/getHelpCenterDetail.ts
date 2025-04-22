import axios from 'axios';

export async function getHelpCenterDetail({ title }: { title: string }) {
  try {
    const resp = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/admin/help/${encodeURIComponent(title)}`
    );
    return resp.data;
  } catch (error) {
    console.error('Error fetching FAQ detail:', error);
    throw error;
  }
}
