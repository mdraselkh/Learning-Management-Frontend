import React from 'react'
import CategoryPage from '../_components/CategoryPage';
import { notFound } from 'next/navigation';


const page = async ({params}) => {
    const {categoryName}= await params;

    const validCategoryName = ["design","development","finance",'management'];
    const isvalidCategoryName = validCategoryName.includes(categoryName);
  
    if (!isvalidCategoryName) {
      notFound();
    }

  return (
    <div>
        <CategoryPage categoryName={categoryName} />
    </div>
  )
}

export default page