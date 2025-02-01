import { Suspense } from 'react';

import { getInitialData } from '@/lib/getCrafterData';

import CatalogCrafterClient from '@/app/catalog-crafter/CatalogCrafterClient';

export default async function CatalogCrafter() {
  const initialData = await getInitialData();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CatalogCrafterClient initialData={initialData} />
    </Suspense>
  );
}

