// page.tsx (SERVER)
import ClientPage from './client-page';
import { getProductById } from '@/app/api/product/getProductById';
import { useParams } from 'next/navigation';
import ErrorBoundary from '@/components/ErrorBoundary';
import AffiliateBanner from '@/components/AffiliateBanner';
import ProductJsonLD from '@/components/SEOJsonLD';
import BreadcrumbJsonLD from '@/components/BreadcrumbJsonLD';

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const productData = await getProductById({ title: params.id as string });

  return (
    <main>
      {/* Client logic */}
      <ErrorBoundary>
        <ProductJsonLD product={productData.data} />
        <BreadcrumbJsonLD
          items={[
            { name: 'Home', url: '/' },
            { name: 'Catalog', url: '/catalog-crafter' },
            { name: productData.data.realTitle, url: `/product/${params.id}` },
          ]}
        />
        <ClientPage productData={productData.data} />
      </ErrorBoundary>
      <AffiliateBanner />
    </main>
  );
}
