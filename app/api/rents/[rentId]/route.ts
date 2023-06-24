import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb';

interface IParams {
    rentId?: string;
}

export async function DELETE(
    request: Request,
    { params } : {params: IParams}
){
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { rentId} = params;

    if(!rentId || typeof rentId !== 'string') {
        throw new Error('Invalid ID')
    }

    const rent = await prisma.rent.deleteMany({
        where: {
            id: rentId,
            OR: [
                {userId: currentUser.id},
                { listing :  { userId: currentUser.id} }
            ]
        }
    });

    return NextResponse.json(rent)
}