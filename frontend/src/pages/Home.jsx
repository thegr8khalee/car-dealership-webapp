import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Range } from 'react-range';
import Hero from '../images/Hero.jpg';
import Herolg from '../images/HeroLg.jpg';
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

const Home = () => {
  const [isFocused, setIsFocused] = useState(false);
  const { cars, isLoading, getCars } = useCarStore();
  const { blogs, fetchBlogs, isLoading: isLoadingBlogs } = useBlogStore();
  const { reviews, getAllReviews, isFetchingReviews } = useInteractStore();

  useEffect(() => {
    getCars();
    fetchBlogs();
    getAllReviews();
  }, [getCars, fetchBlogs, getAllReviews]);

  console.log(reviews);

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
            <button className="btn backdrop-blur-lg bg-secondary/30 border-none shadow-none text-white rounded-full font-medium">
              Contact Us
            </button>
          </div>

          <div className="absolute bottom-5 inset-x-0 text-center z-10">
            <h1 className="text-white text-3xl font-['Microgramma_D_Extended'] tracking-widest">
              Company Name
            </h1>
          </div>
        </section>

        {/* <div className=" fixed top-20 inset-x-0 text-center w-full px-8 z-50">
          <div className="items-center justify-between p-1 flex w-full rounded-full backdrop-blur-lg bg-secondary/30 h-15 z-50 relative">
            <div
              className="relative text-white items-center flex h-full px-4 border-r-2 border-r-white/70 cursor-pointer text-sm transition-all duration-300"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              ref={filterRef} // Attach the ref to this element
            >
              <ChevronDown
                className={`size-5 mr-1 transform transition-transform duration-300 ${
                  isFilterOpen ? 'rotate-180' : 'rotate-0'
                }`}
              />
              Filters
            </div>
            <div className="h-full items-center flex w-full">
              <input
                type="text"
                placeholder="Search for a car..."
                className="input w-full border-none bg-transparent text-white placeholder:text-white shadow-none"
              />
            </div>
            <div className="h-full w-full flex justify-end">
              <button className=" btn btn-primary rounded-full h-full font-normal text-xs">
                Find Car
              </button>
            </div>
          </div>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-[-5px] text-start inset-x-0 w-full px-7 z-40 max-h-[85vh]"
            >
              <div className="bg-white text-gray-800 rounded-4xl pt-17 pb-5 p-4 shadow-xl overflow-y-auto max-h-[85vh]">
                <h1 className="font-semibold font-[poppins] text-lg pt-2">
                  Filters
                </h1>
                <p className="font-[poppins] text-xs text-gray-500">
                  Personalize your search by selecting the filters below.
                </p>
                <h1 className="text-primary font-medium font-[poppins] mt-2 text-sm">
                  Price Range
                </h1>
                <div className="pt-2">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>{formatPrice(values[0])}</span>
                    <span>{formatPrice(values[1])}</span>
                  </div>

                 
                  <div className="relative h-1">
                    
                    <div className="absolute inset-0 bg-gray-300 rounded-full"></div>

                    
                    <Range
                      step={SLIDER_STEP}
                      min={SLIDER_MIN}
                      max={SLIDER_MAX}
                      values={values}
                      onChange={(vals) => setValues(vals)}
                      renderTrack={({ props, children }) => (
                        <div
                          {...props}
                          className="h-1 w-full rounded-full relative bg-gray-300"
                        >
                          
                          <div
                            className="absolute h-1 bg-primary rounded-full"
                            style={{
                              left: `${
                                ((values[0] - SLIDER_MIN) /
                                  (SLIDER_MAX - SLIDER_MIN)) *
                                100
                              }%`,
                              right: `${
                                100 -
                                ((values[1] - SLIDER_MIN) /
                                  (SLIDER_MAX - SLIDER_MIN)) *
                                  100
                              }%`,
                            }}
                          />
                          {children}
                        </div>
                      )}
                      renderThumb={({ props }) => (
                        <div
                          {...props}
                          className="h-4 w-4 rounded-full bg-primary shadow-md"
                        />
                      )}
                    />
                  </div>
                </div>
                <hr className="border-t border-gray-300 my-4" />
                <h1 className="text-primary font-medium font-[poppins] text-sm mb-2">
                  Condition
                </h1>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => toggleSelectCondition('New')}
                    className={`btn btn-sm rounded-full font-medium transition ${
                      selectedCondition.includes('New')
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-500 text-gray-500 bg-transparent'
                    }`}
                  >
                    New
                  </button>

                  <button
                    onClick={() => toggleSelectCondition('Used')}
                    className={`btn btn-sm rounded-full font-medium transition ${
                      selectedCondition.includes('Used')
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-500 text-gray-500 bg-transparent'
                    }`}
                  >
                    Used
                  </button>

                  <button
                    onClick={() => toggleSelectCondition('Clean')}
                    className={`btn btn-sm rounded-full font-medium transition ${
                      selectedCondition.includes('Clean')
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-500 text-gray-500 bg-transparent'
                    }`}
                  >
                    Clean
                  </button>

                  <button
                    onClick={() => toggleSelectCondition('Accident Free')}
                    className={`btn btn-sm rounded-full font-medium transition ${
                      selectedCondition.includes('Accident Free')
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-500 text-gray-500 bg-transparent'
                    }`}
                  >
                    Accident Free
                  </button>
                </div>
                <hr className="border-t border-gray-300 my-4" />
                <h1 className="text-primary font-medium font-[poppins] text-sm mb-2">
                  Body
                </h1>
                <div className="flex overflow-x-auto w-full space-x-2">
                  <div
                    className={`rounded-xl border-1 p-1 px-5 flex flex-col items-center min-w-[100px] text-xs transition ${
                      selectedBodyType.includes('SUV')
                        ? 'bg-primary text-secondary border-primary'
                        : 'border-gray-500 text-gray-500 bg-transparent'
                    }`}
                    onClick={() => toggleSelectBodyType('SUV')}
                  >
                    <img
                      src={suv}
                      alt="Car 1"
                      className={`size-10 ${
                        selectedBodyType.includes('SUV')
                          ? 'invert'
                          : 'opacity-50'
                      }`}
                    />
                    <h1
                      className={`text-xs ${
                        selectedBodyType.includes('SUV')
                          ? 'text-white font-medium'
                          : ''
                      }`}
                    >
                      SUV
                    </h1>
                  </div>

                  <div
                    className={`rounded-xl border-1 p-1 px-5 flex flex-col items-center min-w-[100px] text-xs transition ${
                      selectedBodyType.includes('Sedan')
                        ? 'bg-primary text-secondary border-primary'
                        : 'border-gray-500 text-gray-500 bg-transparent'
                    }`}
                    onClick={() => toggleSelectBodyType('Sedan')}
                  >
                    <img
                      src={sedan}
                      alt="Car 2"
                      className={`size-10 ${
                        selectedBodyType.includes('Sedan')
                          ? 'invert'
                          : 'opacity-50'
                      }`}
                    />
                    <h1
                      className={`text-xs ${
                        selectedBodyType.includes('Sedan')
                          ? 'text-white font-medium'
                          : ''
                      }`}
                    >
                      Sedan
                    </h1>
                  </div>

                  <div
                    className={`rounded-xl border-1 p-1 px-5 flex flex-col items-center min-w-[100px] text-xs transition ${
                      selectedBodyType.includes('Coupe')
                        ? 'bg-primary text-secondary border-primary'
                        : 'border-gray-500 text-gray-500 bg-transparent'
                    }`}
                    onClick={() => toggleSelectBodyType('Coupe')}
                  >
                    <img
                      src={coupe}
                      alt="Car 3"
                      className={`size-10 ${
                        selectedBodyType.includes('Coupe')
                          ? 'invert'
                          : 'opacity-50'
                      }`}
                    />
                    <h1
                      className={`text-xs ${
                        selectedBodyType.includes('Coupe')
                          ? 'text-white font-medium'
                          : ''
                      }`}
                    >
                      Coupe
                    </h1>
                  </div>

                  <div
                    className={`rounded-xl border-1 p-1 px-5 flex flex-col items-center min-w-[100px] text-xs transition ${
                      selectedBodyType.includes('Truck')
                        ? 'bg-primary text-secondary border-primary'
                        : 'border-gray-500 text-gray-500 bg-transparent'
                    }`}
                    onClick={() => toggleSelectBodyType('Truck')}
                  >
                    <img
                      src={pickup}
                      alt="Car 4"
                      className={`size-10 ${
                        selectedBodyType.includes('Truck')
                          ? 'invert'
                          : 'opacity-50'
                      }`}
                    />
                    <h1
                      className={`text-xs ${
                        selectedBodyType.includes('Truck')
                          ? 'text-white font-medium'
                          : ''
                      }`}
                    >
                      Truck
                    </h1>
                  </div>

                  <div
                    className={`rounded-xl border-1 p-1 px-5 flex flex-col items-center min-w-[100px] text-xs transition ${
                      selectedBodyType.includes('Convertible')
                        ? 'bg-primary text-secondary border-primary'
                        : 'border-gray-500 text-gray-500 bg-transparent'
                    }`}
                    onClick={() => toggleSelectBodyType('Convertible')}
                  >
                    <img
                      src={convertible}
                      alt="Car 5"
                      className={`size-10 ${
                        selectedBodyType.includes('Convertible')
                          ? 'invert'
                          : 'opacity-50'
                      }`}
                    />
                    <h1
                      className={`text-xs ${
                        selectedBodyType.includes('Convertible')
                          ? 'text-white font-medium'
                          : ''
                      }`}
                    >
                      Convertible
                    </h1>
                  </div>

                  <div
                    className={`rounded-xl border-1 p-1 px-5 flex flex-col items-center min-w-[100px] text-xs transition ${
                      selectedBodyType.includes('Sport')
                        ? 'bg-primary text-secondary border-primary'
                        : 'border-gray-500 text-gray-500 bg-transparent'
                    }`}
                    onClick={() => toggleSelectBodyType('Sport')}
                  >
                    <img
                      src={sport}
                      alt="Car 5"
                      className={`size-10 ${
                        selectedBodyType.includes('Sport')
                          ? 'invert'
                          : 'opacity-50'
                      }`}
                    />
                    <h1
                      className={`text-xs ${
                        selectedBodyType.includes('Sport')
                          ? 'text-white font-medium'
                          : ''
                      }`}
                    >
                      Sport
                    </h1>
                  </div>
                </div>
                <hr className="border-t border-gray-300 my-4" />
                <h1 className="text-primary font-medium font-[poppins] text-sm mb-2">
                  Fuel Type
                </h1>
                <div className="flex space-x-2">
                  <div
                    className={`rounded-full border-1 space-x-2 flex flex-1 justify-center items-center transition ${
                      selectedFuelType.includes('Gas')
                        ? 'bg-primary text-secondary border-primary'
                        : 'border-gray-500 text-gray-500 bg-transparent'
                    }`}
                    onClick={() => toggleSelectFuelType('Gas')}
                  >
                    <img
                      src={gas}
                      alt="Gas"
                      className={`size-5 ${
                        selectedFuelType.includes('Gas')
                          ? 'invert'
                          : 'opacity-50'
                      }`}
                    />
                    <h1
                      className={` ${
                        selectedFuelType.includes('Gas')
                          ? 'text-white font-medium'
                          : ''
                      }`}
                    >
                      Gas
                    </h1>
                  </div>
                  <div
                    className={`rounded-full border-1 space-x-2 flex flex-1 justify-center items-center transition ${
                      selectedFuelType.includes('electric')
                        ? 'bg-primary text-secondary border-primary'
                        : 'border-gray-500 text-gray-500 bg-transparent'
                    }`}
                    onClick={() => toggleSelectFuelType('electric')}
                  >
                    <img
                      src={electric}
                      alt="Electric"
                      className={`size-5 ${
                        selectedFuelType.includes('electric')
                          ? 'invert'
                          : 'opacity-50'
                      }`}
                    />
                    <h1
                      className={` ${
                        selectedFuelType.includes('electric')
                          ? 'text-white font-medium'
                          : ''
                      }`}
                    >
                      Electric
                    </h1>
                  </div>
                  <div
                    className={`py-2 rounded-full border-1 space-x-2 flex flex-1 justify-center items-center transition ${
                      selectedFuelType.includes('hybrid')
                        ? 'bg-primary text-secondary border-primary'
                        : 'border-gray-500 text-gray-500 bg-transparent'
                    }`}
                    onClick={() => toggleSelectFuelType('hybrid')}
                  >
                    <img
                      src={hybrid}
                      alt="Hybrid"
                      className={`size-5 ${
                        selectedFuelType.includes('hybrid')
                          ? 'invert'
                          : 'opacity-50'
                      }`}
                    />
                    <h1
                      className={` ${
                        selectedFuelType.includes('hybrid')
                          ? 'text-white font-medium'
                          : ''
                      }`}
                    >
                      Hybrid
                    </h1>
                  </div>
                </div>
                <hr className="border-t border-gray-300 my-4" />
                <h1 className="text-primary font-medium font-[poppins] text-sm mb-2">
                  Make
                </h1>
                <div className="flex overflow-x-auto w-full space-x-2">
                  <div
                    className={`rounded-xl border-1 p-2 flex flex-col items-center min-w-[100px] text-xs transition ${
                      selectedMake.includes('mercedes')
                        ? 'bg-primary text-secondary border-primary'
                        : 'border-gray-500 text-secondary bg-transparent'
                    }`}
                    onClick={() => toggleSelectMake('mercedes')}
                  >
                    <img src={benz} alt="" className="size-20" />
                  </div>
                  <div
                    className={`rounded-xl border-1 p-2 flex flex-col items-center min-w-[100px] text-xs transition ${
                      selectedMake.includes('bmw')
                        ? 'bg-primary text-secondary border-primary'
                        : 'border-gray-500 text-secondary bg-transparent'
                    }`}
                    onClick={() => toggleSelectMake('bmw')}
                  >
                    <img src={bmw} alt="" className="size-20" />
                  </div>
                  <div
                    className={`rounded-xl border-1 p-2 flex flex-col items-center min-w-[100px] text-xs transition ${
                      selectedMake.includes('audi')
                        ? 'bg-primary text-secondary border-primary'
                        : 'border-gray-500 text-secondary bg-transparent'
                    }`}
                    onClick={() => toggleSelectMake('audi')}
                  >
                    <img src={audi} alt="" className="size-20" />
                  </div>
                  <div
                    className={`rounded-xl border-1 p-2 flex flex-col items-center min-w-[100px] text-xs transition ${
                      selectedMake.includes('toyota')
                        ? 'bg-primary text-secondary border-primary'
                        : 'border-gray-500 text-secondary bg-transparent'
                    }`}
                    onClick={() => toggleSelectMake('toyota')}
                  >
                    <img src={toyota} alt="" className="size-20" />
                  </div>
                  <div
                    className={`rounded-xl border-1 p-2 flex flex-col items-center min-w-[100px] text-xs transition ${
                      selectedMake.includes('honda')
                        ? 'bg-primary text-secondary border-primary'
                        : 'border-gray-500 text-secondary bg-transparent'
                    }`}
                    onClick={() => toggleSelectMake('honda')}
                  >
                    <img src={honda} alt="" className="size-20" />
                  </div>
                </div>
                <hr className="border-t border-gray-300 my-4" />
                <h1 className="text-primary font-medium font-[poppins] text-sm mb-2">
                  Year
                </h1>
                <div className="w-full flex overflow-x-auto space-x-2">
                  {years.map((year) => (
                    <div
                      key={year}
                      className={`rounded-full border p-2 flex justify-center items-center min-w-[100px] text-xs transition cursor-pointer
            ${
              selectedYear.includes(year)
                ? 'bg-primary text-white border-primary'
                : 'border-gray-500 text-gray-500 bg-transparent'
            }`}
                      onClick={() => toggleSelectYear(year)}
                    >
                      <h1
                        className={`text-xs ${
                          selectedYear.includes(year)
                            ? 'text-white font-medium'
                            : ''
                        }`}
                      >
                        {year}
                      </h1>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div> */}

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
                  <CircleCheck className="stroke-white mr-2" /> We are Nigeria’s
                  largest car dealership
                </div>
                <div className="flex space-x-2 text-white">
                  <CircleCheck className="stroke-white mr-2" /> We are Nigeria’s
                  largest car dealership
                </div>
                <div className="flex space-x-2 text-white">
                  <CircleCheck className="stroke-white mr-2" /> We are Nigeria’s
                  largest car dealership
                </div>
              </div>

              <div className="flex space-x-2 mt-4 w-full ">
                <button className="flex-1 btn btn-lg btn-primary rounded-full font-medium w-full">
                  Sell Now
                </button>
                <button className="flex-1 btn btn-lg backdrop-blur-lg bg-secondary/30 border-none shadow-none text-white rounded-full font-medium">
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
          <div className="flex space-x-8 border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-2 text-sm transition ${
                  activeTab === tab
                    ? 'text-black font-semibold'
                    : 'text-gray-500'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute left-0 -bottom-[1px] w-full h-[2px] bg-red-500 rounded-full"></span>
                )}
              </button>
            ))}
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
                  image={car.image}
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
                  link={`/cars/${car.id}`}
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
              className="btn btn-primary btn-lg rounded-full"
              onClick={handleListingsClick}
            >
              View All
              <ArrowUpRight className="stroke-whitesize-5 ml-1" />
            </button>
          </div>
        </section>
        <section id="makes" className="w-full p-4">
          <h6 className="text-primary font-[poppins]">Top Makes</h6>
          <div className="flex w-full justify-between">
            <div>
              <h1 className="font-bold text-xl font-[poppins]">
                Explore Our Top Makes
              </h1>
            </div>
            <div className="text-sm font-[poppins] flex items-end">
              View All <ArrowUpRight className="size-5" />
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
          <div className="flex flex-col space-y-2 items-center my-8">
            <img src={discount} alt="discount" className="size-10" />
            <h1 className="text-white ">Special Financing Offers</h1>
          </div>
          <div className="flex flex-col space-y-2 items-center my-8">
            <img src={trusted} alt="trusted" className="size-10" />
            <h1 className="text-white ">Trusted by Thousands</h1>
          </div>
          <div className="flex flex-col space-y-2 items-center my-8">
            <img src={price} alt="price" className="size-10" />
            <h1 className="text-white">Competitive Pricing</h1>
          </div>
          <div className="flex flex-col space-y-2 items-center my-8">
            <img src={service} alt="service" className="size-10" />
            <h1 className="text-white ">Expert Car Service</h1>
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
            <div>
              <Link to="/blogs" className="text-primary flex">
                View All <ArrowUpRight />
              </Link>
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
                  />
                ))
            )}
          </div>
        </section>
        <section id="Calc" className="relative w-full">
          {/* <div className="flex items-center space-x-4 h-110 bg-black">
            <img
              src={calc}
              alt="Sell"
              className="absolute inset-0 w-full h-full object-cover opacity-70"
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
          </div> */}
        </section>
        <section id="Calc" className="relative w-full">
          <div className="flex items-center space-x-4 h-110 bg-black">
            <img
              src={calc}
              alt="Sell"
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            />
            <div className="relative z-10 h-full w-full p-8">
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
                      type="text"
                      value={'100,000,000'}
                      //   onChange={}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder=" " // Trick for floating label
                    />
                    <label
                      className={`absolute left-3 transition-all duration-300 
          ${
            // eslint-disable-next-line no-constant-condition
            isFocused || true
              ? 'text-xs top-2 text-gray-500'
              : 'text-gray-400 top-4'
          } 
        `}
                    >
                      Car Price (N)
                    </label>
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <div className="relative w-80">
                      <input
                        type="text"
                        value={4}
                        //   onChange={}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder=" " // Trick for floating label
                      />
                      <label
                        className={`absolute left-3 transition-all duration-300 
          ${
            // eslint-disable-next-line no-constant-condition
            isFocused || true
              ? 'text-xs top-2 text-gray-500'
              : 'text-gray-400 top-4'
          } 
        `}
                      >
                        Installment Term (years)
                      </label>
                    </div>
                    <div className="relative w-80">
                      <input
                        type="text"
                        value={'10,000,000'}
                        //   onChange={}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder=" " // Trick for floating label
                      />
                      <label
                        className={`absolute left-3 transition-all duration-300 
          ${
            // eslint-disable-next-line no-constant-condition
            isFocused || true
              ? 'text-xs top-2 text-gray-500'
              : 'text-gray-400 top-4'
          } 
        `}
                      >
                        Down Payment (N)
                      </label>
                    </div>
                  </div>
                  <button className="w-full h-15 mt-2 text-white btn-primary btn-lg rounded-full">
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
            <button className="btn btn-xl backdrop-blur-lg bg-secondary/30 border-none shadow-none text-white rounded-full font-medium">
              Contact Us
            </button>
          </div>

          <div className="absolute bottom-5 inset-x-0 text-center z-10">
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-['Microgramma_D_Extended'] tracking-widest">
              Company Name
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
                  <CircleCheck className="stroke-white mr-2" /> We are Nigeria’s
                  largest car dealership
                </div>
                <div className="flex space-x-2 text-white">
                  <CircleCheck className="stroke-white mr-2" /> We are Nigeria’s
                  largest car dealership
                </div>
                <div className="flex space-x-2 text-white">
                  <CircleCheck className="stroke-white mr-2" /> We are Nigeria’s
                  largest car dealership
                </div>
              </div>

              <div className="flex space-x-2 mt-4 w-full ">
                <button className="flex-1 btn md:btn-lg btn-primary rounded-full font-medium w-full">
                  Sell Now
                </button>
                <button className="flex-1 btn md:btn-lg backdrop-blur-lg bg-secondary/30 border-none shadow-none text-white rounded-full font-medium">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>
        <section id="listings" className="w-full p-4 pr-0">
          <div className="w-full max-w-6xl mx-auto">
            <h1 className="text-xl font-semibold font-[poppins] mb-2">
              Explore All Cars
            </h1>
            <div className="flex w-full justify-between">
              <div className="flex flex-shrink-0 space-x-8 border-gray-200">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative pb-2 text-sm transition ${
                      activeTab === tab
                        ? 'text-black font-semibold'
                        : 'text-gray-500'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <span className="absolute left-0 -bottom-[1px] w-full h-[2px] bg-red-500 rounded-full"></span>
                    )}
                  </button>
                ))}
              </div>
              <div className="w-full flex justify-end pr-2">
                <button
                  className="btn btn-primary rounded-full"
                  onClick={handleListingsClick}
                >
                  View All
                  <ArrowUpRight className="stroke-whitesize-5 ml-1" />
                </button>
              </div>
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
                    image={car.image}
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
                    link={`/cars/${car.id}`}
                  />
                ))
              )}
            </div>
          </div>
        </section>
        <section id="makes" className="w-full p-4 items-start justify-center">
          <div className="w-full max-w-6xl mx-auto">
            <h6 className="text-primary font-[poppins]">Top Makes</h6>
            <div className="flex w-full justify-between">
              <div>
                <h1 className="font-bold text-xl font-[poppins]">
                  Explore Our Top Makes
                </h1>
              </div>
              <div className="text-sm font-[poppins] flex items-end">
                View All <ArrowUpRight className="size-5" />
              </div>
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
                <Link to="/blogs" className="text-primary flex">
                  View All <ArrowUpRight />
                </Link>
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
                      type="text"
                      value={'100,000,000'}
                      //   onChange={}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder=" " // Trick for floating label
                    />
                    <label
                      className={`absolute left-3 transition-all duration-300 
          ${
            // eslint-disable-next-line no-constant-condition
            isFocused || true
              ? 'text-xs top-2 text-gray-500'
              : 'text-gray-400 top-4'
          } 
        `}
                    >
                      Car Price (N)
                    </label>
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <div className="relative w-80">
                      <input
                        type="text"
                        value={4}
                        //   onChange={}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder=" " // Trick for floating label
                      />
                      <label
                        className={`absolute left-3 transition-all duration-300 
          ${
            // eslint-disable-next-line no-constant-condition
            isFocused || true
              ? 'text-xs top-2 text-gray-500'
              : 'text-gray-400 top-4'
          } 
        `}
                      >
                        Installment Term (years)
                      </label>
                    </div>
                    <div className="relative w-80">
                      <input
                        type="text"
                        value={'10,000,000'}
                        //   onChange={}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder=" " // Trick for floating label
                      />
                      <label
                        className={`absolute left-3 transition-all duration-300 
          ${
            // eslint-disable-next-line no-constant-condition
            isFocused || true
              ? 'text-xs top-2 text-gray-500'
              : 'text-gray-400 top-4'
          } 
        `}
                      >
                        Down Payment (N)
                      </label>
                    </div>
                  </div>
                  <button className="w-full h-15 mt-2 text-white btn-primary btn-lg rounded-full">
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
