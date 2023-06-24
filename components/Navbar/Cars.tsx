"use client"

import React, { useState } from 'react';
import Select from 'react-select';
import { cars } from '../Categories';
import Image from 'next/image';

const CarSelectButton = ({brand, setBrand} : any ) => {
  const [selectedCar, setSelectedCar] = useState(null);

  const handleCarChange = (selectedOption: any) => {
    setBrand(selectedOption.value);
    setSelectedCar(selectedOption);
  };

  const carOptions = cars.map((car) => ({
    value: car.name,
    label: car.name,
    logo:  car.logo
  }));

  return (
    <div>
      <label htmlFor="brandSelect" className='text-xl font-semibold mt-2'>Select a brand</label>

      <Select
        value={selectedCar}
        onChange={handleCarChange}
        options={carOptions}
        placeholder="Select a brand"
        formatOptionLabel={(option: any) => (
            <div className="
            flex flex-row items-center gap-3 ">
                <Image src={option.logo} alt='select-car' width={40} height={40} />
              <div className='text-base'>
                {option.label}
              </div>
            </div>
          )}
          classNames={{
            control: () => 'p-3 border-2',
            input: () => 'text-lg',
            option: () => 'text-lg'
          }}
      />
    </div>
  );
};

export default CarSelectButton;
