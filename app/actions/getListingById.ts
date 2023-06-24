import prisma from '@/app/libs/prismadb'

interface IParams{
    listingId?: string
}

export default async function getListingById(
    params: IParams
){
    try {
        const { listingId } = params;
         
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            include:{
                user: true,
                comments: true,
            }
        });

        if(!listing){
            return null;
        }

        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            emailVerified: listing.user.emailVerified?.toISOString() || null,
            comments: listing.comments.map((comment : any) => ({
				...comment,
				createdAt: comment.createdAt.toISOString(),
				updatedAt: comment.updatedAt.toISOString(),
			})),
        }
    } catch(err : any){
        throw new Error(err);   
    }
}