import React, { useRef, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Range } from 'react-range';
import suv from '../images/suv.png';
import sedan from '../images/sedan.png';
import hybrid from '../images/hybrid.png';
import pickup from '../images/pickup.png';
import sport from '../images/sport.png';
import coupe from '../images/coupe.png';
import convertible from '../images/convertible.png';
import electric from '../images/electric.png';
import gas from '../images/gas.png';
import benz from '../images/benz.png';
import bmw from '../images/bmw.png';
import audi from '../images/audi.png';
import toyota from '../images/toyota.png';
import honda from '../images/honda.png';
import { ChevronDown } from 'lucide-react';
import Breadcrumbs from '../components/BreadCrumbs';
import m4 from '../images/m4.jpg';
import mileage from '../images/mileage.png';
import transmission from '../images/transmission.png';
import date from '../images/date.png';
import CarCard from '../components/CarCard';
import CarCard2 from '../components/CarCard2';

const Listings = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // Ref to the dropdown element to detect clicks outside
  const filterRef = useRef(null);
  //   const [isFocused, setIsFocused] = useState(false);

  // Constants for slider min, max, and step
  const SLIDER_MIN = 0;
  const SLIDER_MAX = 100000000;
  const SLIDER_STEP = 1000;

  const [values, setValues] = useState([10000, 100000000]);

  // Format as currency
  const formatPrice = (price) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);

  const [selectedCondition, setSelectedCondition] = useState([]);
  const [selectedBodyType, setSelectedBodyType] = useState([]); // can hold multiple values
  const [selectedFuelType, setSelectedFuelType] = useState([]); // can hold multiple values
  const [selectedMake, setSelectedMake] = useState([]); // can hold multiple values
  const [selectedYear, setSelectedYear] = useState([]); // can hold multiple values

  const toggleSelectYear = (value) => {
    setSelectedYear(
      (prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value) // remove if already selected
          : [...prev, value] // add if not selected
    );
  };

  const toggleSelectMake = (value) => {
    setSelectedMake(
      (prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value) // remove if already selected
          : [...prev, value] // add if not selected
    );
  };

  const toggleSelectFuelType = (value) => {
    setSelectedFuelType(
      (prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value) // remove if already selected
          : [...prev, value] // add if not selected
    );
  };

  const toggleSelectCondition = (value) => {
    setSelectedCondition(
      (prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value) // remove if already selected
          : [...prev, value] // add if not selected
    );
  };

  const toggleSelectBodyType = (value) => {
    setSelectedBodyType(
      (prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value) // remove if already selected
          : [...prev, value] // add if not selected
    );
  };

  const years = Array.from({ length: 26 }, (_, i) => (2025 - i).toString());
  return (
    <div className='font-[poppins] bg-base-200'>
      <div id="mobile" className="w-full">
        <section className="w-full bg-secondary pt-16 px-4 h-40 sticky top-0 z-50">
          <hr className="border-t border-gray-500" />
          <div className="fixed top-20 inset-x-0 text-center w-full px-4 z-50 justify-center flex">
            <div className={`items-center justify-between p-1 flex w-full max-w-4xl rounded-full h-15 z-50 relative ${isFilterOpen ? 'bg-secondary/30 sm:bg-white' : 'bg-white'}`}>
              <div
                className={`relative text-secondary items-center flex h-full px-4 border-r-2 cursor-pointer text-sm transition-all duration-300 ${isFilterOpen ? 'text-white border-r-white sm:text-secondary sm:border-r-black' : 'text-secondary border-r-secondary/50'}`}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                ref={filterRef} // Attach the ref to this element
              >
                <ChevronDown
                  className={`size-5 mr-1 transform transition-transform duration-300 ${
                    isFilterOpen ? 'rotate-180 text-white sm:text-secondary' : 'rotate-0'
                  }`}
                />
                Filters
              </div>
              <div className="h-full items-center flex w-full">
                <input
                  type="text"
                  placeholder="Search for a car..."
                  className={`input w-full border-none bg-transparent text-white sm:placeholder:text-secondary shadow-none ${isFilterOpen ? 'placeholder:text-white' : 'placeholder:text-secondary'}`}
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
                className="absolute top-[-5px] sm:top-17 text-start inset-x-0 w-full px-3 z-40 max-h-[85vh] justify-center flex sm:h-[60vh]"
              >
                <div className="bg-white text-gray-800 rounded-4xl pt-17 sm:pt-4 pb-5 p-4 sm:px-7 max-w-4xl shadow-xl overflow-y-auto max-h-[85vh] sm:h-[60vh]">
                  <h1 className="font-semibold sm:text-2xl font-[poppins] text-lg pt-2">
                    Filters
                  </h1>
                  <p className="font-[poppins] text-gray-500">
                    Personalize your search by selecting the filters below.
                  </p>
                  <h1 className="text-primary font-medium font-[poppins] mt-2 ">
                    Price Range
                  </h1>
                  <div className="pt-2">
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                      <span>{formatPrice(values[0])}</span>
                      <span>{formatPrice(values[1])}</span>
                    </div>

                    {/* Container for the sliders */}
                    <div className="relative h-1">
                      {/* Track for the range */}
                      <div className="absolute inset-0 bg-gray-300 rounded-full"></div>

                      {/* Minimum price slider */}
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
                            {/* Colored fill between thumbs */}
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
                  <h1 className="text-primary font-medium font-[poppins]  mb-2">
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
                  <h1 className="text-primary font-medium font-[poppins] mb-2">
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
                  <h1 className="text-primary font-medium font-[poppins] mb-2">
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
                  <h1 className="text-primary font-medium font-[poppins] mb-2">
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
                  <h1 className="text-primary font-medium font-[poppins] mb-2">
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
          </div>
        </section>
        <section className='w-full p-4'>
            <div className='w-full max-w-6xl mx-auto'>
                <Breadcrumbs />
                <div className='w-full flex justify-between items-end'>
                    <h1 className=' text-3xl font-bold'>Listings</h1>
                    <div className='flex flex-shrink-0 items-center'>
                        <p className='text-sm text-gray-600 flex-shrink-0 pr-1'>Sort by</p>
                        <select className='select border-0 bg-gray-200 select-xs max-w-30 sm:max-w-50'>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="year-asc">Year: Oldest to Newest</option>
                            <option value="year-desc">Year: Newest to Oldest</option>
                        </select>
                    </div>
                </div>
            </div>
        </section>
        <section id='listings' className='w-full justify-center flex'>
            <div className="w-full max-w-6xl px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <CarCard2
                // className="flex-shrink-0"
                image={m4}
                title="BMW M4"
                description="425-hp twin-turbo inline-six, r..."
                mileage={{ icon: mileage, value: '2000km' }}
                transmission={{ icon: transmission, value: 'Automatic' }}
                fuel={{ icon: gas, value: 'Gas' }}
                year={{ icon: date, value: '2019' }}
                price="N35,000,000"
                link="/cars/bmw-m4"
              />
              <CarCard2
                // className="flex-shrink-0"
                image={m4}
                title="BMW M4"
                description="425-hp twin-turbo inline-six, r..."
                mileage={{ icon: mileage, value: '2000km' }}
                transmission={{ icon: transmission, value: 'Automatic' }}
                fuel={{ icon: gas, value: 'Gas' }}
                year={{ icon: date, value: '2019' }}
                price="N35,000,000"
                link="/cars/bmw-m4"
              />
              <CarCard2
                // className="flex-shrink-0"
                image={m4}
                title="BMW M4"
                description="425-hp twin-turbo inline-six, r..."
                mileage={{ icon: mileage, value: '2000km' }}
                transmission={{ icon: transmission, value: 'Automatic' }}
                fuel={{ icon: gas, value: 'Gas' }}
                year={{ icon: date, value: '2019' }}
                price="N35,000,000"
                link="/cars/bmw-m4"
              />
              <CarCard2
                // className="flex-shrink-0"
                image={m4}
                title="BMW M4"
                description="425-hp twin-turbo inline-six, r..."
                mileage={{ icon: mileage, value: '2000km' }}
                transmission={{ icon: transmission, value: 'Automatic' }}
                fuel={{ icon: gas, value: 'Gas' }}
                year={{ icon: date, value: '2019' }}
                price="N35,000,000"
                link="/cars/bmw-m4"
              />
            </div>
        </section>
      </div>
    </div>
  );
};

export default Listings;
