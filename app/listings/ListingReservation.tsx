import React from 'react'
import { Range } from 'react-date-range';
import { TbEqual } from 'react-icons/tb';
import { PaystackButton } from 'react-paystack';

import Calendar from '@/components/inputs/Calendar';
import { SafeUser } from '../types';

interface ListingRentProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
  currentUser?: SafeUser | null
}

const ListingReservation:React.FC<ListingRentProps> = ({
  price, dateRange, totalPrice, onChangeDate, disabled, onSubmit, disabledDates, currentUser
}) => {
  const config = {
    reference: (new Date()).getTime().toString(),
    email: `${currentUser?.email}`,
    amount: totalPrice * 1000,
    publicKey: "pk_test_d5ef29d5385867d007e7547034857f175027f699",
  };

  const handlePaystackSuccessAction = (reference : any) => {
    console.log(reference);
    onSubmit();
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    console.log('closed')
  }

  const componentProps = {
      ...config,
      text: 'Rent the car',
      onSuccess: (reference: any) => handlePaystackSuccessAction(reference),
      onClose: handlePaystackCloseAction,
  };

  return (
    <div className='my-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div>
          <div className='font-semibold'>
            To rent this car above, remember;
          </div>
          <div className='italic text-sm text-accent-4 bg-accent-1 px-4 py-6 rounded-md my-6'>
            - Return the car on the specified date and time to the agreed drop-off location. <br />
            - Ensure the vehicle is in the same condition as when you received it. <br />
            - Refuel the car, following the agreed-upon fuel policy. <br />
          </div>
          <div>
              <div className='flex items-center gap-4'>
                <TbEqual size={30}/>
                    <div className='text-2xl sm:text-3xl md:text-5xl font-semibold'>
                        $ {price} <span className='text-accent-4 text-sm font-normal'>per day</span>
                    </div>
                </div>
          </div>
        </div>
        <Calendar 
          value={dateRange}
          disabledDates={disabledDates}
          onChange={(value) => 
            onChangeDate(value.selection)
          }
        />
      </div>

      <div 
        className="
          p-4 
          flex 
          flex-row 
          items-center 
          justify-between
          font-semibold
          text-lg
        "
      >
        <div>
          Total
        </div>
        <div>
          $ {totalPrice}
        </div>
      </div>
      <br />
      <div className='flex justify-end items-end mb-8'>
        {

          <PaystackButton {...componentProps} className='py-2 px-8 capitalize bg-orange text-white rounded-md flex items-end hover:opacity-75 transition-all hover:ring-2 hover:ring-orange' />
        }        
      </div>
      
    </div>

  )
}

export default ListingReservation