import AvatarPost from '@/components/Navbar/AvatarPost'
import React from 'react'
import { VscVerifiedFilled } from 'react-icons/vsc'

interface ListingCommentsProp {
  post: any
}

const ListingComments:React.FC<ListingCommentsProp> = ({post}) => {
  return (
    <div  className='my-12  w-full max-w-xl'>
      <div className='font-semibold text-xl mb-8'>
        Comments
      </div>
      {
        post.length === 0 && <div>
          <div className='italic text-lg text-accent-4'>No comments</div>
        </div>
      }
      <hr />
      {
        post.map((item : any) => (
          <div key={item.id} className='flex items-center gap-4 border-b border-secondary p-2'> 
              <AvatarPost imageSrc={item.image} />

              <div>
                <div className='text-xs text-accent-4 font-bold flex items-center gap-2'>
                  {item.userName} <VscVerifiedFilled color='green' />
                </div>
                <div className='text-base'>{item.body}</div>
              </div>
          </div>
        ))
      }
    </div>
  )
}

export default ListingComments