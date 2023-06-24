import React, { useMemo, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import useRentModal from '@/app/hooks/useRentModal'


import Modal from './Modal'

import Step from '../Step';
import Header from '../Header';
import { cars } from '../Categories';
import CategoryInput from '../inputs/CategoryInput';
import Input from '../inputs/Input';
import Counter from '../inputs/Counter';
import ImageUpload from '../inputs/ImageUpload';
import CheckboxDemo from '../inputs/Checkbox';



enum STEPS {
    BRAND = 1,
    INFO = 2, 
    IMAGES = 3,
    FINAL = 4,
}


const RentModal = () => {
    const rentModal = useRentModal();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(STEPS.BRAND)

    const { register,  handleSubmit, setValue, watch,  formState: {errors}, reset} = useForm<FieldValues>({
            defaultValues: {
                brand: '',
                price: 0,
                imageSrc: '',
                title: '',
                description: '',
                seatCount: 2,
                windowCount: 2,
                year: 2023,
                locationValue: 'Lagos',
                typeBrand: 'new',
                maxSpeed: '',
                available: false
            }
        });

        const brand = watch('brand');
        const imageSrc = watch('imageSrc');
        const seatCount = watch('seatCount');
        const windowCount = watch('windowCount');
        const available = watch('available');
        const year = watch('year')

        const setCustomValue = ( id: string, value: any) => {
            setValue(id, value, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
            })
        }

        const onBack = () => {
            setStep((value) => value - 1)
        }

        const onNext = () => {
            setStep((value) => value + 1)
        }

        const onSubmit: SubmitHandler<FieldValues> = (data) => {
            if(step !== STEPS.FINAL){
                return onNext();
            }

            axios.post('/api/listings', data)
            .then(() => {
                toast.success("Listing Added!");
                router.refresh();
                reset();
                setStep(STEPS.BRAND)
                rentModal.onClose();
            })
            .catch((err) => {
                toast.error(err)
            })
            .finally(() => {
                setIsLoading(false);
            })
        }

        const actionLabel = useMemo(() => {
            if (step === STEPS.FINAL){
                return 'Create'
            }
            return 'Next'
        }, [step]);

        const secondaryActionLabel = useMemo(() => {
            if(step === STEPS.BRAND){
                return undefined
            }
            return 'Back'
        }, [step]);

        const stepsHead = (
            <div>
                <div className='flex flex-row justify-between mb-4'>
                    <Step step={1} currentStep={step}/>
                    <Step step={2} currentStep={step}/>
                    <Step step={3} currentStep={step}/>
                    <Step step={4} currentStep={step}/>
                </div>
            </div>

        )


    let bodyContent = (
            <div className='flex flex-col gap-4'>
                <Header
                    title='Which brand is your car?'
                    subtitle='Pick a brand'
                />
                <div className='
                  grid 
                  grid-cols-2
                  gap-3
                  max-h-[55vh]
                  overflow-y-auto
                '>
                    {
                        cars.map((car) => (
                            <div key={car.name} className='col-span-1'>
                                <CategoryInput
                                   onClick={(brand) => 
                                     setCustomValue('brand', brand)}
                                     selected={brand === car.name}
                                     label={car.name}
                                     logo={car.logo}
                                
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
     )

    if(step === STEPS.INFO) {
            bodyContent = (
            <div>
                <Header 
                    title='Tell us more about the car'
                    subtitle='What are the spcifications of the car'
                />
                <div className='flex flex-col gap-4 mt-4'>
                    <Input 
                        id='title'
                        label='Name of the car'
                        register={register}
                        disabled={isLoading}
                        errors={errors}
                        required
                    />
                    <Input 
                        id='description'
                        label='Description of the car'
                        register={register}
                        disabled={isLoading}
                        errors={errors}
                        required
                    />
                    <Input
                        id='year'
                        type='number'
                        label='Model Year'
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    
                        
                    /> 
                    <div className='flex flex-col gap-2'>
                        <Counter  
                            onChange={(value) => setCustomValue('seatCount', value)}
                            value={seatCount}
                            title='Seats'
                            subtitle='How many seats does it have?'
                        />
                        <hr />
                        <Counter  
                            onChange={(value) => setCustomValue('windowCount', value)}
                            value={windowCount}
                            title='Windows'
                            subtitle='How many window does it have?'
                        />
                    </div>
                </div>
            </div>
        )
    }
    if(step === STEPS.IMAGES) {
            bodyContent = (
            <div>
                <Header
                    title='Add a phot of the car'
                    subtitle='Share a photo of the car'
                />
                <div className='flex flex-col gap-4'>
                    <ImageUpload 
                      onChange={(value) => setCustomValue('imageSrc', value)}
                      value={imageSrc}
                    />

                </div>
            </div>
        )
    }
    if(step === STEPS.FINAL) {
        bodyContent = (
        <div>
            <Header
                title='Now set your price'
                subtitle='How much could charge per day?'
            />
            <div className='mt-4 flex flex-col gap-8'>
                <Input
                    id='price'
                    type='number'
                    label='Price'
                    disabled={isLoading}
                    errors={errors}
                    register={register}
                    required
                />
                <Input
                    id='maxSpeed'
                    label='Max Speed (km/hr)'
                    type='number'
                    disabled={isLoading}
                    errors={errors}
                    register={register}
                    required
                />
                <div className='flex gap-4 items-center'>
                    <input type="checkbox" placeholder="Automatic" {...register("available", {required: true})} />
                    <label className='text-lg'>Automatic</label>
                </div>


                
                
            </div>
        </div>
    )
}
  return (
    <Modal 
        isOpen={rentModal.isOpen}
        title='Rent your car'
        actionLabel={actionLabel}
        disabled={isLoading}
        onSubmit={handleSubmit(onSubmit)}
        secondaryActionLabel={secondaryActionLabel}
        onClose={rentModal.onClose}
        secondaryAction={step === STEPS.BRAND ? undefined : onBack}        
        body={bodyContent}
        stepsHead={stepsHead}
    />
  )
}

export default RentModal