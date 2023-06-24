"use client"
import React from 'react'
import { usePathname, useSearchParams } from 'next/navigation'


import Container from './Container'


import mercedes from '@/components/images/Mercedes.png'
import Bmw from '@/components/images/bmw-logo.png'
import cadillac from '@/components/images/cadillac-logo.png'
import chevrolet from '@/components/images/chevrolet-logo.png'
import ferrari from '@/components/images/ferrari-logo.png'
import ford from '@/components/images/ford-logo.png'
import hyundai from '@/components/images/hyundai-logo.png'
import kia from '@/components/images/kia-logo.png'
import lamborghini from '@/components/images/lamborghini-logo.png'
import mitsubishi from '@/components/images/mitsubishi-logo.png'
import nissan from '@/components/images/nissan-logo.png'
import peugeot from '@/components/images/peugeot-logo.png'
import suzuki from '@/components/images/suzuki-logo.png'
import tesla from '@/components/images/tesla-logo.png'
import toyota from '@/components/images/toyota-logo.png'
import volkswagen from '@/components/images/volkswagen-logo.png'
import honda from '@/components/images/honda.png'
import audi from '@/components/images/audi.png'

import CategoryBox from './CategoryBox'

export const cars = [
  {
    name: "Audi",
    description: 'Audi is a luxury automobile manufacturer known for its performance and elegant design.',
    logo: audi
  },
    {
      name: 'Mercedes',
      description: 'Mercedes is a luxury automobile manufacturer known for its performance and elegant design.',
      logo: mercedes
    },
    {
      name: 'BMW',
      description: 'BMW is a luxury automobile manufacturer known for its performance and elegant design.',
      logo: Bmw
    },
    {
      name: 'Cadillac',
      description: 'Cadillac is an American luxury vehicle brand recognized for its comfort and advanced technology.',
      logo: cadillac
    },
    {
      name: 'Chevrolet',
      description: 'Chevrolet is a renowned American automotive brand offering a wide range of vehicles for different purposes.',
      logo: chevrolet
    },
    {
      name: 'Ferrari',
      description: 'Ferrari is an iconic Italian sports car manufacturer associated with high-performance and racing heritage.',
      logo: ferrari
    },
    {
      name: 'Ford',
      description: 'Ford is an American automaker recognized for its diverse lineup of vehicles, including cars, trucks, and SUVs.',
      logo: ford
    },
    {
      name: 'Hyundai',
      description: 'Hyundai is a global automotive brand known for its reliable vehicles with modern features at an affordable price.',
      logo: hyundai
    },
    {
      name: 'Honda',
      description: 'Honda is a global brand known for its reliability',
      logo: honda
    },
    {
      name: 'Kia',
      description: 'Kia is a South Korean automobile manufacturer offering stylish and value-packed vehicles across various segments.',
      logo:kia
    },
    {
      name: 'Lamborghini',
      description: 'Lamborghini is an Italian luxury sports car manufacturer renowned for its striking design and exhilarating performance.',
      logo: lamborghini
    },
    {
      name: 'Mitsubishi',
      description: 'Mitsubishi is a Japanese automotive brand known for its durable vehicles and innovative technologies.',
      logo: mitsubishi
    },
    {
      name: 'Nissan',
      description: 'Nissan is a multinational automaker offering a wide range of vehicles, including electric and sports cars.',
      logo: nissan
    },
    {
      name: 'Peugeot',
      description: 'Peugeot is a French automotive manufacturer known for its stylish cars, including compact, SUV, and electric models.',
      logo: peugeot
    },
    {
      name: 'Suzuki',
      description: 'Suzuki is a Japanese automotive brand recognized for its compact cars, motorcycles, and outboard motors.',
      logo: suzuki
    },
    {
      name: 'Tesla',
      description: 'Tesla is an American electric vehicle and clean energy company that designs and manufactures innovative electric cars.',
      logo: tesla
    },
    {
      name: 'Toyota',
      description: 'Toyota is a leading Japanese automaker known for its reliable vehicles, hybrid technology, and commitment to sustainability.',
      logo: toyota
    },
    {
        name: 'Volkswagen',
        description: 'Volkswagen is a leading Japanese automaker known for its',
        logo: volkswagen
    }
  ];
  
  

const Categories = () => {
    const searchParams  = useSearchParams();
    const brand = searchParams?.get('brand');
    const pathname = usePathname();
    const isMainPage = pathname === '/'

    if(!isMainPage){
        return null
    }
  return (
    <div className='max-6xl lg:mx-12 md:mx-8 sm:mx-6 mx-4 py-4'>
    <div className='
      flex
      flex-row
      gap-4
      justify-between
      overflow-x-auto
      categories
    '>
        {
            cars.map((car) => (
                <CategoryBox key={car.name}
                    label={car.name}
                    logo={car.logo}
                    selected={brand === car.name}
                />
            ))
        }
    </div>
   </div>
  )
}

export default Categories