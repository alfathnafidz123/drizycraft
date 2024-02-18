function ProductCard() {
  return (

    <div className='group main-container w-[281px] h-[335px] relative mx-1 shadow-2xl'>
      <div className='flex w-[64px] h-[37px] pt-[12px] pr-[24px] pb-[12px] pl-[24px] gap-[8px] justify-center items-center flex-nowrap rounded-[8px] border-solid border-2 border-[#b1b1b1] relative z-[9] mt-[285.868px] mr-0 mb-0 ml-[205px]'>
        <div className='w-[26px] h-[24px] shrink-0 relative z-10' style={{ backgroundImage: `url('/images/cartProduct.png')` }} />
      </div>

      {/* badge sale */}
      {/* <div className='w-[83.578px] h-[43.543px] absolute top-[-1px] right-[12.422px] overflow-hidden z-[8]' style={{ backgroundImage: `url('/images/sale-product.png')` }} /> */}

      <div className='flex w-[281px] h-[335px] pt-[12px] pr-[12px] pb-[12px] pl-[12px] flex-col gap-[24px] items-start flex-nowrap bg-[#fff] rounded-[12px] absolute top-0 left-0 shadow-xl hover:border-[2px] border-[#61A9FA] transition-none'>
        <div className='h-[172px] self-stretch shrink-0 bg-cover bg-no-repeat rounded-[6px] relative z-[1]'
          style={{ backgroundImage: `url(/images/crafters1.png)` }}
        />
        <span className="flex w-[257px] h-[54px] justify-start items-start self-stretch shrink-0 text-[16px] font-semibold leading-[17.6px] text-[#1a204c] relative text-left overflow-hidden z-[2]">
          Girl and Fox by The Forest
          <br />
          3D Shadow Box - Winter
          <br />
          SVG Paper Cut
        </span>

        <button className='flex w-[182px] h-[37px] pt-[12px] pr-[24px] pb-[12px] pl-[24px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#2a3b80] rounded-[8px] z-[3] pointer group-hover:bg-[#4065D1]'>
          <span className="text-[20px] font-katide-bold leading-[16px] text-[#fff] z-[5] group-hover:scale-0">
            $1
          </span>
          <span className="hidden group-hover:flex absolute justify-center items-center text-[16px] font-katide-bold leading-[16px] bg-[#4065D1] rounded-[8px]">
            <span className="text-[#fff]">BUY NOW</span>
          </span>
        </button>

        <button className='w-[40px] h-[40px] bg-no-repeat absolute top-[5px] left-[7px] z-[6] opacity-100 group-hover:opacity-0' style={{ backgroundImage: `url('/images/pintCrafter.png')` }} />
        <button className='w-[40px] h-[40px] bg-no-repeat absolute top-[5px] left-[7px] z-[6] opacity-0 group-hover:opacity-100' style={{ backgroundImage: `url('/images/hoverpint.png')` }} />
        <button className='w-[44px] h-[44px] bg-no-repeat absolute top-[5px] left-[50px] z-[7] opacity-100 group-hover:opacity-0' style={{ backgroundImage: `url('/images/waCrafter.png')` }} />
        <button className='w-[40px] h-[40px] bg-no-repeat absolute top-[5px] left-[55px] z-[7] opacity-0 group-hover:opacity-100' style={{ backgroundImage: `url('/images/hoverwa.png')` }} />
        
      </div>
    </div>
  );
}

export default ProductCard;

