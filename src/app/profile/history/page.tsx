/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { FaSpinner } from '@react-icons/all-files/fa/FaSpinner';
import { IoChevronDown } from '@react-icons/all-files/io5/IoChevronDown';
import axios from 'axios';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';
import { toast } from 'react-toastify';

import { useAppSelector } from '@/lib/store';

import { CrafterI, GetCarfterResI } from '@/interfaces/crafter.interfaces';

export default function HistoryProject() {
  const { token } = useAppSelector(state => state.user);
  const [history, setHistory] = React.useState<GetCarfterResI>();
  const [historyData, setHistoryData] = React.useState<CrafterI[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [params, setParams] = React.useState({
    page: 1,
    limit: 10,
  })

  const getHistory = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/crafter/my`,
        {
          headers: { "Authorization": `Bearer ${token}` },
          params
        }
      );
      setHistory(res.data);
      setHistoryData(prev => ([...prev, ...res.data.data]));
    } catch (error) {
      toast.error("Error get project history data")
    } finally {
      setLoading(false);
    }
  }

  const deleteProject = async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/crafter/crafter/my/${id}`,
        {
          headers: { "Authorization": `Bearer ${token}` },
        }
      );
      setParams({ page: 1, limit: 10 });
      getHistory();
    } catch (error) {
      toast.error('Delete failed');
    }
  }

  React.useEffect(() => {
    if (token) {
      getHistory();
    }
  }, [params.page, token]);

  return (
    <>
      <div className='flex w-full flex-col gap-2'>
        <table className='table-auto'>
          <thead>
            <tr className='text-left text-[#1A214C]'>
              <th>Project</th>
              <th>View Project</th>
              <th>Status</th>
              <th>Drizy Coin</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className='text-[#1A214C]'>
            {!loading && history ?
              historyData.map(item =>
                <tr key={item.id}>
                  <td>
                    <Image
                      src={item.imageUrl}
                      alt='image'
                      width={150}
                      height={85}
                      className='h-[85px] w-[150px] object-cover'
                    />
                  </td>
                  <td>
                    <button className='rounded-full bg-[#008ECC] px-10 py-2 font-semibold text-[#e4f6fb]'>
                      View
                    </button>
                  </td>
                  <td>
                    <p
                      className={item.status === 'Pending' ? "text-[#AAAAAA]" : item.status === "Approved" ? "text-[#61A9FA]" : "text-[#D00000]"}
                    >
                      {item.status}
                    </p>
                  </td>
                  <td>
                    <p>{item.coin}</p>
                  </td>
                  <td>
                    <button onClick={() => deleteProject(item.id)} className='rounded-full bg-[#008ECC] px-10 py-2 font-semibold text-[#e4f6fb]'>
                      Delete
                    </button>
                  </td>
                </tr>
              )
              :
              <tr>
                <td rowSpan={5} colSpan={5} className='flex w-full items-center justify-center'>
                  <FaSpinner className='animate-spin' />
                </td>
              </tr>
            }
          </tbody>
        </table>
        <div className='mt-8 flex w-full justify-center'>
          <div onClick={() => { setParams(prev => ({ ...prev, page: prev.page + 1 })) }} className='flex items-center justify-center cursor-pointer text-center mt-10'>
            {loading
              ? <Loader className='animate-spin' />
              :
              <div className='flex flex-row gap-1 items-center justify-center transition-all hover:text-white bg-white hover:bg-[#61A9FA] rounded-full px-3 py-1 border-black border'>
                <p>Load More</p>
                <IoChevronDown />
              </div>}
          </div>
        </div>
      </div>
    </>
  );
}
