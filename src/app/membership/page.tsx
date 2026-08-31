/* eslint-disable @next/next/no-img-element */
'use client';
import Image from 'next/image';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '@/lib/store';

import SectionContainer from '@/components/container/sectionContainer';
import dynamic from 'next/dynamic';
import localFont from 'next/font/local';
import { useCallback, useEffect, useRef, useState } from 'react';

import { setOpenModal } from '@/lib/slices/user';

import AffiliateBanner from '@/components/AffiliateBanner';
import PixelEventsHooks, {
  EventsEnum,
  RedditEventsEnum,
} from '@/components/pixel-custom-events';

import { subscriptionPayment } from '@/app/api/billing/subscriptionPayment';

import {
  bannerMembershipNew,
  bgBannerMembershipNew,
  checkblue,
  crossMember,
  drizzyCoin,
  member1,
  member2,
  member3,
  membership1,
  membership2,
  membership3,
  membership4,
  membershipProduct1,
  membershipProduct2,
  membershipProduct3,
  membershipProduct4,
  membershipProduct5,
  membershipProduct6,
  vip,
} from '~/images';
import { SubsTransactionResI } from '@/interfaces/transaction.interfaces';
import { useRouter } from 'next/navigation';
import NextImage from '@/components/NextImage';
import { getAllProduct, SortType } from '@/app/api/product/getProduct';
import { productI } from '@/interfaces/product.interface';
import Testimonies from '@/components/testimonies';
import SupportUsModal from '@/components/modals/SupportUsModal';
// const myFont = localFont({ src: '../../../public/fonts/Hastle.woff2' });
const myFont = localFont({ src: '../../../public/fonts/Hastle.woff2' });

const CustomerSupportLottie = dynamic(
  () => import('../../components/lottie/customer-support'),
  { ssr: false }
);

export default function Membership() {
  const router = useRouter();

  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { trackEvent } = PixelEventsHooks();
  const subscriptionPlans = [
    {
      duration: 'BASIC 1 MONTH',
      buttonText: 'UNLOCK NOW !',
      price: '$3.99/mo',
      discount: '$30',
      extra: undefined,
      additional: 'First Month Only',
      text: '<p><br />Get unlimited access to <strong>all premium assets.</strong> Unleash boundless crafting joy, as effortless as drag-and-drop onto your beloved cutting, laser & sublimation machines. Commercial and POD license included. Cancel anytime <br /><br /></p>',
      coin: (
        <p className='text-sm'>
          <span className='font-katide-semibold'>50 Drizy Coins</span> to all
          premium products
        </p>
      ),
      features: [
        { title: 'Daily SVG Updates', desc: 'always something new to explore' },
        { title: 'Breezy Mode', desc: 'seamless creations with drag & drop' },
        {
          title: 'Machine Compatibility',
          desc: 'works seamlessly with cutting, laser, and sublimation devices',
        },
        {
          title: 'Custom Designs on Request',
          desc: 'chat with our team for unique creations',
        },
        {
          title: 'Full License Coverage',
          desc: 'includes commercial and POD licensing',
        },
      ],
      exclude: [
        {
          title: 'Business Assistance',
          desc: 'tools and support to elevate your project',
        },
        {
          title: 'Premium Support',
          desc: 'priority access to our dedicated artist team',
        },
      ],
      priceId: process.env.NEXT_PUBLIC_PRICE_MONTHLY,
    },
  ];
  const [showChat, setShowChat] = useState(false);
  const refChat = useRef<any>();
  const [showSupportModal, setShowSupportModal] = useState(false);

  useEffect(() => {
    const handleClick = (event: any) => {
      if (refChat.current && !refChat.current.contains(event.target)) {
        setShowChat(false);
      }
    };
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [showChat]);

  // Handle subscription 
  const handleSubscribe = async (priceId: string, token: string, membership: string) => {
    try {
      if (!token) {
        dispatch(setOpenModal(true));
        return;
      }

      // Cek transaksi dulu
      const params = { page: 1, limit: 10 }
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/get-subs-transaction`,
        { headers: { Authorization: `bearer ${token}` }, params }
      );

      const transactionData = res.data as SubsTransactionResI;

      // Cek apakah sudah pernah ambil Free Trial
      const alreadyUsedTrial = transactionData.data.some(
        (trx) =>
          trx.name?.toLowerCase() === 'free trial' && trx.status === 'success'
      );

      if (alreadyUsedTrial && membership?.toLowerCase().includes("7")) {
        toast.error('You have already used the Free Trial. Please choose another plan.');
        return;
      }

      // Lanjut proses checkout
      const data = await subscriptionPayment({
        priceId: priceId as string,
        token: token,
        membership: membership,
      });
      localStorage.setItem('checkoutSession', JSON.stringify(data));

      await trackEvent(EventsEnum.InitCheckoutMembership, {
        priceId: priceId as string,
        membership,
      });

      window.location.replace(data.data);

      await trackEvent(EventsEnum.AddPaymentInfo, {
        paymentMethod: "Stripe",
        membership,
      });
      await trackEvent(EventsEnum.Lead, {
        paymentMethod: "Stripe",
        membership,
      });
      await trackEvent(RedditEventsEnum.Lead);

    } catch (error: any) {
      toast('Create Checkout Page failed, please reach out to the administrator');
    }
  };


  // Product Carousel Images
    const [productData, setProductData] = useState<any[]>([]);
    const getProduct = useCallback(async () => {
        try {
            const response = await axios.get(
                `https://api.drizycraft.com/crafter/product`,
                {
                    params: {
                        page: 1,
                        limit: 10,
                        sortType: SortType.Latest,
                        category: "Drizy Atelier",
                        extraCategory: "",
                    },
                }
            );

            setProductData(response.data.data);
        } catch (error) {
            console.error(error);
            toast("Error when trying to get all products");
        }
    }, []);

    useEffect(() => {
    getProduct();
  }, []);

  // const productsMembership = [
  //   { id: 1, image: membershipProduct1 },
  //   { id: 2, image: membershipProduct2},
  //   { id: 3, image: membershipProduct3,},
  //   { id: 4, image: membershipProduct4,},
  //   { id: 5, image: membershipProduct5,},
  //   { id: 6, image: membershipProduct6,},
  // ];


  interface Feature {
    src: string;
    srcActive: string;
    alt: string;
  }

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Data video carousel
  const carouselVideos: string[] = [
    '/images/gifDrizyBreezy.webm',
    '/images/gifProject.webm',
    '/images/gifCommunity.webm',
    '/images/gifPartner.webm',
  ];

  // Data fitur gambar
  const features: Feature[] = [
    { src: '/images/feature1.png', alt: 'Feature 1', srcActive: '/images/feature1_active.png' },
    { src: '/images/feature2.png', alt: 'Feature 2', srcActive: '/images/feature2_active.png' },
    { src: '/images/feature3.png', alt: 'Feature 3', srcActive: '/images/feature3_active.png' },
    { src: '/images/feature4.png', alt: 'Feature 4', srcActive: '/images/feature4_active.png' },
  ];


  const featureDescriptions = [
    {
      title: "Drizy Breezy",
      description:
        "Drizy Breezy simplifies crafting with its intuitive drag-and-drop tool. Customize SVG designs, rearrange elements, and create stunning projects effortlessly. Whether you're a beginner or a pro, this feature makes designing quick, easy, and fun.",
      link: `https://breezy.drizycraft.com?token=${token}`,
      showButton: true,
      buttonText: "Click here",
    },
    {
      title: "Projects from Crafters",
      description:
        "Explore an inspiring collection of crafting projects created by crafters worldwide. Each project includes tips, ideas, and guidance to help you create something amazing or spark your next big idea.",
      link: "https://www.drizycraft.com/project",
      showButton: true,
      buttonText: "Browse Projects",
    },
    {
      title: "Largest Craft Community",
      description:
        "Be part of the largest crafting community where creativity thrives. Share your projects, gain valuable feedback, and connect with fellow crafters to collaborate and grow together.",
      link: "https://www.facebook.com/groups/drizyfreebies",
      showButton: true,
      buttonText: "Join Community",
    },
    {
      title: "Exclusive Partners",
      description:
        "Unlock access to exclusive content from leading brands and designers. Enjoy premium SVG designs, special tools, and unique deals to elevate your crafting experience.",
      link: "",
      showButton: false,
      buttonText: "",
    },
  ];

  // Membuat peta video berdasarkan indeks fitur
  const videoMap: { [key: number]: number } = {
    0: 0, // fitur 1 -> gifDrizyBreezy
    1: 1, // fitur 2 -> gifProject
    2: 2, // fitur 3 -> gifPartner
    3: 3, // fitur 4 -> gifCommunity
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselVideos.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselVideos.length]);


  return (
    <main>
        {/* Main Membership Content  */}
        <section className='relative'>
            <div className="absolute inset-0 w-full h-full -top-12">
                <NextImage
                    src={bgBannerMembershipNew.src} // ubah sesuai gambar kamu
                    alt="Background pattern"
                    layout='fill'
                    className="object-cover object-center"
                />
            </div>
            <div className="flex flex-col justify-between max-md:gap-14 lg:flex-row mx-auto py-4 lg:py-20 gap-24 px-6 lg:px-0 max-w-[1264px] ">
                <div className='flex-col z-10 text-center md:text-left'>
                    <h1 className='font-katide-extrabold text-[36px] md:text-[52px] leading-normal lg:leading-[65px] text-[#1A214C]'>
                      DOWNLOAD THE <span className='inline-flex items-center text-[#EE4C73] bg-[#C2E5FF] rounded-full px-5 leading-[60px] me-1'>DESIGN </span>
                      YOU LOVE.
                    </h1>
                    <p className='font-katide-regular mt-6 text-[16px] text-[#555555]'>
                      Buy the SVGs you need, whenever you need them. Or go for Unlimited downloads and full access to everything, your choice.
                    </p>
                    <div className='mt-6 flex flex-row justify-center lg:justify-between'>
                      <a
                        className="bg-[#EE4C73] h-12 w-[180px] text-[16px] text-center text-white px-6 py-2
                         rounded-full font-semibold shadow-md hover:bg-blue-700 transition-all
                         flex items-center justify-center"
                        href="#price"
                      >
                        GET EXCLUSIVE
                      </a>

                    </div>
                </div>
                <Image src={bannerMembershipNew.src} className='rounded-xl z-10' alt="banner" width={600} height={50} />
            </div>

        </section>

        {/* Card Membership  */}
        {/*<section id='price' className='flex flex-col scroll-mt-40 items-center justify-center text-[#1A214C] pt-10'>*/}
        {/*    <div className='flex w-full flex-col items-center text-[#1A214C] lg:max-w-[1264px]'>*/}
        {/*      <div className='relative flex flex-col flex-wrap items-center justify-center rounded-lg lg:border border-[#1A214C] p-2 lg:p-12 mb-12 sm:border-0' style={{ borderRadius: '24px' }}>*/}
        {/*        /!* Badge Image at Top *!/*/}
        {/*        <div className='absolute -top-3 left-0 flex w-full justify-center'>*/}
        {/*          <div className='absolute -top-7 left-1/2 transform -translate-x-1/2'>*/}
        {/*            <Image src={vip.src} alt='Cov Product' width={235} height={78} className="z-10" />*/}
        {/*          </div>*/}
        {/*        </div>*/}

        {/*        /!* Subscription Plan Cards *!/*/}
        {/*        <div className='flex w-full flex-col justify-center lg:flex-row gap-10 lg:gap-9 max-lg:px-8 mt-8 lg:mt-8'>*/}
        {/*          {subscriptionPlans.map((plan, index) => (*/}
        {/*            <div*/}
        {/*              key={index}*/}
        {/*              className={`rounded-2xl shadow-2xl shadow-[#00000033] max-md:min-h-[400px] max-md:w-[280px] lg:!min-h-[1020px] lg:w-1/4 relative group border-white hover:border-[#EE4C73] transition-all max-sm:p-2 max-sm:shadow-2xl ${*/}
        {/*                plan.duration === "ANNUAL ACCESS"*/}
        {/*                  ? "bg-[#C2E5FF] mt-14 lg:mt-0"*/}
        {/*                  : plan.duration === "BASIC 1 MONTH"*/}
        {/*                    ? "bg-[#E4F6FB]"*/}
        {/*                    : "bg-white"*/}
        {/*              }`}*/}
        {/*            >*/}

        {/*              /!* Header Style Color *!/*/}
        {/*              {plan.duration === "ANNUAL ACCESS" && (*/}
        {/*                <div className='bg-[#61A9FA] w-full h-36 absolute top-0 left-0 rounded-t-2xl' />*/}
        {/*              )}*/}
        {/*              {plan.duration === "0" && (*/}
        {/*                <div className='bg-[#61A9FA] w-full h-36 absolute top-0 left-0 rounded-2xl' />*/}
        {/*              )}*/}

        {/*              /!* Best Value Badge *!/*/}
        {/*              {plan.duration === "ANNUAL ACCESS" && (*/}
        {/*                <div className='bg-[#FFBB3C] w-full h-36 absolute -top-14 left-0 rounded-2xl -z-10 text-center pt-2 flex flex-col'>*/}
        {/*                  <span className='font-katide-bold text-[#61657D] tracking-widest h-5'>LIMITED TIME !</span>*/}
        {/*                  <span className='font-katide-heavy text-lg text-[#1A214C]'>SAVE 75%</span>*/}
        {/*                </div>*/}
        {/*              )}*/}

        {/*              /!* <div className={`flex flex-col rounded-2xl p-2 lg:p-6 z-10 w-full ${plan.duration === "ANNUAL ACCESS" ? "absolute bg-transparent" : ""}`}> *!/*/}
        {/*              <div className="flex flex-col rounded-2xl p-2 lg:p-6 z-10 w-full">*/}
        {/*                <div className='flex flex-col items-center gap-4 rounded-2xl border border-[#DDDDDD] bg-[#F8F8FA] pt-4 h-[274px] relative'>*/}
        {/*                  <p className='w-5/6 rounded-xl bg-[#1A214C] py-2 text-center text-white whitespace-nowrap'>*/}
        {/*                    {plan.duration}*/}
        {/*                  </p>*/}

        {/*                  {plan.price === 'Free Trial' ? (*/}
        {/*                    <div className='rounded-xl w-full h-2/4 flex justify-center items-center'>*/}
        {/*                      <div className='flex flex-col items-center gap-3 text-center'>*/}
        {/*                        <div className='font-katide-heavy text-[40px] text-[#1A214C]'>*/}
        {/*                          {plan.price}*/}
        {/*                        </div>*/}
        {/*                      </div>*/}
        {/*                    </div>*/}
        {/*                  ) : (*/}
        {/*                    <div className='rounded-[20px] bg-[#EBECF5] p-3.5'>*/}
        {/*                      <div className='flex flex-row items-center gap-1'>*/}
        {/*                        <div className='font-katide-heavy text-[48px] text-[#1A214C]'>*/}
        {/*                          {plan.price.split('.')[0]}*/}
        {/*                        </div>*/}
        {/*                        <div className='flex flex-col'>*/}
        {/*                          <p className='font-katide-semibold text-base text-[#1A214C]'>*/}
        {/*                            .{plan.price.split('.')[1].split('/')[0]}*/}
        {/*                          </p>*/}
        {/*                          <p className='font-katide-regular text-base text-[#1A214C]'>*/}
        {/*                            /{plan.price.split('.')[1].split('/')[1]}*/}
        {/*                          </p>*/}
        {/*                        </div>*/}
        {/*                      </div>*/}
        {/*                      {plan.extra && (*/}
        {/*                        <div className='text-[#1A214C] text-xl font-katide-bold'>{plan.extra}</div>*/}
        {/*                      )}*/}
        {/*                      <div className='text-center font-katide-semibold text-gray-400 line-through'>{plan.discount}</div>*/}
        {/*                    </div>*/}
        {/*                  )}*/}

        {/*                  /!* Coin Info *!/*/}

        {/*                  <div*/}
        {/*                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 flex w-[101%] items-center gap-3 rounded-2xl p-4 h-14 ${*/}
        {/*                      plan.duration === "ANNUAL ACCESS" ? "bg-[#61A9FA]" : "bg-[#C2E5FF]"*/}
        {/*                    }`}*/}
        {/*                  >*/}
        {/*                      <Image*/}
        {/*                        src={drizzyCoin.src}*/}
        {/*                        alt='coin'*/}
        {/*                        width={40}*/}
        {/*                        height={40}*/}
        {/*                        className='h-7'*/}
        {/*                      />*/}
        {/*                      {plan.coin}*/}
        {/*                    </div>*/}
        {/*                </div>*/}

        {/*                /!* Plan Description *!/*/}
        {/*                <div*/}
        {/*                  className='hidden lg:flex items-center justify-center text-[#1A214C] text-[10px] leading-tight text-center mt-2 px-4'*/}
        {/*                  dangerouslySetInnerHTML={{ __html: plan.text }}*/}
        {/*                />*/}
        {/*                /!* Subscribe Button *!/*/}
        {/*                {plan.duration !== "0" ? (*/}
        {/*                  <button*/}
        {/*                    className='font-katide-bold my-4 mx-auto w-11/12 rounded-xl bg-[#EE4C73] py-6 text-[20px] tracking-[0.12em] group-hover:bg-[#FFBB3C] text-white shadow-lg transition-all group-hover:text-[#1A214C] hover:!bg-[#ED9B37]'*/}
        {/*                    onClick={() => handleSubscribe(plan.priceId!, token as string, plan.duration)}*/}
        {/*                  >*/}
        {/*                    {plan.buttonText}*/}
        {/*                  </button>*/}
        {/*                ) : (*/}
        {/*                  <button*/}
        {/*                    // className='font-katide-bold my-4 rounded-xl bg-[#4065D1] py-6 text-[20px] tracking-[0.12em] text-white shadow-lg transition-all hover:!bg-[#2A3B80]'*/}
        {/*                    className='font-katide-bold my-4 mx-auto w-11/12 rounded-xl bg-[#EE4C73] py-6 text-[20px] tracking-[0.12em] group-hover:bg-[#FFBB3C] text-white shadow-lg transition-all group-hover:text-[#1A214C] hover:!bg-[#ED9B37]'*/}

        {/*                    onClick={() => handleSubscribe(plan.priceId!, token as string, plan.duration)}*/}
        {/*                  >*/}
        {/*                    {plan.buttonText}*/}
        {/*                  </button>*/}
        {/*                )}*/}

        {/*                /!* Features Included *!/*/}
        {/*                <div className='hidden lg:flex flex-col gap-3.5'>*/}
        {/*                  <p className='font-katide-bold text-xs text-[#1A214C]'>*/}
        {/*                    This includes:*/}
        {/*                  </p>*/}

        {/*                  {plan.features.map((feature, idx) => (*/}
        {/*                    <div key={idx} className='flex items-center gap-3'>*/}
        {/*                      <Image*/}
        {/*                        src={checkblue.src}*/}
        {/*                        alt='check'*/}
        {/*                        width={15}*/}
        {/*                        height={15}*/}
        {/*                      />*/}
        {/*                      <div>*/}
        {/*                        <p className='text-xs font-katide-bold text-[#1A214C]'>{feature.title}</p>*/}
        {/*                        <p className='text-xs font-katide-light text-[#1A214C]'>{feature.desc}</p>*/}
        {/*                      </div>*/}
        {/*                    </div>*/}
        {/*                  ))}*/}

        {/*                  /!* Excluded Features *!/*/}
        {/*                  {plan.exclude.map((feature, idx) => (*/}
        {/*                    <div key={idx} className='flex gap-3'>*/}
        {/*                      <Image*/}
        {/*                        src={crossMember.src}*/}
        {/*                        alt='cross'*/}
        {/*                        width={15}*/}
        {/*                        height={15}*/}
        {/*                      />*/}
        {/*                      <div>*/}
        {/*                        <p className='text-xs font-katide-bold text-[#AAAAAA]'>{feature.title}</p>*/}
        {/*                        <p className='text-xs font-katide-light text-[#AAAAAA]'>{feature.desc}</p>*/}
        {/*                      </div>*/}
        {/*                    </div>*/}
        {/*                  ))}*/}
        {/*                </div>*/}
        {/*              </div>*/}

        {/*              /!* Free Plan Note *!/*/}
        {/*              {plan.duration === "0" && (*/}
        {/*                <p className='bg-[#F8F8FA] w-full absolute bottom-0 left-0 rounded-2xl text-[#1A214C] text-xs text-center p-8 leading-[24px]'>*/}
        {/*                  Take your business to the next level with the <span className='font-bold'>Reseller Pro Plan</span>. Join now and boost your online store’s offerings and profitability. Consult now!*/}
        {/*                </p>*/}
        {/*              )}*/}
        {/*            </div>*/}
        {/*          ))}*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*</section>*/}
        <section id='price' className='flex flex-col scroll-mt-40 items-center justify-center text-[#1A214C] pt-10'>
          <div className='flex w-full flex-col items-center text-[#1A214C] lg:max-w-[1264px]'>
            <div className='relative flex flex-col flex-wrap items-center justify-center rounded-lg lg:border border-[#1A214C] p-2 lg:p-12 mb-12 sm:border-0' style={{ borderRadius: '24px' }}>
              {/* Badge Image at Top */}
              <div className='absolute -top-3 left-0 flex w-full justify-center'>
                <div className='absolute -top-7 left-1/2 transform -translate-x-1/2'>
                  {/*<Image src={vip.src} alt='Cov Product' width={235} height={78} className="z-10" />*/}
                </div>
              </div>
              <div className="mx-auto flex flex-col gap-6 p-6 sm:flex-row">
                {/* === Card kiri: Monthly Membership === */}
                <div className="flex-1 overflow-hidden rounded-2xl border-2 border-[#F0A93E] bg-white shadow-sm">
                  {/* Banner "MOST FLEXIBLE" */}
                  <div className="bg-gradient-to-r font-katide-regular from-[#F0A93E] to-[#EE8C3E] py-2 text-center text-xs font-bold tracking-wide text-white">
                    MOST FLEXIBLE · CANCEL ANYTIME
                  </div>

                  <div className="flex flex-col gap-5 p-6">
                    {/* Badge */}
                    <div className="w-fit rounded-full font-katide-regular bg-[#1A214C] px-4 py-1.5 text-xs font-bold tracking-wide text-white">
                      MONTHLY MEMBERSHIP
                    </div>

                    {/* Harga */}
                    <div>
                      <div className="flex items-start gap-1 py-4">
                        <span className="text-7xl font-katide-extrabold text-[#1A214C]">$3</span>
                        <span className="mt-1 text-xl font-katide-bold text-[#1A214C]">.99</span>
                        <span className="mt-2.5 text-lg font-katide-regular text-gray-400">/mo</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-400 font-katide-regular">
                        Billed monthly. Cancel anytime, no long-term commitment.
                      </p>
                    </div>

                    {/* Highlight box */}
                    <div className="flex items-center gap-3 rounded-xl bg-[#EAF2FB] p-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F0A93E] text-xs font-bold text-white">
                        <Image
                          src={drizzyCoin.src}
                          alt='coin'
                          width={40}
                          height={40}
                          className='h-7'/>
                      </div>
                      <p className="text-sm font-katide-medium text-[#1A214C]">
                        Full access to every premium design, yours to use anytime
                      </p>
                    </div>

                    {/* CTA */}
                    {subscriptionPlans.map((plan, index) => (
                      <button
                        className="w-full rounded-full bg-gradient-to-b from-[#F06A8C] to-[#EE4C73] py-3.5 text-sm font-katide-bold text-white shadow-md shadow-[#EE4C73]/30 transition hover:from-[#EE5883] hover:to-[#D93E63]"
                        onClick={() => handleSubscribe(plan.priceId!, token as string, plan.duration)}
                      >
                        JOIN NOW
                      </button>
                    ))}

                    {/* Features */}
                    <div>
                      <p className="mb-3 text-sm font-katide-semibold text-[#1A214C]">This includes:</p>
                      <ul className="flex flex-col">
                        {[
                          { title: 'Get our Premium Products', desc: 'Access every asset, every month' },
                          { title: 'Daily SVG Updates', desc: 'Always something new to explore' },
                          { title: 'Breezy Mode', desc: 'Seamless creations with drag & drop' },
                          { title: 'Machine Compatibility', desc: 'Works with cutting, laser, and sublimation devices' },
                          { title: 'Custom Designs on Request', desc: 'Chat with our team for unique creations' },
                          { title: 'Full License Coverage', desc: 'Commercial and POD licensing included' },
                          { title: 'Business Assistance', desc: 'Tools and support to elevate your project' },
                          { title: 'Premium Support', desc: 'Priority access to our dedicated artist team' },
                        ].map((feature, index, arr) => (
                          <li
                            key={feature.title}
                            className={`flex items-start gap-2.5 py-3 ${
                              index !== arr.length - 1 ? 'border-b border-dashed border-gray-200' : ''
                            }`}
                          >
                            <span className="mt-0.5 text-sm font-bold text-[#4065D1]">✓</span>
                            <div>
                              <p className="text-sm font-katide-bold text-[#1A214C]">{feature.title}</p>
                              <p className="text-xs font-katide-regular text-gray-400">{feature.desc}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* === Card kanan: Pay per design === */}
                <div className="flex-1 rounded-2xl bg-[#F4F7FB] p-6">
                  <div className="flex flex-col gap-5">
                    {/* Badge */}
                    <div className="w-fit rounded-full bg-[#E3E9F3] px-4 py-1.5 text-xs font-katide-bold tracking-wide text-[#1A214C]">
                      PAY AS YOU GO
                    </div>

                    {/* Judul */}
                    <div>
                      <h3 className="text-3xl font-katide-extrabold text-[#1A214C]">Support Us, One Design at a Time</h3>
                      <p className="mt-1 text-sm font-katide-regular text-gray-500">Grab exactly what you need , your money goes straight to the next design we make.</p>
                    </div>

                    {/* Tag pills */}
                    <div className="flex flex-wrap gap-2">
                      {['SVG file', 'Instant download', 'One-time payment'].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#E3E9F3] px-3 py-1.5 text-xs font-katide-semibold text-[#1A214C]"
                        >
                    {tag}
                  </span>
                      ))}
                    </div>

                    {/* Notice box */}
                    {/*<div className="rounded-xl border border-[#F3D9C4] bg-[#FCF1E8] p-4">*/}
                    {/*  <p className="text-sm text-[#8A5A2E]">*/}
                    {/*    <span className="font-katide-bold">Personal License only.</span> Designs bought*/}
                    {/*    individually are for personal, non-commercial use. No POD or resale rights*/}
                    {/*    included — upgrade to Membership for commercial &amp; POD licensing.*/}
                    {/*  </p>*/}
                    {/*</div>*/}

                    {/* CTA outline */}
                    <button onClick={() => setShowSupportModal(true)} className="w-full rounded-full border-2 border-[#1A214C] bg-white py-3.5 text-sm font-katide-bold text-[#1A214C] transition hover:bg-[#1A214C] hover:text-white">
                      SUPPORT US
                    </button>

                    {/* Features */}
                    <div>
                      <p className="mb-3 text-sm font-semibold text-[#1A214C]">This includes:</p>
                      <ul className="flex flex-col">
                        {[
                          { title: 'Select the license that suits your needs', desc: 'For your own crafting projects', included: true },
                          { title: 'Instant Download', desc: 'Get the file right after checkout', included: true },
                          { title: 'Commercial / POD License', desc: 'Membership only', included: false },
                          { title: 'Custom Designs & Priority Support', desc: 'Membership only', included: false },
                        ].map((feature, index, arr) => (
                          <li
                            key={feature.title}
                            className={`flex items-start gap-2.5 py-3 ${
                              index !== arr.length - 1 ? 'border-b border-dashed border-gray-200' : ''
                            }`}
                          >
                      <span
                        className={`mt-0.5 text-sm font-katide-bold ${
                          feature.included ? 'text-[#4065D1]' : 'text-gray-300'
                        }`}
                      >
                        {feature.included ? '✓' : '✕'}
                      </span>
                            <div>
                              <p
                                className={`text-sm font-katide-bold ${
                                  feature.included ? 'text-[#1A214C]' : 'text-gray-400'
                                }`}
                              >
                                {feature.title}
                              </p>
                              <p className="text-xs font-katide-regular text-gray-400">{feature.desc}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Membership included  */}
        <section className="block sm:hidden w-full px-4 py-12 flex flex-col items-center text-[#1A214C]">
          <h2 className="text-2xl font-katide-extrabold text-[#4065D1] text-center mb-10">
            ALL PLANS INCLUDE:
          </h2>

          <div className="w-full flex flex-col gap-8 p-5">
            {[
              {
                title: "Fresh Designs, Every Day",
                desc: "Get daily SVG updates and unlock endless creativity — there’s always something new waiting for you!"
              },
              {
                title: "Breezy Mode: Effortless Creativity",
                desc: "Design with ease using our smooth drag-and-drop feature — making magic has never been simpler!"
              },
              {
                title: "Universal Machine Compatibility",
                desc: "Designed to work flawlessly with cutting machines, laser engravers, and sublimation printers — ready for whatever you create!"
              },
              {
                title: "Inspiring Crafter Projects",
                desc: "See real creations made by our community — get inspired and spark your next masterpiece!"
              },
            ].map((item, i) => (
              <div key={i} className="transition-all duration-300 p-5">
                <h3 className="text-lg font-katide-heavy text-[#2A3B80] mb-1">{item.title}</h3>
                <p className="text-sm text-[#666666] mt-5">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center max-w-2xl space-y-4 px-12">
            <h3 className="text-xl font-katide-heavy text-[36px] text-[#4065D1]">
              Ready to Create Without Limits?
            </h3>
            <p className="text-sm text-[#666666]">
              Subscribe now and unlock daily inspiration, effortless tools, and endless possibilities. Your next masterpiece is just a click away — let’s craft something amazing together.
            </p>
            <button className="bg-[#4065D1] text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-[#2A3B80] transition-all duration-300">
              Try it Free
            </button>
          </div>
        </section>

        {/* Product slide  */}
        <section className="bg-[#C2E5FF] py-8 px-4 overflow-hidden">
          <h2 className="text-3xl font-normal text-center my-16">
            Explore our <span className="text-pink-500 font-normal">curated recommendations</span>
          </h2>

          <div className="overflow-hidden w-full">
            <div className="marquee-wrapper gap-6">
              {productData.map((product, index) => (
                <div
                  key={index}
                  className="min-w-[260px] max-w-[260px] bg-white rounded-2xl shadow-lg overflow-hidden border-4 border-white"
                >
                  <div className="p-1 bg-white rounded-2xl">
                    <Image
                      src={product.imageUrl[0]}
                      alt={`Product ${product.id}`}
                      className="rounded-xl w-full h-48 object-cover"
                      width={260}
                      height={192}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features  */}
        <section className="bg-[#C2E5FF] pt-8 md:pb-8 overflow-hidden">
          <div className="max-w-[1280px] min-h-[1003px] md:min-h-[610px] mx-auto bg-[#EBECF5] p-8 md:p-12 rounded-none md:rounded-[24px] shadow-md">
            <div className="flex  md:grid md:grid-cols-2 gap-8">

              {/* Left Side - Title, Icons, Deskripsi */}
              <div className="flex flex-col justify-center items-center text-center order-1 md:order-1">
                <h2 className="text-[24px] md:text-[28px] font-bold text-[#1A214C] mb-4 mt-2">
                  Elevate Your Craft, However You Choose to Access It
                </h2>
                <p className="text-[#ED9B37] mb-8 text-[16px]">
                  Get first access to exclusive content from leading brands and designers, premium designs, special tools, and deals made for crafters.
                </p>

                {/* Feature Icons */}
                <div className="relative w-full max-w-md border-2 border-[#ED9B37] rounded-[10px] md:rounded-[24px] p-3 md:p-4 mb-6 mx-auto">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#ED9B37] px-4 py-1 rounded-full border border-white text-white font-bold text-sm shadow">
                    Feature Details
                  </div>
                  <div className="grid grid-cols-4 gap-3 items-center">
                    {features.map((feature, i) => (
                      <img
                        key={i}
                        src={i === currentIndex ? feature.srcActive : feature.src}
                        alt={feature.alt}
                        onClick={() => {
                          const newIndex = videoMap[i as keyof typeof videoMap];
                          setCurrentIndex(newIndex);
                        }}
                        className="cursor-pointer rounded-lg w-full aspect-square object-cover transition-transform duration-300 hover:scale-110"
                        loading='lazy'
                      />
                    ))}
                  </div>
                </div>

                {/* Carousel for MOBILE only */}
                <div className="flex flex-col items-center justify-center w-full mb-6 md:hidden">
                  <video
                    key={carouselVideos[currentIndex]}
                    src={carouselVideos[currentIndex]}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="rounded-lg w-full max-w-[400px] h-auto transition-opacity duration-500 bg-transparent"
                  />
                  <div className="mt-4 flex gap-2">
                    {carouselVideos.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`Slide ${idx + 1}`}
                        className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                          idx === currentIndex
                            ? 'bg-[#4065D1] border-[#4065D1]'
                            : 'bg-white border-gray-700'
                        }`}
                      >
                        <span className="sr-only">Go to slide {idx + 1}</span>
                      </button>
                    ))}
                  </div>
                </div>

               {/* Deskripsi */}
                <div className="mt-4 flex flex-col items-center px-2">
                  <h3 className="text-[24px] md:text-[32px] font-semibold mb-2 text-[#4065D1]">
                    {featureDescriptions[currentIndex].title}
                  </h3>
                  <p className="text-[#595959] text-[16px] text-center">
                    {featureDescriptions[currentIndex].description}
                  </p>
                  {featureDescriptions[currentIndex].showButton && featureDescriptions[currentIndex].buttonText && (
                    <a
                      href={featureDescriptions[currentIndex].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#4065D1] hover:bg-[#3651a7] text-white font-bold py-2 px-6 rounded-full text-[14px] mt-4"
                    >
                      {featureDescriptions[currentIndex].buttonText}
                    </a>
                  )}
                </div>
              </div>
              {/* Right Side - Carousel for DESKTOP only */}
              <div className="order-2 md:order-2 hidden md:flex flex-col items-center justify-center w-full">
                <video
                  key={carouselVideos[currentIndex]}
                  src={carouselVideos[currentIndex]}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="rounded-lg w-full max-w-[400px] h-auto transition-opacity duration-500 bg-transparent"
                />
                <div className="mt-4 flex gap-2">
                  {carouselVideos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                        idx === currentIndex
                          ? 'bg-[#4065D1] border-[#4065D1]'
                          : 'bg-white border-gray-700'
                      }`}
                    >
                      <span className="sr-only">Go to slide {idx + 1}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* Condition */}
        <section className='flex flex-col items-center justify-center bg-[#EBECF5] text-[#1A214C]'>
          <div className='flex w-full flex-col bg-[#EBECF5] py-[10%] text-[#1A214C] lg:max-w-[1264px] px-4 py-4 mt-5'>
            <div className='flex flex-col flex-wrap lg:flex-row'>
              <div className='mb-16 flex w-full gap-4 lg:w-1/2 px-6'>
                <Image
                  src={membership1.src}
                  alt='nocommitment'
                  width={60}
                  height={60}
                />
                <div className='flex flex-col gap-4'>
                  <p className='font-katide-bold text-2xl text-[#4065D1]'>
                    No conditions
                  </p>
                  <p className='text-[#666666]'>
                    You can enjoy our services freely, without any conditions
                    attached. Relax and indulge without any obligations.
                  </p>
                </div>
              </div>
              <div className='mb-16 flex w-full gap-4 lg:w-1/2 px-6'>
                <Image
                  src={membership2.src}
                  alt='nocommitment'
                  width={60}
                  height={60}
                />
                <div className='flex flex-col gap-4'>
                  <p className='font-katide-bold text-2xl text-[#4065D1]'>
                    No commitments
                  </p>
                  <p className='text-[#666666]'>
                    You can explore and enjoy all that we offer without any
                    obligations or promises necessary on your part.
                  </p>
                </div>
              </div>
              <div className='mb-16 flex w-full gap-4 lg:w-1/2 px-6'>
                <Image
                  src={membership3.src}
                  alt='nocommitment'
                  width={60}
                  height={60}
                />
                <div className='flex flex-col gap-4'>
                  <p className='font-katide-bold text-2xl text-[#4065D1]'>
                    No hidden fees
                  </p>
                  <p className='text-[#666666]'>
                    Rest assured, our pricing is transparent with absolutely no
                    hidden fees. Enjoy our services worry-free.
                  </p>
                </div>
              </div>
              <div className='mb-16 flex w-full gap-4 lg:w-1/2 px-6'>
                <Image
                  src={membership4.src}
                  alt='nocommitment'
                  width={60}
                  height={60}
                />
                <div className='flex flex-col gap-4'>
                  <p className='font-katide-bold text-2xl text-[#4065D1]'>
                    Cancel anytime
                  </p>
                  <p className='text-[#666666]'>
                    You can cancel your subscription or service anytime, offering
                    you the flexibility and convenience you need.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials  */}
        <section className='flex flex-col items-center justify-center bg-[#4065D1] text-white'>
          <div className="flex flex-col bg-[#4065D1] py-[20%] text-white lg:py-[10%] lg:max-w-[1264px]">
            <div className='relative flex flex-col flex-wrap items-center justify-center rounded-lg lg:border border-[#ffffff] p-4 lg:p-12 mb-12 sm:border-0 sm:p-6' style={{ borderRadius: '24px' }}>
              <div className='absolute -top-3 left-0 flex w-full justify-center'>
                <p className='font-katide-regular bg-[#4065D1] px-4 text-[24px] lg:text-[48px]'>
                  What They Say About Us
                </p>
              </div>
              <p className='py-[20px] text-center text-sm tracking-[0.14em] lg:text-lg'>
                Trusted by hundreds of thousands <br /> of crafters around the
                world
              </p>

              <div className='mt-[36px] grid w-full grid-cols-1 gap-4 rounded-lg bg-[#2A3B80] p-3 lg:grid-cols-3 lg:p-8' style={{ borderRadius: '24px' }}>
                <div className='flex flex-col items-center justify-start gap-4 border-white/15 px-3 border-b-[3px] lg:border-b-0 lg:border-r-[3px] lg:px-12 max-md:py-10' >
                  <Image src={member1.src} alt='Review' width={72} height={72} />
                  <p className='grow text-center'>
                    This is the first time I found a site that specially provides
                    affordable cut files. The designs are unique and excellent.
                    They’re responsible for my newfound crafting addiction!
                  </p>
                  <div className='h-0.5 w-[40px] rounded-full bg-[#EE4C73]'></div>
                  <div className='flex flex-col items-center'>
                    <p className='text-[16px] font-extrabold'>Mary Haw</p>
                    <p className='text-[12px] font-extrabold text-[#4A90E2]'>
                      USA
                    </p>
                  </div>
                </div>
                <div className='flex flex-col items-center justify-start gap-4 border-white/15 px-3 border-b-[3px] lg:border-b-0 lg:border-r-[3px] lg:px-12 max-md:py-10'>
                  <Image src={member2.src} alt='Review' width={72} height={72} />
                  <p className='grow text-center'>
                    Very helpful to small business owners like me. The prices are
                    low so I can sell my products more competitively. I can now
                    release new products every day, thank you very much.
                  </p>
                  <div className='h-0.5 w-[40px] rounded-full bg-[#EE4C73]'></div>
                  <div className='flex flex-col items-center'>
                    <p className='text-[16px] font-extrabold'>Lisa</p>
                    <p className='text-[12px] font-extrabold text-[#4A90E2]'>
                      CANADA
                    </p>
                  </div>
                </div>
                <div className='flex flex-col items-center justify-start gap-4 px-3 lg:px-12 max-md:py-10'>
                  <Image src={member3.src} alt='Review' width={72} height={72} />
                  <p className='grow text-center'>
                    Now I can save thousands of dollars to support my hobby. The
                    unlimited access really helps me get the design I want.
                  </p>
                  <div className='h-0.5 w-[40px] rounded-full bg-[#EE4C73]'></div>
                  <div className='flex flex-col items-center'>
                    <p className='text-[16px] font-extrabold'>Ashley Rebecca</p>
                    <p className='text-[12px] font-extrabold text-[#4A90E2]'>
                      UK
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Testimonies />
        </section>



        {/* FAQ  */}
        <SectionContainer className='font-katide flex flex-col items-center justify-center py-20 leading-10'>
          <div className={`${myFont.className} mb-8 text-[32px]`}>FAQ</div>
          <div className='mt-24 flex flex-col justify-between gap-8 p-4 lg:flex-row lg:p-0'>
            <div className='flex flex-col gap-[60px]'>
              <div className='flex flex-col gap-6'>
                <p className='text-lg text-[#1A204C]'>
                  Do I get access to all files?
                </p>
                <p className='text-base text-[#595959]'>
                  Yes, after you register you can immediately download all the
                  designs on this website. The prices displayed will change to $0
                  for all items.{' '}
                  <span className='text-[#FF0000]'>
                    (Excluding bundle products)
                  </span>
                </p>
              </div>
              <div className='flex flex-col gap-6'>
                <p className='text-lg text-[#1A204C]'>
                  What license is included?
                </p>
                <p className='text-base text-[#595959]'>
                  As written on the description of the plan you choose, either
                  Personal License or Commercial License.
                </p>
              </div>
              <div className='flex flex-col gap-6'>
                <p className='text-lg text-[#1A204C]'>
                  What file formats are included?
                </p>
                <p className='text-base text-[#595959]'>
                  For crafts we include SVG / PNG / DXF / EPS. For graphics it is
                  up to the designer to choose the format. For fonts we offer OTF
                  and TTF formats. All fonts include at least one of these
                  formats.
                </p>
                <p className='text-base text-[#595959]'>
                  The format files are listed on each product page. You are
                  allowed to convert them to other formats for your own use.
                </p>
              </div>
              <div className='flex flex-col gap-6'>
                <p className='text-lg text-[#1A204C]'>
                  Does it include product bundles?
                </p>
                <p className='text-base text-[#595959]'>
                  <span className='font-bold'>Not included</span>, this membership
                  package only includes a single crafter file. Bundles are
                  products that must be purchased separately.
                </p>
              </div>
            </div>
            <div className='flex flex-col gap-[60px]'>
              <div className='flex flex-col gap-6'>
                <p className='text-lg text-[#1A204C]'>
                  Can I use the files commercially?
                </p>
                <p className='text-base text-[#595959]'>
                  Yes, if you choose the Commercial plan. For the Personal plan,
                  you can only use it for personal projects. After the
                  subscription ends, you still have commercial rights.
                </p>
              </div>
              <div className='flex flex-col gap-6'>
                <p className='text-lg text-[#1A204C]'>
                  Can I cancel at any time?
                </p>
                <p className='text-base text-[#595959]'>
                  Yes, you can cancel your subscription at any time. There is no
                  condition for it.
                </p>
              </div>
              <div className='flex flex-col gap-6'>
                <p className='text-lg text-[#1A204C]'>
                  What happens when I end my subscription?
                </p>
                <p className='text-base text-[#595959]'>
                  Once you end your subscription, you will lose access to download
                  new files and updates.
                </p>
                <p className='text-base text-[#595959]'>
                  You won't be allowed to create new works with the files you
                  downloaded. However, you can keep using and selling the works
                  that you created while you had an active subscription.
                </p>
              </div>
            </div>
          </div>
        </SectionContainer>
        <SupportUsModal
          isOpen={showSupportModal}
          onClose={() => setShowSupportModal(false)}
        />
        {/* Footer  */}
        <section>
          <AffiliateBanner />
        </section>
        {showChat ?
          <div ref={refChat} className='fixed bottom-0 right-0 z-[99]'>
            <iframe height={500} src='https://tawk.to/chat/64abcc35cc26a871b0276fc0/1h4vhbd1k' />
          </div>
          :
          <div onClick={() => setShowChat(true)} className="fixed bottom-0 right-0 z-[500]">
            <div className='-mb-8 max-w-[200px]'>
              <CustomerSupportLottie />
            </div>
          </div>
        }
    </main>
  );
}
