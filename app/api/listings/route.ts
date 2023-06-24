import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';


export async function POST(
    request: Request, 
  ) {
    const currentUser = await getCurrentUser();
  
    if (!currentUser) {
      return NextResponse.error();
    }


  
    const body = await request.json();
    const { 
      brand,
      price,
      imageSrc,
      title,
      description,
      seatCount,
      windowCount,
      year,
      locationValue,
      typeBrand,
      maxSpeed,
      available
     } = body;
  
  
    const listing = await prisma.listing.create({
      data: {
        brand,
        price: parseInt(price, 10),
        imageSrc,
        title,
        description,
        seatCount,
        windowCount,
        year: parseInt(year),
        locationValue,
        typeBrand,
        maxSpeed,
        available,
        userId: currentUser.id
      }
    });

    if(!brand || !imageSrc){
      return NextResponse.error();
    }
  
    return NextResponse.json(listing);
  }
  