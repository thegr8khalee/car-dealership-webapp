import React from 'react';
import Breadcrumbs from '../components/BreadCrumbs';
import ceo from '../images/ceo.jpg'; // Example image import, replace with actual image path
import bmwm4 from '../images/BMWM4.png'; // Example image import, replace with actual image path
import { Check, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import m4 from '../images/m4.jpg'; // Example image import, replace with actual image path
import BlogCard from '../components/BlogCard';
import { useBlogStore } from '../store/useBlogStore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCarStore } from '../store/useCarStore';
const BlogDetail = () => {
  const { id } = useParams();
  const { currentBlog, isLoading, error, fetchBlogById } = useBlogStore();
  const { getCarById, pagination: carPagination, isLoading: loadingCars } = useCarStore();
  useEffect(() => {
    fetchBlogById(id);
  }, [fetchBlogById, id]);

  console.log('Current Blog:', currentBlog);

  if (isLoading || loadingCars) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error loading blog: {error}</p>
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
            <div className="flex">
              <h1 className=" text-3xl font-bold capitalize">
                {currentBlog.currentBlog?.title}:
              </h1>
              <span className=" text-3xl font-medium ml-2">
                {currentBlog.currentBlog?.tagline}
              </span>
            </div>
            <div className="flex my-2 space-x-4 items-center">
              <img
                src={currentBlog?.author?.avatarUrl}
                alt="CEO"
                className="rounded-full h-15 w-15 object-cover"
              />
              <h1 className="text- font-semibold">Admin</h1>
              <span className="text-sm text-gray-500">Sport/Race</span>
              <span className="text-sm text-gray-500">March 10, 2023</span>
            </div>
          </div>
        </section>
        <section className="w-full px-4">
          <figure className="w-full max-w-4xl mx-auto">
            <img
              src={currentBlog?.featuredImage || bmwm4}
              alt="Blog"
              className="w-full h-full max-h-[60vh] object-cover rounded-2xl"
            />
          </figure>
        </section>
        <section id="text" className="w-full px-4 flex justify-center">
          <div className="w-full max-w-4xl">
            <div
              className="my-4 prose max-w-none capitalize"
              dangerouslySetInnerHTML={{
                __html:
                  currentBlog?.content ||
                  '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam aliquam modi fugit magnam. Eius repudiandae placeat eveniet, fugiat iusto quasi officiis est modi accusantium cupiditate, fugit debitis velit dolorem quod!</p>',
              }}
            ></div>

            <hr className="border-t border-gray-300 my-8" />
            <div>
              {currentBlog?.tags && currentBlog?.tags.length > 0 && (
                <div className="my-6">
                  <h3 className="text-lg font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentBlog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="badge badge-primary badge-outline rounded-full px-3 py-2 capitalize"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <hr className="border-t border-gray-300 my-8" />
            <figure className="w-full max-w-4xl mx-auto">
            <img
              src={currentBlog?.imageUrl}
              alt="Blog"
              className="w-full h-full max-h-[60vh] object-cover rounded-2xl"
            />
          </figure>
            <div className="w-full border-t border-gray-300 my-6 border-b py-4 flex justify-between">
              <div className="flex">
                <ChevronLeft className="size-10 text-gray-600" />
                <div className="flex flex-col ml-2">
                  <span className="text-sm text-gray-600">
                    Previous Post Title
                  </span>
                  <span className="text-xs text-gray-400">March 10, 2023</span>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col ml-2">
                  <span className="text-sm text-gray-600">Next Post Title</span>
                  <span className="text-xs text-gray-400">March 10, 2023</span>
                </div>
                <ChevronRight className="size-10 text-gray-600" />
              </div>
            </div>
            <div className="w-full my-6">
              <h1 className="text-xl font-semibold my-6"> Top Comments</h1>
              <div className="flex flex-col w-full my-4">
                <div className="flex flex-col max-w-md justify-between ">
                  <div className="text-lg font-medium">Name Surname</div>
                  <div className="text-sm">Date</div>
                </div>
                <p className="text-sm my-1">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Consequatur veniam dolorum, neque quas debitis, dicta maiores
                  quibusdam necessitatibus, eaque vero nisi magnam nobis sit
                  deserunt saepe voluptatibus minima eius asperiores!
                </p>
              </div>
              <div className="flex flex-col w-full my-4">
                <div className="flex flex-col max-w-md justify-between ">
                  <div className="text-lg font-medium">Name Surname</div>
                  <div className="text-sm">Date</div>
                </div>
                <p className="text-sm my-1">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Consequatur veniam dolorum, neque quas debitis, dicta maiores
                  quibusdam necessitatibus, eaque vero nisi magnam nobis sit
                  deserunt saepe voluptatibus minima eius asperiores!
                </p>
              </div>
              <div className="border-t border-gray-300 pb-4">
                <h1 className="text-xl font-semibold my-6">Leave a Comment</h1>
                <form className="space-y-4">
                  {/* Name */}
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      // value={testDriveFormData.name}
                      // onChange={handleTestDriveChange}
                      className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                      placeholder=" "
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-3 text-gray-400 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary"
                    >
                      Your Name
                    </label>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      // value={testDriveFormData.email}
                      // onChange={handleTestDriveChange}
                      className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                      placeholder=" "
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-3 text-gray-400 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary"
                    >
                      Your Email
                    </label>
                  </div>

                  {/* Date */}
                  <div className="relative">
                    <textarea
                      name="text"
                      // value={testDriveFormData.text}
                      // onChange={handleTestDriveChange}
                      className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                      placeholder=" "
                    />
                    <label
                      htmlFor="date"
                      className="absolute left-3 text-gray-400 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary"
                    >
                      Comment
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full max-w-md h-12 mt-2 text-white bg-primary hover:bg-primary/90 transition rounded-xl font-semibold"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
            <h1 className="text-lg font-semibold">Related Blogs</h1>
            <div className="w-full flex overflow-x-auto space-x-2">
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

export default BlogDetail;
