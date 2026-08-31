// app/product/[id]/opengraph-image.tsx

import { ImageResponse } from 'next/og';
import { ResArticleMetadata } from '@/interfaces/article.interfaces';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Drizy Craft Product';
export const runtime = 'edge';
export const revalidate = 3600;

type Props = {
  params: { id: string };
};

export default async function Image({ params }: Props) {
  const { id } = params;

  let title = 'Premium SVG Cut File';
  let productImageUrl: string | null = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/product/meta/${id}`,
      { next: { revalidate: 3600 } }
    );
    if (res.ok) {
      const data: ResArticleMetadata = await res.json();
      title = data?.data?.realTitle || title;
      productImageUrl = data?.data?.image || null;
    }
  } catch {
    // fallback ke design tanpa gambar
  }

  const displayTitle =
    title.length > 60 ? `${title.slice(0, 57)}...` : title + " | Drizy Craft";

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          backgroundColor: '#0f0f0f',
          fontFamily: 'sans-serif',
          overflow: 'hidden',
        }}
      >
        {/* Gambar produk full background — rasio 3:2 akan di-cover ke 1200x630 */}
        {productImageUrl && (
          <img
            src={productImageUrl}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        )}

        {/* Overlay gradient — gelap di bawah supaya teks terbaca,
            transparan di atas supaya gambar tetap terlihat jelas */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: productImageUrl
              ? 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.75) 70%, rgba(0,0,0,0.92) 100%)'
              : 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)',
            display: 'flex',
          }}
        />

        {/* Konten overlay — brand di atas, title + badge di bawah */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '40px 56px',
          }}
        >
          {/* Brand — pojok kiri atas */}
          <div style={{ display: 'flex' }}>

          </div>

          {/* Bagian bawah: title + badges + domain */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Title produk */}
            <div
              className='font-katide-bold'
              style={{
                fontSize: 48,
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.2,
                marginBottom: 20,
                textShadow: '0 2px 12px rgba(0,0,0,0.6)',
              }}
            >
              {displayTitle}
            </div>

            {/* Badges + domain dalam satu baris */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >

              {/* Badge Instant Download */}
              <div
                style={{
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  color: '#e5e5e5',
                  fontSize: 13,
                  fontWeight: 600,
                  padding: '7px 16px',
                  borderRadius: 6,
                  marginRight: 20,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                Instant Download
              </div>

              {/* Separator + domain */}
              <div
                style={{
                  color: 'rgba(255,255,255,0.45)',
                  fontSize: 13,
                  letterSpacing: 1,
                }}
              >
                drizycraft.com
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}