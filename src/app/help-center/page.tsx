import Link from 'next/link';
import { FaSistrix } from 'react-icons/fa6';

import { helpcenter1, helpcenter2 } from '~/images';

export default function HelpCenter() {
  return (
    <main className=''>
      <p className=' font-katide-bold mb-[6%] mt-[5%] text-center text-[36px] tracking-[10px] text-[#1A214C]'>
        HELP CENTER
      </p>

      <div className='bg-[#EBECF5] py-16'>
        <section className='mx-auto w-full max-w-[1164px]'>
          <div className='flex items-center justify-center'>
            <div className='flex h-[54px] w-[480px] items-center gap-10 rounded-full bg-white pl-10'>
              <FaSistrix />
              <input
                type='input'
                placeholder='Type your question here..'
                className='min-w-0'
                style={{ outline: 'none' }}
              />
            </div>
          </div>

          <div className='mb-[6%] ml-[4%] mr-[4%] mt-[6%] rounded-xl bg-white shadow-md'>
            <div className='p-6'></div>

            <div className='flex items-center bg-[#E4F6FB] pb-8 pl-10 pt-8'>
              <img src={helpcenter1.src} alt='Help Center' />

              <p className='font-katide-bold ml-4 mt-3 text-[36px] text-[#4065D1]'>
                Affiliates
              </p>

              <div className='font-katide-bold h-[28px] w-[28px] rounded-full bg-[#CECECE] text-center text-[14px] text-[#4065D1] flex items-center justify-center'>
                10
              </div>
            </div>

            <div className='ml-10 '>
              <div className='mt-10 flex'>
                <img src={helpcenter2.src} alt='Help Center' />
                <Link href="https://drizystudio.com/docs/affiliate-rules/" target='_blank' className='ml-6 mt-2 text-[14px]'>
                  Affiliate Rules (Terms and Conditions)
                </Link>
              </div>

              <div className='mt-6 flex'>
                <img src={helpcenter2.src} alt='Help Center' />
                <Link href="https://drizystudio.com/docs/registration-flow/" target='_blank' className='ml-6 mt-2 text-[14px]'>Registration Flow</Link>
              </div>

              <div className='mt-6 flex'>
                <img src={helpcenter2.src} alt='Help Center' />
                <Link href="https://drizystudio.com/docs/how-to-register-as-an-affiliate/" target='_blank' className='ml-6 mt-2 text-[14px]'>
                  How to Register as an Affiliate
                </Link>
              </div>

              <div className='mt-6 flex'>
                <img src={helpcenter2.src} alt='Help Center' />
                <Link href="https://drizystudio.com/docs/get-to-know-the-menus-on-the-dashboard/" target='_blank' className='ml-6 mt-2 text-[14px]'>
                  Get to Know the Menus on the Dashboard
                </Link>
              </div>

              <div className='mt-6 flex'>
                <img src={helpcenter2.src} alt='Help Center' />
                <Link href="https://drizystudio.com/docs/first-thing-to-do/" target='_blank' className='ml-6 mt-2 text-[14px]'>First Thing to Do </Link>
              </div>

              <div className='mt-6 flex'>
                <img src={helpcenter2.src} alt='Help Center' />
                <Link href="https://drizystudio.com/docs/how-to-create-and-share-affiliate-links/" target='_blank' className='ml-6 mt-2 text-[14px]'>
                  How to Create and Share Affiliate Links
                </Link>
              </div>

              <div className='mt-6 flex'>
                <img src={helpcenter2.src} alt='Help Center' />
                <Link href="https://drizystudio.com/docs/how-to-track-visitors-and-commissions/" target='_blank' className='ml-6 mt-2 text-[14px]'>
                  How to Track Visitors and Commissions
                </Link>
              </div>

              <div className='mt-6 flex'>
                <img src={helpcenter2.src} alt='Help Center' />
                <Link href="https://drizystudio.com/docs/how-to-create-a-custom-coupon/" target='_blank' className='ml-6 mt-2 text-[14px]'>
                  How to Create a Custom Coupon
                </Link>
              </div>

              <div className='mt-6 flex'>
                <img src={helpcenter2.src} alt='Help Center' />
                <Link href="https://drizystudio.com/docs/best-practices-for-affiliates-to-maximize-earning/" target='_blank' className='ml-6 mt-2 text-[14px]'>
                  Best Practices for Affiliates to Maximize Earning
                </Link>
              </div>

              <div className='mt-6 flex'>
                <img src={helpcenter2.src} alt='Help Center' />
                <Link href="https://drizystudio.com/docs/payment-policy-and-affiliate-fund-withdrawal-procedures/" target="_blank" className='ml-6 mt-2 text-[14px]'>
                  Payment Policy and Affiliate Fund Withdrawal Procedures
                </Link>
              </div>
            </div>

            <Link href="https://drizystudio.com/docs-category/affiliates/" target='_blank' className='font-katide-bold mb-[4%] ml-10 mt-[4%] rounded-full border-[1px] border-[#4065D1] bg-white px-8 py-2 text-center text-[14px] text-[#4065D1]'>
              Explore More
            </Link>
          </div>

          <div className='mb-[6%] ml-[4%] mr-[4%] mt-[6%] rounded-xl bg-white shadow-md'>
            <div className='p-6'></div>

            <div className='flex items-center bg-[#E4F6FB] pb-8 pl-10 pt-8'>
              <img src={helpcenter1.src} alt='Help Center' />

              <p className='font-katide-bold ml-4 mt-3 text-[36px] text-[#4065D1]'>
                Community
              </p>

              <div className='font-katide-bold flex items-center justify-center h-[28px] w-[28px] rounded-full bg-[#CECECE] text-center text-[14px] text-[#4065D1]'>
                1
              </div>
            </div>

            <div className='ml-10 mt-10 flex'>
              <img src={helpcenter2.src} alt='Help Center' />
              <Link href="https://drizystudio.com/docs/how-to-join-drizy-studio-community/" target="_blank" className='ml-6 mt-2 text-[14px]'>
                How to Join Drizy Studio Community
              </Link>
            </div>

            <Link href="https://drizystudio.com/docs-category/community/" target='_blank' className='font-katide-bold mb-[4%] ml-10 mt-[4%] rounded-full border-[1px] border-[#4065D1] bg-white px-8 py-2 text-center text-[14px] text-[#4065D1]'>
              Explore More
            </Link>
          </div>

          <div className='mb-[6%] ml-[4%] mr-[4%] mt-[6%] rounded-xl bg-white shadow-md'>
            <div className='p-6'></div>

            <div className='flex items-center bg-[#E4F6FB] pb-8 pl-10 pt-8'>
              <img src={helpcenter1.src} alt='Help Center' />

              <p className='font-katide-bold ml-4 mt-3 text-[36px] text-[#4065D1]'>
                Membership
              </p>

              <div className='font-katide-bold flex items-center justify-center h-[28px] w-[28px] rounded-full bg-[#CECECE] text-center text-[14px] text-[#4065D1]'>
                1
              </div>
            </div>

            <div className='ml-10 mt-10 flex'>
              <img src={helpcenter2.src} alt='Help Center' />
              <Link href="https://drizystudio.com/docs/getting-started-drizy-vip-membership/" target='_blank' className='ml-6 mt-2 text-[14px]'>
                Getting Started: Drizy VIP+ Membership
              </Link>
            </div>

            <Link href="https://drizystudio.com/docs-category/membership/" target='_blank' className='font-katide-bold mb-[4%] ml-10 mt-[4%] rounded-full border-[1px] border-[#4065D1] bg-white px-8 py-2 text-center text-[14px] text-[#4065D1]'>
              Explore More
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
