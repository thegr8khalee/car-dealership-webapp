import React from 'react';
// eslint-disable-next-line no-unused-vars
import m4 from '../images/m4.jpg';
import BlogCard from '../components/BlogCard';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/BreadCrumbs';
import { ArrowUpRight } from 'lucide-react';

const Blogs = () => {
  return (
    <div className="font-[poppins] bg-base-200">
      <div id="mobile" className="w-full">
        <section className="w-full bg-secondary pt-16 px-4 h-16 sticky top-0 z-50"></section>
        <section className="w-full px-4 pt-4">
          <div className="w-full max-w-6xl mx-auto">
            <Breadcrumbs />
            <div className="w-full flex justify-between items-end">
              <h1 className=" text-3xl font-bold">Blogs</h1>
              <div className="flex flex-shrink-0 items-center">
                <p className="text-sm text-gray-600 flex-shrink-0 pr-1">
                  Sort by
                </p>
                <select className="select border-0 bg-gray-200 select-xs max-w-30 sm:max-w-50">
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="year-asc">Year: Oldest to Newest</option>
                  <option value="year-desc">Year: Newest to Oldest</option>
                </select>
              </div>
            </div>
          </div>
        </section>
        <section
          id="blogs"
          className="w-full flex justify-center items-center px-4"
        >
          <div className="w-full max-w-6xl">
            <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <BlogCard
                publisher="John Doe"
                date="March 10, 2023"
                title="The Future of Electric Cars"
                tagline="Exploring the latest trends in electric vehicles."
                image={m4}
              />
              <BlogCard
                publisher="Jane Smith"
                date="March 12, 2023"
                title="Top 10 SUVs of 2023"
                tagline="A comprehensive guide to the best SUVs this year."
                image={m4}
              />
              <BlogCard
                publisher="Alice Johnson"
                date="March 15, 2023"
                title="How to Maintain Your Car"
                tagline="Essential tips for keeping your vehicle in top shape."
                image={m4}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blogs;
