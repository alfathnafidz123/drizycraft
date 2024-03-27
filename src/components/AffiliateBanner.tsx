const AffiliateBanner = () => {
  return (
    <div
      className='font-montserrat z-20 flex flex-col justify-center bg-[#3D5DD1] text-center text-white'
      style={{
        backgroundImage: `url('/images/AffiliateBanner.svg')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className='relative flex min-h-[321px] w-full flex-col items-center justify-center overflow-hidden px-16 py-12 max-md:max-w-full max-md:px-5'>
        <div className='mb-6 mt-12 flex w-[341px] max-w-full flex-col items-center max-md:mt-10'>
          <div className='whitespace-nowrap text-2xl leading-9'>
            Share &amp; Earn
          </div>
          <p className='font-hastle mt-4 w-[254px] text-xs leading-5'>
            Get The Extra Money With Only Few Clicks
            <br /> 30% Commission
          </p>
          <button className='hover: mt-5 items-center justify-center rounded-[47px] border-[3px] border-indigo-950 bg-[#FFBB3C] px-20 py-4  shadow-md transition-all ease-out hover:bg-[#ECA014]'>
            <div className='font-katide-semibold text-center text-black'>
              Become an Affiliator
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AffiliateBanner;
