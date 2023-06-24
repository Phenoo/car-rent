import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}


export default async function getRents(
    params: IParams
){
    try{

        const { listingId, userId, authorId} = params;

        const query : any = {};

        if(listingId){
            query.listingId = listingId;
        };

        if(userId){
            query.userId = userId;
        }

        if(authorId){
            query.listing = { userId: authorId }
        }

        const rents = await prisma.rent.findMany({
            where: query,
            include: {
                listing: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeRent = rents.map((rent) => ({
            ...rent,
            createdAt: rent.createdAt.toISOString(),
            startDate: rent.startDate.toISOString(),
            endDate: rent.endDate.toISOString(),
            listing: {
                ...rent.listing,
                createdAt: rent.listing.createdAt.toISOString()
            }
        }));

        return safeRent;
    } catch(err : any) {
        throw new Error(err);
    }
}