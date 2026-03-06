// page.tsx (SERVER)
import ClientPage from './client-page';
import { getProductById } from '@/app/api/product/getProductById';
import { useParams } from 'next/navigation';
import ErrorBoundary from '@/components/ErrorBoundary';
import AffiliateBanner from '@/components/AffiliateBanner';

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const productData = await getProductById({ title: params.id as string });

  return (
    <main>
      {/* Client logic */}
      <ErrorBoundary>
        <ClientPage productData={productData.data} />
      </ErrorBoundary>
      <AffiliateBanner />
    </main>
  );
}
