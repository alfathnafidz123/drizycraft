import {
  avatarExample,
  project1,
  projectStars,
  projectLike,
  projectShare1,
} from "~/images";

import PopoverShare from "@/components/modals/popover";

const Project = () => {
  return (
  <div className="flex flex-col px-8 py-4 bg-white rounded-xl shadow-lg cursor-pointer w-[369px] h-[456px]">
    <div className="flex gap-3 items-center text-[#1A204C] text-[14px]">
          <img loading="lazy" src={avatarExample.src} className=" w-[39px]"/>
          <div className="">By</div>
          <div className="font-katide-bold">Michelle</div>
    </div>
    <div className="relative mt-4 w-306 h-206">
      <img loading="lazy" src={project1.src} className=" w-full h-auto rounded-lg"/>
      <div className="opacity-0 absolute inset-0 font-katide-bold text-white flex items-center justify-center rounded-lg bg-black/50 hover:opacity-100">Click for detail</div>
    </div>
    <div className="flex justify-between">
      <div className="flex mt-5">
        <img loading="lazy" src={projectStars.src} className="my-auto"/>
        <img loading="lazy" src={projectStars.src} className="my-auto"/>
        <img loading="lazy" src={projectStars.src} className="my-auto"/>
        <img loading="lazy" src={projectStars.src} className="my-auto"/>
        <img loading="lazy" src={projectStars.src} className="my-auto"/>
      </div>
        <div className="flex gap-5 justify-between mt-5 text-center ">
          <div className="flex flex-col w-[39px]">
            <div className=" bg-[#A5272B] rounded-full h-[39px] flex items-center hover:bg-[#872A2D]">
            <img  loading="lazy" src={projectLike.src} className="mx-auto h-[20px] hover:scale-110 transition-all duration-300"/>
            </div>
            <div className=" text-indigo-950 text-xs font-katide-bold">Like</div>
          </div>
          <PopoverShare/>
        </div>
      </div>
    <div className="mt-5 font-katide-regular text-indigo-950 line-clamp-3">
      Loved being able to purchase a bundle of SVG’s and not having to spend
      hours creating it myself. Thank you!
    </div>
  </div>
  );
}

export default Project;