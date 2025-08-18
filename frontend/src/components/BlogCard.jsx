import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const BlogCard = ({ publisher, date, title, tagline, image }) => {
  return (
    <div className="min-w-60 my-4 font-[poppins]">
      <figure>
        <img
          src={image}
          alt={title}
          className="w-full h-50 object-cover rounded-2xl"
        />
      </figure>
      <div className="flex w-full justify-baseline items-center">
        <div className=" py-2">
          <div className="flex space-x-4">
            <p className='text-sm'>{publisher}</p>
            <p className='text-sm'>{date}</p>
          </div>

          <div className="space-x-4">
            <b className="text-md">{title}:</b>{' '}
            <p className="line-clamp-1 text-md">{tagline}</p>
          </div>
        </div>
        <div>
          <button className='btn btn-circle btn-secondary text-white'>
            <ArrowUpRight className="size-10" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
