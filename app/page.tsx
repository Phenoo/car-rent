export const dynamic = 'force-dynamic'



import getListings, { IListingsParams } from "./actions/getListings"
import getCurrentUser from "./actions/getCurrentUser";


import Header from "@/components/Header";
import Container from "@/components/Container";
import ListingCard from "./listings/ListingCard";
import NothingFound from "@/components/NothingFound";
import { Suspense } from "react";


interface HomeProps{
  searchParams: IListingsParams;
}

const Home = async ({searchParams} : HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if( listings.length === 0) {
    return (
      <NothingFound />
    )
  }
  return (
   <main>
    <Container>
      <Header 
        title="Available Cars"
        subtitle="wheels that you want"

      />
      <Suspense fallback={<NothingFound />}>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 gap-y-8">
        {
          listings.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
              />
          ))
        }
      </div>
      </Suspense>

    </Container>
   </main>
  )
}


export default Home;