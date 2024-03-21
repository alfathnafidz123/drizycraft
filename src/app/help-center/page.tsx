import { FaSistrix } from 'react-icons/fa6';

import { helpcenter1, helpcenter2 } from '~/images';

export default function HelpCenter() {
  return (
    <main>
      <p className=' font-katide-bold mb-[6%] mt-[5%] text-center text-[36px] tracking-[10px] tracking-wider text-[#1A214C]'>
        HELP CENTER
      </p>

      <section className='bg-[#EBECF5] p-16'>
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

            <div className='font-katide-bold ml-8 mt-[-1%] h-[28px] w-[28px] rounded-full bg-[#CECECE] text-center text-[14px] text-[#4065D1]'>
              10
            </div>
          </div>

          <div className='ml-10 '>
            <div className='mt-10 flex'>
              <img src={helpcenter2.src} alt='Help Center' />
              <p className='ml-6 mt-2 text-[14px]'>
                Affiliate Rules (Terms and Conditions)
              </p>
            </div>

            <div className='mt-6 flex'>
              <img src={helpcenter2.src} alt='Help Center' />
              <p className='ml-6 mt-2 text-[14px]'>Registration Flow</p>
            </div>

            <div className='mt-6 flex'>
              <img src={helpcenter2.src} alt='Help Center' />
              <p className='ml-6 mt-2 text-[14px]'>
                How to Register as an Affiliate
              </p>
            </div>

            <div className='mt-6 flex'>
              <img src={helpcenter2.src} alt='Help Center' />
              <p className='ml-6 mt-2 text-[14px]'>
                Get to Know the Menus on the Dashboard
              </p>
            </div>

            <div className='mt-6 flex'>
              <img src={helpcenter2.src} alt='Help Center' />
              <p className='ml-6 mt-2 text-[14px]'>First Thing to Do </p>
            </div>

            <div className='mt-6 flex'>
              <img src={helpcenter2.src} alt='Help Center' />
              <p className='ml-6 mt-2 text-[14px]'>
                How to Create and Share Affiliate Links
              </p>
            </div>

            <div className='mt-6 flex'>
              <img src={helpcenter2.src} alt='Help Center' />
              <p className='ml-6 mt-2 text-[14px]'>
                How to Track Visitors and Commissions
              </p>
            </div>

            <div className='mt-6 flex'>
              <img src={helpcenter2.src} alt='Help Center' />
              <p className='ml-6 mt-2 text-[14px]'>
                How to Create a Custom Coupon
              </p>
            </div>

            <div className='mt-6 flex'>
              <img src={helpcenter2.src} alt='Help Center' />
              <p className='ml-6 mt-2 text-[14px]'>
                Best Practices for Affiliates to Maximize Earning
              </p>
            </div>

            <div className='mt-6 flex'>
              <img src={helpcenter2.src} alt='Help Center' />
              <p className='ml-6 mt-2 text-[14px]'>
                Payment Policy and Affiliate Fund Withdrawal Procedures
              </p>
            </div>
          </div>

          <button className='mt-[4%] mb-[4%] ml-10 rounded-full border-[1px] px-8 py-2 bg-white text-[#4065D1] border-[#4065D1] text-[14px] font-katide-bold text-center'>
            Explore More
          </button>
        </div>

        <div className='mb-[6%] ml-[4%] mr-[4%] mt-[6%] rounded-xl bg-white shadow-md'>
          <div className='p-6'></div>

          <div className='flex items-center bg-[#E4F6FB] pb-8 pl-10 pt-8'>
            <img src={helpcenter1.src} alt='Help Center' />

            <p className='font-katide-bold ml-4 mt-3 text-[36px] text-[#4065D1]'>
              Community
            </p>

            <div className='font-katide-bold ml-8 mt-[-1%] h-[28px] w-[28px] rounded-full bg-[#CECECE] text-center text-[14px] text-[#4065D1]'>
              1
            </div>
          </div>

            <div className='mt-10 ml-10 flex'>
              <img src={helpcenter2.src} alt='Help Center' />
              <p className='ml-6 mt-2 text-[14px]'>
              How to Join Drizy Studio Community
              </p>
            </div>

          <button className='mt-[4%] mb-[4%] ml-10 rounded-full border-[1px] px-8 py-2 bg-white text-[#4065D1] border-[#4065D1] text-[14px] font-katide-bold text-center'>
            Explore More
          </button>
        </div>

        <div className='mb-[6%] ml-[4%] mr-[4%] mt-[6%] rounded-xl bg-white shadow-md'>
          <div className='p-6'></div>

          <div className='flex items-center bg-[#E4F6FB] pb-8 pl-10 pt-8'>
            <img src={helpcenter1.src} alt='Help Center' />

            <p className='font-katide-bold ml-4 mt-3 text-[36px] text-[#4065D1]'>
              Membership
            </p>

            <div className='font-katide-bold ml-8 mt-[-1%] h-[28px] w-[28px] rounded-full bg-[#CECECE] text-center text-[14px] text-[#4065D1]'>
              1
            </div>
          </div>

            <div className='mt-10 ml-10 flex'>
              <img src={helpcenter2.src} alt='Help Center' />
              <p className='ml-6 mt-2 text-[14px]'>
              Getting Started: Drizy VIP+ Membership
              </p>
            </div>

          <button className='mt-[4%] mb-[4%] ml-10 rounded-full border-[1px] px-8 py-2 bg-white text-[#4065D1] border-[#4065D1] text-[14px] font-katide-bold text-center'>
            Explore More
          </button>
        </div>

      </section>
    </main>
  );
}
