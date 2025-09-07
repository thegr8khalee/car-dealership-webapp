import React from 'react';
// eslint-disable-next-line no-unused-vars
import m4 from '../images/m4.jpg';
import BlogCard from '../components/BlogCard';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/BreadCrumbs';
import { ArrowUpRight, ChevronLeft, Loader2 } from 'lucide-react';
import { useBlogStore } from '../store/useBlogStore';
import { useEffect } from 'react';

const Blogs = () => {
  const {blogs, fetchBlogs, error, isLoading, pagination} = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handlePageChange = (page) => {
    // Pass the page number inside an object to match the getCars function's signature
    fetchBlogs({ page });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-primary" />
      </div>
    );
  }

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
              {!isLoading && !error ? (
                blogs && blogs.length > 0 ? (
                  blogs.map((blog) => (
                    <BlogCard
                      key={blog.id}
                      publisher={blog.author || 'Unknown'}
                      date={new Date(blog.createdAt).toLocaleDateString()}
                      title={blog.title}
                      tagline={blog.tagline}
                      image={blog.imageUrl || m4}
                      link={`/blog/${blog.id}`}
                    />
                  ))
                ) : (
                  <p className="text-center col-span-full">
                    No blogs available.
                  </p>
                )
              ) : null}
            </div>
          </div>
        </section>
        <section className='w-full py-8 flex justify-center'>
          {/* Pagination Controls */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center gap-2">
              {/* Go to Page 1 button */}
              {pagination.totalPages > 3 && pagination.currentPage > 3 && (
                <button
                  onClick={() => handlePageChange(1)}
                  className="btn btn-circle btn-primary"
                >
                  1
                </button>
              )}

              {/* Prev Button */}
              {pagination.currentPage > 1 && (
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  className="btn btn-circle btn-primary"
                >
                  <ChevronLeft className="size-5 text-white" />
                </button>
              )}

              {/* Page Numbers */}
              {[...Array(pagination.totalPages)]
                .map((_, index) => index + 1)
                .filter(
                  (page) =>
                    page >= pagination.currentPage - 2 &&
                    page <= pagination.currentPage + 2
                )
                .map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`btn btn-circle ${
                      page === pagination.currentPage
                        ? 'btn-primary text-white btn-circle'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}

              {/* Next Button */}
              {pagination.currentPage < pagination.totalPages && (
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  className="btn rounded-full btn-primary"
                >
                  Next
                </button>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Blogs;
