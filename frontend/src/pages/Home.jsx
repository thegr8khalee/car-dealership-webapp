import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Range } from 'react-range';
import Hero from '../images/Hero.webp';
import Herolg from '../images/Hero.webp';
import { FaCheckCircle } from 'react-icons/fa';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleCheck,
  FilterIcon,
  MailIcon,
  Star,
} from 'lucide-react';
import suv from '../images/suv.png';
import sedan from '../images/sedan.png';
import pickup from '../images/pickup.png';
import sport from '../images/sport.png';
import coupe from '../images/coupe.png';
import convertible from '../images/convertible.png';
import gas from '../images/gas.png';
import benz from '../images/benz.png';
import bmw from '../images/bmw.png';
import audi from '../images/audi.png';
import toyota from '../images/toyota.png';
import honda from '../images/honda.png';
import sell from '../images/sell.jpg';
import mileage from '../images/mileage.png';
import transmission from '../images/transmission.png';
import date from '../images/date.png';
import { Link, useNavigate } from 'react-router-dom';
import CarCard from '../components/CarCard';
import price from '../images/price.png';
import discount from '../images/discount.png';
import service from '../images/service.png';
import trusted from '../images/trusted.png';
import ceo from '../images/ceo.jpg';
import TeamCard from '../components/TeamCard';
import BlogCard from '../components/BlogCard';
import calc from '../images/calc.jpg';
import CarSearchBar from '../components/Searchbar';
import { useCarStore } from '../store/useCarStore';
import { useBlogStore } from '../store/useBlogStore';
import { useInteractStore } from '../store/useInteractStore';
import toast from 'react-hot-toast';

const Home = () => {
  const [isFocusedCarPrice, setIsFocusedCarPrice] = useState(false);
  const [isFocusedTerm, setIsFocusedTerm] = useState(false);
  const [isFocusedDownPayment, setIsFocusedDownPayment] = useState(false);
  const { cars, isLoading, getCars } = useCarStore();
  const { blogs, fetchBlogs, isLoading: isLoadingBlogs } = useBlogStore();
  const { reviews, getAllReviews, isFetchingReviews } = useInteractStore();
  const [formData, setFormData] = useState({
    carPrice: '',
    term: '',
    downPayment: '',
  });

  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateInstallment = () => {
    // Validate all required fields are filled
    if (!formData.carPrice || !formData.term || !formData.downPayment) {
      toast.error('Please fill in all fields');
      return;
    }

    const price = parseFloat(formData.carPrice);
    const down = parseFloat(formData.downPayment);
    const years = parseFloat(formData.term);

    // Validate values are positive numbers
    if (price <= 0 || down < 0 || years <= 0) {
      toast.error('Please enter valid positive numbers');
      return;
    }

    // Check if down payment is not greater than car price
    if (down >= price) {
      toast.error('Down payment cannot be greater than or equal to car price');
      return;
    }

    // Calculate loan amount
    const loanAmount = price - down;

    // Typical interest rate (you can make this configurable)
    const annualInterestRate = 0.05; // 5% annual interest rate
    const monthlyInterestRate = annualInterestRate / 12;
    const numberOfPayments = years * 12;

    // Calculate monthly payment using the loan payment formula
    // M = P * [r(1 + r)^n] / [(1 + r)^n - 1]
    let monthly;

    if (monthlyInterestRate === 0) {
      // If no interest, simple division
      monthly = loanAmount / numberOfPayments;
    } else {
      const x = Math.pow(1 + monthlyInterestRate, numberOfPayments);
      monthly = (loanAmount * (monthlyInterestRate * x)) / (x - 1);
    }

    setMonthlyPayment(monthly);
  };

  useEffect(() => {
    getCars();
    fetchBlogs();
    getAllReviews();
  }, [getCars, fetchBlogs, getAllReviews]);

  // console.log(reviews);

  const selectBodyType = (bodyType) => {
    navigate('/listings', { state: { bodyType } });
  };

  const selectMake = (make) => {
    navigate('/listings', { state: { make } });
  };

  const [activeTab, setActiveTab] = useState('Latest');

  const tabs = ['Latest Cars', 'Featured Cars', 'Popular Cars'];

  const navigate = useNavigate();

  const handleListingsClick = () => {
    navigate('/listings');
  };

  const bodyTypes = [
    { label: 'SUV', img: suv },
    { label: 'Sedan', img: sedan },
    { label: 'Coupe', img: coupe },
    { label: 'Truck', img: pickup },
    { label: 'Convertible', img: convertible },
    { label: 'Sport', img: sport },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? reviews.reviews.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === reviews.reviews.length - 1 ? 0 : prev + 1
    );
  };

  // const review = reviews?.reviews[currentIndex];

  return (
    <div className="bg-base-200">
      <div id="mobile view" className="sm:hidden">
        <section id="hero" className="relative w-full h-110">
          <img
            src={Hero}
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-x-0 bottom-28 text-center">
            <h1 className="text-white text-4xl font-bold font-[poppins]">
              Search Less. Live More.
            </h1>
          </div>

          <div className="absolute bottom-15 inset-x-0 text-center z-10 space-x-2">
            <button
              className="btn btn-primary rounded-full font-medium"
              onClick={handleListingsClick}
            >
              Browse Cars
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="btn backdrop-blur-lg bg-secondary/30 border-none shadow-none text-white rounded-full font-medium"
            >
              Contact Us
            </button>
          </div>

          <div className="absolute bottom-5 inset-x-0 text-center z-10">
            <h1 className="text-white text-3xl font-['Microgramma_D_Extended'] tracking-widest">
              Sarkin Mota
            </h1>
          </div>
        </section>

        <CarSearchBar />

        <section id="Body Type" className="w-full py-8 px-4">
          <h1 className="text-xl font-semibold font-[poppins] mb-2">
            Body Type
          </h1>
          <div className="flex overflow-x-auto space-x-2">
            {bodyTypes.map(({ label, img }) => {
              // const isSelected = selectedBodyType.includes(label);

              return (
                <div
                  key={label}
                  className={`rounded-xl border border-gray-400 p-1 px-5 flex flex-col items-center min-w-[100px] text-xs transition cursor-pointer`}
                  onClick={() => selectBodyType(label)}
                >
                  <img src={img} alt={label} className={`size-10`} />
                  <h1 className={`text-xs`}>{label}</h1>
                </div>
              );
            })}
          </div>
        </section>
        <section id="Sell" className="relative w-full">
          <div className="flex items-center space-x-4 h-110 bg-black">
            <img
              src={sell}
              alt="Sell"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="relative z-10 w-full px-4">
              <h1 className="text-white text-2xl font-bold font-[poppins]">
                Get A Fair Price For Your Car, Sell To Us Today.
              </h1>
              <p className="text-white text-sm font-[poppins] mt-2">
                Skip the endless negotiations — we’ll value your car honestly
                and pay you on the spot.
              </p>
              <div className="flex flex-col space-y-2 mt-2">
                <div className="flex space-x-2 text-white">
                  <CircleCheck className="stroke-white mr-2" />
                  Fast and transparent process
                </div>
                <div className="flex space-x-2 text-white">
                  <CircleCheck className="stroke-white mr-2" />
                  Instant payment, no hidden fees
                </div>
                <div className="flex space-x-2 text-white">
                  <CircleCheck className="stroke-white mr-2" />
                  Trusted by thousands of car owners across Nigeria
                </div>
              </div>

              <div className="flex space-x-2 mt-4 w-full ">
                <button
                  onClick={() => navigate('/sell/form')}
                  className="flex-1 btn btn-lg btn-primary rounded-full font-medium w-full"
                >
                  Sell Now
                </button>
                <button
                  onClick={() => navigate('/sell')}
                  className="flex-1 btn btn-lg backdrop-blur-lg bg-secondary/30 border-none shadow-none text-white rounded-full font-medium"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>
        <section id="listings" className="w-full p-4 pr-0">
          <h1 className="text-xl font-semibold font-[poppins] mb-2">
            Explore All Cars
          </h1>
          <div className="flex overflow-x-auto w-full space-x-2">
            {isLoading ? (
              <p>Loading cars...</p>
            ) : cars?.length === 0 ? (
              <p>No cars found</p>
            ) : (
              cars?.slice(0, 10).map((car) => (
                <CarCard
                  key={car.id}
                  className="flex-shrink-0"
                  image={car.imageUrls[0]}
                  title={`${car.make} ${car.model}`}
                  description={car.description}
                  mileage={{ icon: mileage, value: car.mileage }}
                  transmission={{
                    icon: transmission,
                    value: car.transmission,
                  }}
                  fuel={{ icon: gas, value: car.fuelType }}
                  year={{ icon: date, value: car.year }}
                  price={car.price}
                  link={`/car/${car.id}`}
                />
              ))
            )}
          </div>
          {/* <div className="w-full flex justify-end pr-2">
              description="425-hp twin-turbo inline-six, r..."
              mileage={{ icon: mileage, value: '2000km' }}
              transmission={{ icon: transmission, value: 'Automatic' }}
              fuel={{ icon: gas, value: 'Gas' }}
              year={{ icon: date, value: '2019' }}
              price="N35,000,000"
              link="/cars/bmw-m4"
            />
          </div> */}
          <div className="w-full flex justify-end pr-2">
            <button
              className="btn btn-primary rounded-full"
              onClick={handleListingsClick}
            >
              View All
              <ArrowUpRight className="size-5" />
            </button>
          </div>
        </section>
        <section id="makes" className="w-full p-4">
          {/* <h6 className="text-primary font-[poppins]">Top Makes</h6> */}
          <div className="flex w-full justify-between">
            <div className="flex items-center justify-between w-full">
              <h1 className="font-bold text-xl font-[poppins]">
                Explore Our Top Makes
              </h1>{' '}
              <button
                onClick={() => navigate('/makes')}
                className="rounded-full btn btn-primary"
              >
                View All <ArrowUpRight className="size-5" />
              </button>
            </div>
          </div>
          <div className="mt-2 flex overflow-x-auto w-full space-x-2">
            {[
              { name: 'mercedes', src: benz },
              { name: 'bmw', src: bmw },
              { name: 'audi', src: audi },
              { name: 'toyota', src: toyota },
              { name: 'honda', src: honda },
            ].map(({ name, src }) => (
              <div
                key={name}
                className={`rounded-xl border border-gray-400 flex-shrink-0 p-2 flex flex-col justify-center items-center min-w-[100px] text-xs transition `}
                onClick={() => selectMake(name)}
              >
                <img
                  src={src}
                  alt={name}
                  className="w-20 h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </section>
        <section
          id="Why Choose Us"
          className="bg-secondary text-center items-center py-8"
        >
          <h1 className="font-bold text-white text-2xl font-[poppins]">
            Why Choose Us?
          </h1>
          <div className="grid grid-cols-2 gap-4 gap-y-12 my-8">
            <div className="flex flex-col space-y-2 items-center">
              <img src={discount} alt="discount" className="size-10" />
              <h1 className="text-white ">Special Financing Offers</h1>
            </div>
            <div className="flex flex-col space-y-2 items-center">
              <img src={trusted} alt="trusted" className="size-10" />
              <h1 className="text-white ">Trusted by Thousands</h1>
            </div>
            <div className="flex flex-col space-y-2 items-center">
              <img src={price} alt="price" className="size-10" />
              <h1 className="text-white">Competitive Pricing</h1>
            </div>
            <div className="flex flex-col space-y-2 items-center">
              <img src={service} alt="service" className="size-10" />
              <h1 className="text-white ">Expert Car Service</h1>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 gap-y-12">
            <div className="flex flex-col items-center">
              <h1 className="text-primary font-bold font-[poppins] text-4xl">
                100k
              </h1>
              <p className="text-white">Cars Sold</p>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-primary font-bold font-[poppins] text-4xl">
                100k
              </h1>
              <p className="text-white">Cars Sold</p>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-primary font-bold font-[poppins] text-4xl">
                100k
              </h1>
              <p className="text-white">Cars Sold</p>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-primary font-bold font-[poppins] text-4xl">
                100k
              </h1>
              <p className="text-white">Cars Sold</p>
            </div>
          </div>
        </section>
        <section id="team" className="w-full p-4 py-8">
          <h1 className="font-[poppins] text-2xl font-bold my-4">
            Meet Our Team
          </h1>
          <div className="w-full flex space-x-2 overflow-x-auto">
            <TeamCard
              image={ceo}
              name="Jane Doe"
              title="CEO"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem tenetur nihil odit magnam reiciendis eaque repellendus?"
            />
            <TeamCard
              image={ceo}
              name="John Smith"
              title="CTO"
              description="Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            />
            <TeamCard
              image={ceo}
              name="Alice Johnson"
              title="CFO"
              description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
            />
          </div>
        </section>
        {reviews &&
          !isFetchingReviews &&
          reviews.reviews &&
          reviews.reviews.length > 0 && (
            <section
              id="review"
              className="w-full p-4 py-12 bg-secondary font-[poppins]"
            >
              <h1 className="font-bold text-white text-2xl">
                What Our Clients Say
              </h1>

              <div className="flex space-x-2 my-1">
                <Star
                  className={` stroke-0 size-8 ${
                    reviews?.averageRatings >= 1
                      ? 'fill-primary'
                      : 'fill-gray-300'
                  }`}
                />
                <Star
                  className={` stroke-0 size-8 ${
                    reviews?.averageRatings >= 2
                      ? 'fill-primary'
                      : 'fill-gray-300'
                  }`}
                />
                <Star
                  className={` stroke-0 size-8 ${
                    reviews?.averageRatings >= 3
                      ? 'fill-primary'
                      : 'fill-gray-300'
                  }`}
                />
                <Star
                  className={` stroke-0 size-8 ${
                    reviews?.averageRatings >= 4
                      ? 'fill-primary'
                      : 'fill-gray-300'
                  }`}
                />
                <Star
                  className={` stroke-0 size-8 ${
                    reviews?.averageRatings >= 5
                      ? 'fill-primary'
                      : 'fill-gray-300'
                  }`}
                />
              </div>

              <p className="text-white mt-2">
                <b>{reviews.averageRatings}</b> Based on{' '}
                <b>{reviews.totalItems}</b> Reviews
              </p>

              <div className="mt-4 w-full">
                {/* Header: Name + Nav Buttons */}
                <div className="w-full flex justify-between items-center">
                  <div>
                    <h1 className="text-white text-lg">
                      {reviews.reviews[currentIndex]?.name}
                    </h1>
                    <p className="text-gray-400 text-sm">
                      {reviews.reviews[currentIndex]?.car.make}{' '}
                      {reviews.reviews[currentIndex]?.car.model} (
                      {reviews.reviews[currentIndex]?.car.year})
                    </p>
                  </div>

                  <div className="space-x-2 flex">
                    <button
                      onClick={handlePrev}
                      className="btn btn-primary btn-circle"
                    >
                      <ChevronLeft />
                    </button>
                    <button
                      onClick={handleNext}
                      className="btn btn-primary btn-circle"
                    >
                      <ChevronRight />
                    </button>
                  </div>
                </div>

                {/* Review Content */}
                <div className="mt-2">
                  <p className="text-white font-light text-sm">
                    {reviews.reviews[currentIndex]?.content}
                  </p>
                </div>
              </div>
            </section>
          )}
        <section id="blogs" className="w-full p-4 py-8">
          <div className="flex w-full justify-between items-center">
            <h1 className="font-[poppins] text-2xl font-bold">Recent Blogs</h1>
          </div>

          <div className="w-full flex space-x-4 overflow-x-auto ">
            {isLoadingBlogs ? (
              <p>Loading...</p>
            ) : (
              blogs
                ?.slice(0, 10)
                .map((blog) => (
                  <BlogCard
                    key={blog.id}
                    publisher={blog.publisher}
                    date={blog.date}
                    title={blog.title}
                    tagline={blog.tagline}
                    image={blog.featuredImage}
                    link={`/blog/${blog.id}`}
                  />
                ))
            )}
          </div>
          <div className="w-full flex items-end justify-end">
            <button
              onClick={() => navigate('/blogs')}
              className="btn btn-primary rounded-full flex"
            >
              View All <ArrowUpRight className="size-5" />
            </button>
          </div>
        </section>
        <section id="Calc" className="relative w-full">
          <div className="flex items-center space-x-4 bg-black">
            <img
              src={calc}
              alt="Sell"
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            />
            <div className="relative z-10 h-full w-full p-4">
              <div className="bg-white shadow-lg rounded-3xl h-full w-full p-4 items-center justify-center">
                <h1 className="font-[poppins] text-2xl font-bold mt-2">
                  Installment Plan Calculator
                </h1>
                <p className="text-xs font-[poppins] mt-1">
                  Use this calculator to know how much would pay in intallment
                  for a full car purchase over a period of time.
                </p>
                <form action="" className="my-2">
                  <div className="relative w-full">
                    <input
                      type="number"
                      value={formData.carPrice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          carPrice: e.target.value,
                        })
                      }
                      onFocus={() => setIsFocusedCarPrice(true)}
                      onBlur={() => setIsFocusedCarPrice(false)}
                      className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder=" " // Trick for floating label
                    />
                    <label
                      className={`absolute left-3 transition-all duration-300 
          ${
            isFocusedCarPrice || formData.carPrice
              ? 'text-xs top-2 text-gray-500'
              : 'text-gray-400 top-5 text-xs'
          } 
        `}
                    >
                      Car Price (N)
                    </label>
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <div className="relative w-80">
                      <input
                        type="number"
                        value={formData.term}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            term: e.target.value,
                          })
                        }
                        onFocus={() => setIsFocusedTerm(true)}
                        onBlur={() => setIsFocusedTerm(false)}
                        className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder=" " // Trick for floating label
                      />
                      <label
                        className={`absolute left-3 transition-all duration-300 
          ${
            isFocusedTerm || formData.term
              ? 'text-xs top-2 text-gray-500'
              : 'text-gray-400 top-5 text-xs'
          } 
        `}
                      >
                        Installment Term (years)
                      </label>
                    </div>
                    <div className="relative w-80">
                      <input
                        type="number"
                        value={formData.downPayment}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            downPayment: e.target.value,
                          })
                        }
                        onFocus={() => setIsFocusedDownPayment(true)}
                        onBlur={() => setIsFocusedDownPayment(false)}
                        className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder=" " // Trick for floating label
                      />
                      <label
                        className={`absolute left-3 transition-all duration-300 
          ${
            isFocusedDownPayment || formData.downPayment
              ? 'text-xs top-2 text-gray-500'
              : 'text-gray-400 top-5 text-xs'
          } 
        `}
                      >
                        Down Payment (N)
                      </label>
                    </div>
                  </div>
                  {monthlyPayment !== null && (
                    <div className="mt-6 p-4 bg-primary/10 rounded-2xl">
                      <p className="text-sm text-gray-600">
                        Estimated Monthly Payment
                      </p>
                      <p className="text-3xl font-bold text-primary">
                        N
                        {monthlyPayment.toLocaleString('en-NG', {
                          maximumFractionDigits: 2,
                        })}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Based on {formData.term} years with{' '}
                        {(0.05 * 100).toFixed(1)}% annual interest
                      </p>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={calculateInstallment}
                    className="w-full h-15 mt-2 text-white btn-primary btn-lg rounded-full"
                  >
                    Calculate
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div id="desktop view" className="hidden sm:block">
        <section id="hero" className="relative w-full h-[80vh] lg:h-screen">
          <img
            src={Herolg}
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-x-0 bottom-45 text-center">
            <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-bold font-[poppins]">
              Search Less. Live More.
            </h1>
          </div>

          <div className="absolute bottom-24 inset-x-0 text-center z-10 space-x-2">
            <button
              className="btn btn-xl btn-primary rounded-full font-medium"
              onClick={handleListingsClick}
            >
              Browse Cars
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="btn btn-xl backdrop-blur-lg bg-secondary/30 border-none shadow-none text-white rounded-full font-medium"
            >
              Contact Us
            </button>
          </div>

          <div className="absolute bottom-5 inset-x-0 text-center z-10">
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-['Microgramma_D_Extended'] tracking-widest">
              Sarkin Mota
            </h1>
          </div>
        </section>

        <div className="bg-white w-full flex justify-center items-center px-2">
          <CarSearchBar />
        </div>

        <section
          id="Body Type"
          className="w-full py-8 px-4 items-center justify-center flex"
        >
          <div className="w-full max-w-6xl">
            <h1 className="text-xl font-semibold font-[poppins] mb-2">
              Body Type
            </h1>
            <div className="flex overflow-x-auto space-x-4">
              {bodyTypes.map(({ label, img }) => {
                // const isSelected = selectedBodyType.includes(label);

                return (
                  <div
                    key={label}
                    className={`rounded-xl border border-gray-400 p-1 px-10 flex flex-col items-center text-xs transition cursor-pointer`}
                    onClick={() => selectBodyType(label)}
                  >
                    <img src={img} alt={label} className={`max-w-20`} />
                    <h1 className={`text-xs`}>{label}</h1>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section
          id="Sell"
          className="relative w-full bg-black flex justify-center p-4"
        >
          <div className="flex items-center space-x-4 h-110  w-full max-w-6xl">
            <div className="relative w-[50vw] rounded-2xl">
              <img
                src={sell}
                alt="Sell"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="relative z-10 w-[50vw] px-4">
              <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-bold font-[poppins]">
                Get A Fair Price For Your Car, Sell To Us Today.
              </h1>
              <p className="text-white text-xs lg:text-sm font-[poppins] mt-2">
                Skip the endless negotiations — we’ll value your car honestly
                and pay you on the spot.
              </p>
              <div className="flex flex-col space-y-2 mt-2 text-xs md:text-base">
                <div className="flex space-x-2 text-white">
                  <CircleCheck className="stroke-white mr-2" />
                  Fast and transparent process
                </div>
                <div className="flex space-x-2 text-white">
                  <CircleCheck className="stroke-white mr-2" />
                  Instant payment, no hidden fees
                </div>
                <div className="flex space-x-2 text-white">
                  <CircleCheck className="stroke-white mr-2" />
                  Trusted by thousands of car owners across Nigeria
                </div>
              </div>

              <div className="flex space-x-2 mt-4 w-full ">
                <button
                  onClick={() => navigate('/sell/form')}
                  className="flex-1 btn md:btn-lg btn-primary rounded-full font-medium w-full"
                >
                  Sell Now
                </button>
                <button
                  onClick={() => navigate('/sell')}
                  className="flex-1 btn md:btn-lg backdrop-blur-lg bg-secondary/30 border-none shadow-none text-white rounded-full font-medium"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>
        <section id="listings" className="w-full p-4 pr-0">
          <div className="w-full max-w-6xl mx-auto">
            <div className="flex w-full justify-between items-center">
              <h1 className="text-xl font-semibold font-[poppins] mb-2">
                Explore All Cars
              </h1>
              <button
                className="btn btn-primary rounded-full"
                onClick={handleListingsClick}
              >
                View All
                <ArrowUpRight className="stroke-whitesize-5" />
              </button>
            </div>

            <div className="flex w-full justify-between">
              <div className="flex flex-shrink-0 space-x-8 border-gray-200"></div>
              <div className="w-full flex justify-end pr-2"></div>
            </div>

            <div className="flex overflow-x-auto w-full space-x-2 pl-1">
              {isLoading ? (
                <p>Loading cars...</p>
              ) : cars?.length === 0 ? (
                <p>No cars found</p>
              ) : (
                cars?.slice(0, 10).map((car) => (
                  <CarCard
                    key={car.id}
                    className="flex-shrink-0"
                    image={car.imageUrls[0]}
                    title={`${car.make} ${car.model}`}
                    description={car.description}
                    mileage={{ icon: mileage, value: car.mileage }}
                    transmission={{
                      icon: transmission,
                      value: car.transmission,
                    }}
                    fuel={{ icon: gas, value: car.fuelType }}
                    year={{ icon: date, value: car.year }}
                    price={car.price}
                    link={`/car/${car.id}`}
                  />
                ))
              )}
            </div>
          </div>
        </section>
        <section id="makes" className="w-full p-4 items-start justify-center">
          <div className="w-full max-w-6xl mx-auto">
            {/* <h6 className="text-primary font-[poppins]">Top Makes</h6> */}
            <div className="flex w-full justify-between">
              <div>
                <h1 className="font-bold text-xl font-[poppins]">
                  Explore Our Top Makes
                </h1>
              </div>
              <button
                onClick={() => navigate('/makes')}
                className="btn btn-primary rounded-full"
              >
                View All <ArrowUpRight className="size-5" />
              </button>
            </div>
            <div className="mt-2 flex overflow-x-auto w-full space-x-10">
              {[
                { name: 'mercedes', src: benz },
                { name: 'bmw', src: bmw },
                { name: 'audi', src: audi },
                { name: 'toyota', src: toyota },
                { name: 'honda', src: honda },
              ].map(({ name, src }) => (
                <div
                  key={name}
                  className={`rounded-xl flex-shrink-0 p-2 flex flex-col justify-center items-center text-xs transition `}
                  onClick={() => selectMake(name)}
                >
                  <img
                    src={src}
                    alt={name}
                    className="w-30 md:w-40 h-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          id="Why Choose Us"
          className="bg-secondary items-center justify-center py-12 flex px-4"
        >
          <div className="w-full max-w-6xl">
            <h1 className="font-bold text-white text-2xl font-[poppins]">
              Why Choose Us?
            </h1>
            <div className="flex justify-between items-center text-center">
              <div className="flex flex-col space-y-2 items-center my-8  w-full">
                <img src={discount} alt="discount" className="size-15" />
                <h1 className="text-white font-medium">
                  Special Financing Offers
                </h1>
              </div>
              <div className="flex flex-col space-y-2 items-center my-8  w-full">
                <img src={trusted} alt="trusted" className="size-13" />
                <h1 className="text-white font-medium">Trusted by Thousands</h1>
              </div>
              <div className="flex flex-col space-y-2 items-center my-8  w-full">
                <img src={price} alt="price" className="size-13" />
                <h1 className="text-white font-medium">Competitive Pricing</h1>
              </div>
              <div className="flex flex-col space-y-2 items-center my-8  w-full">
                <img src={service} alt="service" className="size-13" />
                <h1 className="text-white font-medium">Expert Car Service</h1>
              </div>
            </div>

            <div className="flex justify-between items-center text-center">
              <div className="flex flex-col items-center w-full ">
                <h1 className="text-primary font-bold font-[poppins] text-4xl">
                  100k
                </h1>
                <p className="text-white">Cars Sold</p>
              </div>
              <div className="flex flex-col items-center w-full ">
                <h1 className="text-primary font-bold font-[poppins] text-4xl">
                  100k
                </h1>
                <p className="text-white">Cars Sold</p>
              </div>
              <div className="flex flex-col items-center w-full ">
                <h1 className="text-primary font-bold font-[poppins] text-4xl">
                  100k
                </h1>
                <p className="text-white">Cars Sold</p>
              </div>
              <div className="flex flex-col items-center w-full ">
                <h1 className="text-primary font-bold font-[poppins] text-4xl">
                  100k
                </h1>
                <p className="text-white">Cars Sold</p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="team"
          className="w-full p-4 py-8 items-center justify-center flex"
        >
          <div className=" w-full max-w-6xl">
            <h1 className="font-[poppins] text-2xl font-bold my-4">
              Meet Our Team
            </h1>
            <div className="w-full flex space-x-4 overflow-x-auto">
              <TeamCard
                image={ceo}
                name="Al-Amin"
                title="CEO"
                description="I am Al-Amin, the CEO of Sarkin Mota. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem tenetur nihil odit magnam reiciendis eaque repellendus?"
              />
              <TeamCard
                image={ceo}
                name="John Smith"
                title="CTO"
                description="Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              />
              <TeamCard
                image={ceo}
                name="Alice Johnson"
                title="CFO"
                description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
              />
              <TeamCard
                image={ceo}
                name="Alice Johnson"
                title="CFO"
                description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
              />
            </div>
          </div>
        </section>
        {reviews &&
          !isFetchingReviews &&
          reviews.reviews &&
          reviews.reviews.length > 0 && (
            <section
              id="review"
              className="w-full flex justify-center items-center p-4 py-12 bg-secondary font-[poppins]"
            >
              <div className="w-full max-w-6xl mx-auto">
                <h1 className="font-bold text-white text-2xl">
                  What Our Clients Say
                </h1>

                <div className="flex space-x-2 my-1">
                  <Star
                    className={` stroke-0 size-8 ${
                      reviews?.averageRatings >= 1
                        ? 'fill-primary'
                        : 'fill-gray-300'
                    }`}
                  />
                  <Star
                    className={` stroke-0 size-8 ${
                      reviews?.averageRatings >= 2
                        ? 'fill-primary'
                        : 'fill-gray-300'
                    }`}
                  />
                  <Star
                    className={` stroke-0 size-8 ${
                      reviews?.averageRatings >= 3
                        ? 'fill-primary'
                        : 'fill-gray-300'
                    }`}
                  />
                  <Star
                    className={` stroke-0 size-8 ${
                      reviews?.averageRatings >= 4
                        ? 'fill-primary'
                        : 'fill-gray-300'
                    }`}
                  />
                  <Star
                    className={` stroke-0 size-8 ${
                      reviews?.averageRatings >= 5
                        ? 'fill-primary'
                        : 'fill-gray-300'
                    }`}
                  />
                </div>

                <p className="text-white mt-2">
                  <b>{reviews.averageRatings}</b> Based on{' '}
                  <b>{reviews.totalItems}</b> Reviews
                </p>

                <div className="mt-4 w-full">
                  {/* Header: Name + Nav Buttons */}
                  <div className="w-full flex justify-between items-center">
                    <div>
                      <h1 className="text-white text-lg">
                        {reviews.reviews[currentIndex]?.name}
                      </h1>
                      <p className="text-gray-400 text-sm">
                        {reviews.reviews[currentIndex]?.car.make}{' '}
                        {reviews.reviews[currentIndex]?.car.model} (
                        {reviews.reviews[currentIndex]?.car.year})
                      </p>
                    </div>

                    <div className="space-x-2 flex">
                      <button
                        onClick={handlePrev}
                        className="btn btn-primary btn-circle"
                      >
                        <ChevronLeft />
                      </button>
                      <button
                        onClick={handleNext}
                        className="btn btn-primary btn-circle"
                      >
                        <ChevronRight />
                      </button>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="mt-2">
                    <p className="text-white font-light text-sm">
                      {reviews.reviews[currentIndex]?.content}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
        <section
          id="blogs"
          className="w-full flex justify-center items-center p-4 py-8"
        >
          <div className="w-full max-w-6xl">
            <div className="flex w-full justify-between items-center">
              <h1 className="font-[poppins] text-2xl font-bold">
                Recent Blogs
              </h1>
              <div>
                <button
                  onClick={() => navigate('/blogs')}
                  className="btn btn-primary rounded-full flex"
                >
                  View All <ArrowUpRight />
                </button>
              </div>
            </div>

            <div className="w-full flex space-x-4 overflow-x-auto ">
              {isLoadingBlogs ? (
                <p>Loading...</p>
              ) : (
                blogs
                  ?.slice(0, 10)
                  .map((blog) => (
                    <BlogCard
                      key={blog.id}
                      publisher={blog.publisher}
                      date={blog.date}
                      title={blog.title}
                      tagline={blog.tagline}
                      image={blog.featuredImage}
                      link={`/blog/${blog.id}`}
                    />
                  ))
              )}
            </div>
          </div>
        </section>
        <section id="Calc" className="relative w-full flex justify-end">
          <div className="flex items-center justify-center h-150 space-x-4  bg-black w-full">
            <img
              src={calc}
              alt="Sell"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative max-w-6xl  z-10 h-full w-full p-8 items-center flex justify-end">
              <div className="bg-white max-w-2xl shadow-lg rounded-3xl w-full p-8 items-center justify-center">
                <h1 className="font-[poppins] text-3xl font-bold">
                  Installment Plan Calculator
                </h1>
                <p className="text-sm font-[poppins] mt-1">
                  Use this calculator to know how much would pay in intallment
                  for a full car purchase over a period of time.
                </p>
                <form action="" className="my-2">
                  <div className="relative w-full">
                    <input
                      type="number"
                      value={formData.carPrice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          carPrice: e.target.value,
                        })
                      }
                      onFocus={() => setIsFocusedCarPrice(true)}
                      onBlur={() => setIsFocusedCarPrice(false)}
                      className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder=" " // Trick for floating label
                    />
                    <label
                      className={`absolute left-3 transition-all duration-300 
          ${
            isFocusedCarPrice || formData.carPrice
              ? 'text-xs top-2 text-gray-500'
              : 'text-gray-400 top-5 text-sm'
          } 
        `}
                    >
                      Car Price (N)
                    </label>
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <div className="relative w-80">
                      <input
                        type="number"
                        value={formData.term}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            term: e.target.value,
                          })
                        }
                        onFocus={() => setIsFocusedTerm(true)}
                        onBlur={() => setIsFocusedTerm(false)}
                        className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder=" " // Trick for floating label
                      />
                      <label
                        className={`absolute left-3 transition-all duration-300 
          ${
            isFocusedTerm || formData.term
              ? 'text-xs top-2 text-gray-500'
              : 'text-gray-400 top-5 text-sm'
          } 
        `}
                      >
                        Installment Term (years)
                      </label>
                    </div>
                    <div className="relative w-80">
                      <input
                        type="number"
                        value={formData.downPayment}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            downPayment: e.target.value,
                          })
                        }
                        onFocus={() => setIsFocusedDownPayment(true)}
                        onBlur={() => setIsFocusedDownPayment(false)}
                        className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder=" " // Trick for floating label
                      />
                      <label
                        className={`absolute left-3 transition-all duration-300 
          ${
            isFocusedDownPayment || formData.downPayment
              ? 'text-xs top-2 text-gray-500'
              : 'text-gray-400 top-5 text-sm'
          } 
        `}
                      >
                        Down Payment (N)
                      </label>
                    </div>
                  </div>
                  {monthlyPayment !== null && (
                    <div className="mt-6 p-4 bg-primary/10 rounded-2xl">
                      <p className="text-sm text-gray-600">
                        Estimated Monthly Payment
                      </p>
                      <p className="text-3xl font-bold text-primary">
                        N
                        {monthlyPayment.toLocaleString('en-NG', {
                          maximumFractionDigits: 2,
                        })}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Based on {formData.term} years with{' '}
                        {(0.05 * 100).toFixed(1)}% annual interest
                      </p>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={calculateInstallment}
                    className="w-full h-15 mt-2 text-white btn-primary btn-lg rounded-full"
                  >
                    Calculate
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
