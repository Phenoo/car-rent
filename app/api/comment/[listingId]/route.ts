import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb';


interface IParams {
    listingId?: string;
}


export async function POST(
    request: Request, { params } : {params: IParams}
){
    const currentUser = await getCurrentUser();


    if (!currentUser) {
        return NextResponse.error()
    }

    const { listingId  } = params;

    if(!listingId || typeof listingId !== 'string'){
        throw new Error(`Invalid listing`)
    }

    const body = await request.json();

    const { bodyPost} = body;

    const comment = await  prisma.comment.create({
        data: {
            body: bodyPost,
            userId: currentUser?.id,
            image: currentUser?.image,
            userName: currentUser?.name,
            listingId,
        },
    });

    const post = await prisma.listing.findUnique({
        where: {
            id: listingId,
        }
    });

    if(!post) {
        throw new Error('Invalid Id') 
    }

    let updatedCommentedIds = new Set(post.commentedIds);
    updatedCommentedIds.add(currentUser?.id)


    return NextResponse.json({ comment })
}