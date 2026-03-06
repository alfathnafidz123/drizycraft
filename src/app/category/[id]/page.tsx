// page.tsx (SERVER)
import CatalogCrafter from './client-page';
import { getProductById } from '@/app/api/product/getProductById';
import { useParams } from 'next/navigation';
import ErrorBoundary from '@/components/ErrorBoundary';
import AffiliateBanner from '@/components/AffiliateBanner';

type Props = {
  params: { id: string };
};

export default async function Page() {

  return (
    <main>
      <h1 className="sr-only">
        Premium Craft SVG Cut Files for Cricut and Silhouette
      </h1>
      <h2 className="sr-only">
        SVG Files for Cricut, Silhouette, Laser Cut, and CNC Machines
      </h2>

      <h2 className="sr-only">
        Premium 3D SVG Cut Files for Craft Projects and Digital Products
      </h2>
      {/* Client logic */}
      <ErrorBoundary>
        <CatalogCrafter/>
      </ErrorBoundary>
      <AffiliateBanner />
    </main>
  );
}
