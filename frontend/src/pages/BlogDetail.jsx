import React, { useState } from 'react';
import Breadcrumbs from '../components/BreadCrumbs';
import ceo from '../images/ceo.jpg'; // Example image import, replace with actual image path
import bmwm4 from '../images/BMWM4.png'; // Example image import, replace with actual image path
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import m4 from '../images/m4.jpg'; // Example image import, replace with actual image path
import BlogCard from '../components/BlogCard';
const BlogDetail = () => {
  const features = {
    Interior: [
      'Leather seats',
      'Ambient lighting',
      'Heated steering',
      'Touchscreen',
      'Climate control',
    ],
    Exterior: [
      'Alloy wheels',
      'LED headlights',
      'Sunroof',
      'Sport package',
      'Fog lights',
    ],
    Safety: ['Airbags', 'ABS', 'Lane assist', 'Blind spot', 'Rear camera'],
    Comfort: [
      'Heated seats',
      'Ventilated seats',
      'Premium audio',
      'Armrest',
      'Cup holders',
    ],
  };

  const [testDriveFormData, setTestDriveFormData] = useState({
    name: '',
    email: '',
    date: '',
  });
  const [calcFormData, setCalcFormData] = useState({
    price: '',
    years: '',
    downPayment: '',
  });

  // Floating label state and change handlers
  const handleTestDriveChange = (e) => {
    const { name, value } = e.target;
    setTestDriveFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCalcChange = (e) => {
    const { name, value } = e.target;
    setCalcFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="font-[poppins] bg-base-200">
      <div id="mobile" className="w-full">
        <section className="w-full bg-secondary pt-16 px-4 h-16 sticky top-0 z-50"></section>
        <section className="w-full px-4 pt-4">
          <div className="w-full max-w-6xl mx-auto">
            <Breadcrumbs />
            <div className="flex">
              <h1 className=" text-3xl font-bold">Drift: </h1>
              <span className=" text-3xl font-medium ml-2"> A BMW Classic</span>
            </div>
            <div className="flex my-2 space-x-4 items-center">
              <img
                src={ceo}
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
              src={bmwm4}
              alt="Blog"
              className="w-full h-full max-h-[60vh] object-cover rounded-2xl"
            />
          </figure>
        </section>
        <section id="text" className="w-full px-4 flex justify-center">
          <div className="w-full max-w-4xl">
            <p className="my-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              aliquam modi fugit magnam. Eius repudiandae placeat eveniet,
              fugiat iusto quasi officiis est modi accusantium cupiditate, fugit
              debitis velit dolorem quod!
            </p>
            <p className="my-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              aliquam modi fugit magnam. Eius repudiandae placeat eveniet,
              fugiat iusto quasi officiis est modi accusantium cupiditate, fugit
              debitis velit dolorem quod!
            </p>
            <p className="my-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              aliquam modi fugit magnam. Eius repudiandae placeat eveniet,
              fugiat iusto quasi officiis est modi accusantium cupiditate, fugit
              debitis velit dolorem quod!
            </p>
            <p className="my-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              aliquam modi fugit magnam. Eius repudiandae placeat eveniet,
              fugiat iusto quasi officiis est modi accusantium cupiditate, fugit
              debitis velit dolorem quod!
            </p>
            <p className="my-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              aliquam modi fugit magnam. Eius repudiandae placeat eveniet,
              fugiat iusto quasi officiis est modi accusantium cupiditate, fugit
              debitis velit dolorem quod!
            </p>
            <hr className="border-t border-gray-300 my-8" />

            <div className="flex flex-col space-y-4 my-4">
              <div>
                <h1 className="text-xl font-semibold mb-2">Key Features</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {Object.entries(features).map(([category, items]) => (
                    <div key={category}>
                      <h3 className="font-medium text-lg mb-3">{category}</h3>
                      <ul className="space-y-2">
                        {items.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-gray-700"
                          >
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20">
                              <Check className="w-3 h-3 text-primary" />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <hr className="border-t border-gray-300 my-8" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">
              Dimensions & Capacity
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col">
                <span className="font-medium">Length</span>
                <span className="text-gray-500">99 mm</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Width</span>
                <span className="text-gray-500">99 mm</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Height</span>
                <span className="text-gray-500">99 mm</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Capacity</span>
                <span className="text-gray-500">99 L</span>
              </div>
            </div>
            <hr className="border-t border-gray-300 my-8" />
            {/* <div className="bg-white p-6 py-8 rounded-2xl shadow-xl"> */}
            <h2 className="text-2xl font-semibold my-8">
              Engine & Transmission
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
              <div className="flex flex-col">
                <span className="font-medium">Engine Type</span>
                <span className="text-gray-500">V8</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Horsepower</span>
                <span className="text-gray-500">450 hp</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Torque</span>
                <span className="text-gray-500">500 Nm</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">0-100 km/h</span>
                <span className="text-gray-500">4.5 sec</span>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-6 my-8">
              {/* Test Drive Form */}
              <div className="bg-white p-6 rounded-2xl shadow-xl w-full">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">
                  Schedule a Test Drive
                </h2>
                <form className="space-y-4">
                  {/* Name */}
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={testDriveFormData.name}
                      onChange={handleTestDriveChange}
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
                      value={testDriveFormData.email}
                      onChange={handleTestDriveChange}
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
                    <input
                      type="date"
                      name="date"
                      value={testDriveFormData.date}
                      onChange={handleTestDriveChange}
                      className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                      placeholder=" "
                    />
                    <label
                      htmlFor="date"
                      className="absolute left-3 text-gray-400 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary"
                    >
                      Select Date
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 mt-2 text-white bg-primary hover:bg-primary/90 transition rounded-xl font-semibold"
                  >
                    Submit
                  </button>
                </form>
              </div>

              {/* Installment Calculator */}
              <div className="bg-white p-6 rounded-2xl shadow-xl w-full">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">
                  Installment Calculator
                </h2>
                <form className="space-y-4">
                  {/* Car Price */}
                  <div className="relative">
                    <input
                      type="number"
                      name="price"
                      value={calcFormData.price}
                      onChange={handleCalcChange}
                      className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                      placeholder=" "
                    />
                    <label
                      htmlFor="price"
                      className="absolute left-3 text-gray-400 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary"
                    >
                      Car Price (₦)
                    </label>
                  </div>

                  {/* Years */}
                  <div className="relative">
                    <input
                      type="number"
                      name="years"
                      value={calcFormData.years}
                      onChange={handleCalcChange}
                      className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                      placeholder=" "
                    />
                    <label
                      htmlFor="years"
                      className="absolute left-3 text-gray-400 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary"
                    >
                      Payment Period (Years)
                    </label>
                  </div>

                  {/* Down Payment */}
                  <div className="relative">
                    <input
                      type="number"
                      name="downPayment"
                      value={calcFormData.downPayment}
                      onChange={handleCalcChange}
                      className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                      placeholder=" "
                    />
                    <label
                      htmlFor="downPayment"
                      className="absolute left-3 text-gray-400 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary"
                    >
                      Down Payment (₦)
                    </label>
                  </div>

                  <button
                    type="button"
                    // onClick={handleCalculate}
                    className="w-full h-12 mt-2 text-white bg-primary hover:bg-primary/90 transition rounded-xl font-semibold"
                  >
                    Calculate
                  </button>
                </form>
              </div>
            </div>
            <div className="w-full border-t border-gray-300 my-6 border-b py-4 flex w-full justify-between">
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
                      value={testDriveFormData.name}
                      onChange={handleTestDriveChange}
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
                      value={testDriveFormData.email}
                      onChange={handleTestDriveChange}
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
                      value={testDriveFormData.text}
                      onChange={handleTestDriveChange}
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
