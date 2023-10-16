import React from 'react'

const Page = () => {
  return (
    <form className='font-poppins mb-100 w-full'>
      <h1 className=' pt-[150px] m-[100px] text-[40px] font-bold'>
        Get In Touch
      </h1>

      <div className='m-[100px] flex justify-between gap-[100px]'>

        <div className="flex flex-col">

          <span className="font-semibold text-[20px] mb-[20px]">Fullname  </span>
          <input type="text" className='w-[600px] h-[70px] rounded-[12px] bg-[#D9D9D9]' />

          <span className="font-semibold text-[20px] mt-[10px] mb-[10px]">Email</span>
          <input type="email" className="w-[600px] h-[70px] rounded-[12px] bg-[#D9D9D9]" ></input>

          <span className="font-semibold text-[20px] mt-[10px] mb-[10px]">Message</span>
          <textarea className="w-[600px] h-[150px] rounded-[12px] bg-[#D9D9D9]"> </textarea>

          <button className="mt-[30px] font-semibold text-[20px] rounded-[12px] w-[200px] h-[50px] bg-[#D9D9D9]">Submit</button>
        </div>


        <div className=" w-[530px] h-[435px] border-[1px] border-black rounded-[12px] m-auto flex">

          <span className="font-semibold text-[20px] m-auto">
            Gambar/3D Illustration
          </span>

        </div>

      </div>

      <div className="m-[110px] mb-[100px] justify-between flex gap-[119px] ">
        <div className="w-[327px] h-[199px] bg-[#D9D9D9] rounded-[12px] flex ">
          <span className="font-medium text-[20px] m-auto">Number</span>
        </div>

        <div className="w-[327px] h-[199px] bg-[#D9D9D9] rounded-[12px] flex ">
          <span className="font-medium text-[20px] m-auto">Location</span>
        </div>

        <div className="w-[327px] h-[199px] bg-[#D9D9D9] rounded-[12px] flex ">
          <span className="font-medium text-[20px] m-auto">Email</span>
        </div>

      </div>

    </form>
  )
}

export default Page