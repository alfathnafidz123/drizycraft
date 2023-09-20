'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

import Button from '@/components/buttons/Button';

import { CountryInterface } from '@/interfaces/dashboard.interfaces';

const DashboardPage = () => {
  const [, setGelas] = useState('');
  const [countries, setCountries] = useState<Array<CountryInterface>>([]);

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    // console.log('isi data state countries: ', countries);
  }, [countries]);

  const getCountries = async () => {
    const resp = await axios.get(
      'https://api-dev.talentvibes.io/api/master-data/country?search=&size=50'
    );
    setCountries(resp.data.data);
  };

  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <Button
        onClick={() => {
          setGelas('kopi');
        }}
      >
        tombol ubah gelas
      </Button>
    </div>
  );
};

export default DashboardPage;
