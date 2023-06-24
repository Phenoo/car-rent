"use client"

import React from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { AiFillCheckSquare } from 'react-icons/ai';

interface CheckboxProps {
    value: boolean;
    onChange: (e : any) => void;
}

const CheckboxDemo:React.FC<CheckboxProps> = ({onChange, value}) => (
    <div className="flex items-center mt-4">
      <Checkbox.Root
        className="flex justify-center items-center h-[25px] w-[25px] appearance-none rounded-[4px] bg-white border-2 outline-none "
        defaultChecked
        id="c1"
        onChange={onChange}
      >
        <Checkbox.Indicator className="text-violet11">
          <AiFillCheckSquare size={30} />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label className="pl-[15px] text-[15px] leading-none text-primary" htmlFor="c1">
        Automatic
      </label>
    </div>
);

export default CheckboxDemo;