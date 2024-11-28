import React,{useState,useEffect} from 'react'
import { Container,PostCard } from '../components'
import appwriteService from '../appwrite/config'

function AllPosts() {
    const [posts , setPosts]=useState([])
    useEffect(()=>{
        appwriteService.getPosts([]).then((post)=>{
            if(post){
            setPosts(post.documents)
        }
        })
    },[])
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post)=>(
                    <div key={post.$id}>
                    <PostCard post={post}/>
                    </div>
                )

                )}

            </div>
        </Container>
    </div>
  )
}

export default AllPosts