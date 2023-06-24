import React, { useState } from 'react';
import Select from 'react-select';

const YearSelect = ({year, setYear} : any) => {
  

  const handleChange = (selectedOption : any) => {
    setYear(selectedOption.value);
  };

  const yearOptions = [];
  for (let year = 1980; year <= 2023; year++) {
    yearOptions.push({ value: year, label: year });
  }

  return (
    <div>
      <label htmlFor="yearSelect" className='text-xl font-semibold mt-2'>Select a Year</label>
      <Select
        id="yearSelect"
        value={yearOptions.find((option) => option.value === year)}
        onChange={handleChange}
        options={yearOptions}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        
        />
    </div>
  );
};

export default YearSelect;
