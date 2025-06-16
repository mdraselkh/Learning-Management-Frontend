import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCard = ({ category, img, title, date,border }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  return (
    <Link href={`/blog/${title
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")}`} className="cursor-pointer relative group">
    <div className={`xl:w-[380px] xl:h-[480px] bg-white rounded shadow-md overflow-hidden ${border? 'border border-gray-300' : ''}`}>
      <div className="relative w-full h-[280px] overflow-hidden">
        <Image
          src={img}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          width={500}
          height={500}
        />
      </div>
      <div className="flex flex-col items-start justify-between gap-5 px-8 py-7">
        <h2 className="text-black text-sm uppercase">{category}</h2>
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="text-gray-400 text-base">{formatDate(date)}</span>
      </div>
    </div>
    </Link>
  );
};

export default BlogCard;
