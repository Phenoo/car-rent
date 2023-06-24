import prisma from "@/app/libs/prismadb"

export interface IListingsParams {
    userId? : string;
    brand?: string;
    price?: number;
    year?: string;
    company?: string;
}

export default async function getListings(
    params: IListingsParams
){
    try{

        const { userId, brand, price, year} = params;

        let query: any = {};

        if(userId){
            query.userId = userId;
        }

        if(brand) {
            query.brand = brand;
        }

        if(year){
            query.year = parseInt(year);
        }
  

        if(price){
            query.price = {
                gte: +price
            };
        }

        const listings = await prisma.listing.findMany({
            where : query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeListings = listings.map((listing) =>  ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }))

        return safeListings;

    } catch(err : any) {
        throw new Error(err)
    }
}