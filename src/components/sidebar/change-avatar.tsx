'use client';

import axios from "axios";
import { Loader } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { fetchProfile } from "@/lib/slices/user";
import { useAppDispatch, useAppSelector } from "@/lib/store";

import NextImage from "@/components/NextImage";

import { defaultAvatar } from "~/images";

const ChangeAvatar = () => {
  const { dataUser, token } = useAppSelector(state => state.user);
  const [avatar, setAvatar] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();


  const handleChangeAvatar = useCallback(async () => {
    if (avatar && avatar[0] && token) {
      try {
        setLoading(true);
        const bodyFormData = new FormData();
        bodyFormData.append("file", avatar[0]);
        bodyFormData.append("type", "OTHER_URL");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_MEDIA_URL}/image`,
          {
            method: "POST",
            headers: {
              Accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
            body: bodyFormData,
          },
        );
        const imgResponse = await response.json();
        const imageUrl = imgResponse.data.filename;
        await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/avatar`,
          {
            "avatar": imageUrl,
          },
          { headers: { "Authorization": `Bearer ${token}` } }
        );
        dispatch(fetchProfile(token));
      } catch (error) {
        toast.error("Failed to update avatar");
      } finally {
        setLoading(false);
      }
    }
  }, [avatar, token]);

  useEffect(() => {
    handleChangeAvatar();
  }, [avatar, handleChangeAvatar]);

  return (
    <div className='flex flex-col items-center gap-4 overflow-hidden rounded-lg border p-4 shadow-lg'>
      <p className='font-semibold text-[#1A214C]'>My profile picture</p>
      <NextImage
        src={dataUser?.avatar ?? defaultAvatar.src}
        width={98}
        height={98}
        alt='Avatar'
      />
      <label htmlFor="avatar" className='rounded-full bg-[#E4F6FB] py-2 font-semibold text-[#4065D1] w-full text-center cursor-pointer flex items-center justify-center'>
        {loading ? <Loader className='animate-spin' /> : "Change picture"}
      </label>
      <input id='avatar' type="file" className='hidden' accept='image/*' onChange={(e) => { setAvatar(e.target.files) }} />
    </div>
  )
}

export default ChangeAvatar;