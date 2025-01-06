'use client';

import { AxiosError } from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Slider, { CustomArrowProps } from "react-slick";
import { toast } from "react-toastify";

import { setOpenModal } from "@/lib/slices/user";
import { useAppDispatch, useAppSelector } from "@/lib/store";

import ModalProduct from "@/components/modals/product";
import NextImage from "@/components/NextImage";

import { itemPayment } from "@/app/api/billing/itemPayment";
import { productI } from "@/interfaces/product.interface";

import { cartProduct, sale } from "~/images";

const SaleProductCard = ({ data }: { data: productI; }) => {
  const router = useRouter();
  const dataUserState = useAppSelector(state => state.user);
  const activeSubcriptionState = useAppSelector(state => state.subs);
  const token = useMemo(() => {
    return dataUserState.token;
  }, [dataUserState.token]);
  const dataUser = useMemo(() => {
    return dataUserState.dataUser;
  }, [dataUserState.dataUser]);
  const activeSubcription = useMemo(() => {
    return activeSubcriptionState;
  }, [activeSubcriptionState]);
  const [isDiscount, setIsDiscount] = useState(false);
  const dispatch = useAppDispatch();
  const [showProductDetail, setShowProductDetail] = useState<{
    show: boolean;
    product?: productI;
  }>({ show: false });

  const CustomNextArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
    <div
      className='slick-arrow slick-next'
      style={{ right: '10px', zIndex: 1 }}
      onClick={onClick}
    >
      &gt;
    </div>
  );
  const CustomPrevArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
    <div
      className='slick-arrow slick-prev'
      style={{ left: '10px', zIndex: 1 }}
      onClick={onClick}
    >
      &lt;
    </div>
  );
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    autoplay: true,
  };

  useEffect(() => {
    if (data && data.discountPeriod) {
      setIsDiscount(moment(new Date(data.discountPeriod)).isAfter(new Date()));
    }
  }, [data]);

  const handleCart = async () => {
    setShowProductDetail({ show: true, product: data })
  };

  const generatePrice = (): string => {
    let price = `$0`;
    if (activeSubcription && dataUser?.coin && dataUser?.coin !== 0) {
      price = `${data?.coinPrice[0] ?? 0} Coin`;
    } else {
      if (isDiscount) {
        price = `$${data?.discount[0] ?? 0}`;
      } else {
        price = `$${data?.price[0] ?? 0}`;
      }
    }
    return price;
  };

  const handleDownload = async () => {
    try {
      if (token) {
        const payment = await itemPayment({
          productId: [data.id],
          licenseType: [0],
          affiliateId: [''],
          token: token,
        });
        window.location.replace(payment.data);
      } else {
        dispatch(setOpenModal(true));
      }
    } catch (error) {
      const err = error as AxiosError;
      const errorData: any = err.response?.data;
      toast.error(
        (errorData.message as string) ?? 'Error when generate payment!'
      );
    }
  };

  const handleCTA = async () => {
    if (
      (activeSubcription && data.coinPrice[0] === 0) ||
      (isDiscount && data.discount[0] === 0) ||
      data.price[0] === 0
    ) {
      if (token) {
        handleDownload();
      } else {
        dispatch(setOpenModal(true));
      }
    } else {
      router.push(`/product/${data?.meta?.[0].title}`);
    }
  };

  return (
    <>
      <div className='relative flex flex-col mt-8 h-full w-full rounded-2xl border-4 border-[#61A9FA] bg-white p-2 lg:mt-0 lg:w-3/12'>
        <Slider {...settings}>
          {data.imageUrl.map((url, i) =>
            <div className='slide' key={i.toString()}>
              <div className='!important flex h-full items-center justify-center'>
                <NextImage width={260} height={180} src={url} quality={60} alt={data.name} priority={i === 0} />
              </div>
            </div>
          )}
        </Slider>
        <h3 className='z-[2] w-full flex-grow overflow-hidden text-left text-base font-semibold leading-[17.6px] text-[#1a204c] self-start'>
          {data.name}
        </h3>
        <div className='mt-2 flex gap-2'>
          <button
            id='buy'
            aria-label='Buy product'
            className='flex h-[37px] flex-grow items-center justify-center rounded-[8px] bg-[#2a3b80]'
            onClick={handleCTA}
          >
            <span className='font-katide-bold z-[5] text-[20px] leading-[16px] text-white'>
              {generatePrice()}
            </span>
          </button>
          <button
            id='add-to-cart'
            className='flex h-[37px] items-center justify-center gap-[8px] rounded-[8px] border-2 border-gray-400 bg-white pb-[12px] pl-[24px] pr-[24px] pt-[12px]'
            onClick={handleCart}
          >
            <img src={cartProduct.src} alt='cart'></img>
          </button>
        </div>
        <div className='absolute left-1 top-[-50px]'>
          <img src={sale.src} alt='sale' />
        </div>
      </div>
      <ModalProduct
        isOpen={showProductDetail.show}
        product={showProductDetail.product}
        onClose={() => setShowProductDetail({ show: false })}
      />
    </>
  )
}

export default SaleProductCard;