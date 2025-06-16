'use client'
import React, { use, useEffect, useState } from 'react'
import EditBlogForm from '../../_components/EditBlogForm'
import axios from 'axios';
import Loading from '@/app/loading';

const page = ({params}) => {
    const unwrappedParams = use(params);
    const { blogId } = unwrappedParams;
    const [blog, setBlog] = useState([]);
    const [loading, setLoading] = useState(null);
    console.log(blogId);

    useEffect(()=>{
        const fetchBlogData= async ()=>{
            try {
                setLoading(true);
                const response = await axios.get(
                  `http://localhost:5000/api/blog/getBlog/${blogId}` // Replace with your actual API endpoint
                );
                console.log(response.data.data);
          
                setBlog(response.data.data);
              } catch (error) {
                console.error("Error fetching blog list:", error);
              } finally {
                setLoading(false);
              }
        }
        if(blogId){
            fetchBlogData();
        }
    },[]);

    if (loading) {
        return <Loading />;
      }

  return (
    <div>
        <EditBlogForm blog={blog}/>
    </div>
  )
}

export default page