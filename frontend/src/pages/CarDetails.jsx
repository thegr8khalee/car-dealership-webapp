import React, { useState } from 'react';
import {
  ArrowUpDown,
  ArrowUpRight,
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  PaintBucket,
  Phone,
  Share,
  Star,
  UserRound,
  Video,
  X,
} from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
// import Breadcrumbs from '../components/BreadCrumbs';

// Using placeholder URLs for images and Breadcrumbs component
// const Breadcrumbs = () => <div className="text-sm text-gray-500 mb-2">Home &gt; BMW &gt; M3</div>;
import m4 from '../images/m4.jpg';
import mileage from '../images/mileage.png';
import transmission from '../images/transmission.png';
import sedan from '../images/sedan.png';
import engine from '../images/engine.png';
import door from '../images/door.png';
import cylinder from '../images/cylinder.png';
import gas from '../images/gas.png';
import whatsapp from '../images/whatsapp.png';
import CarCard from '../components/CarCard';
import date from '../images/date.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useCarStore } from '../store/useCarStore';
import { useEffect } from 'react';

const CarDetails = () => {
  const { id } = useParams();
  const { car, getCarById, isGettingCar } = useCarStore();
  // Data for car features and tabs

  useEffect(() => {
    getCarById(id);
  }, [getCarById, id]);

  console.log('Car Details:', car);

  const [activeTab, setActiveTab] = useState('overview');
  const tabs = ['overview', 'description', 'features'];
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

  const navigate = useNavigate();

  const handleListingsClick = () => {
    navigate('/listings');
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const images = car?.imageUrls || [];

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard!');
    });
  };

  if (isGettingCar) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin size-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="font-[poppins] bg-base-200">
      <div id="main-content mobile" className="sm:hidden w-full">
        <div className="bg-secondary h-16 w-full sticky top-0 z-50"></div>
        <div className="w-full max-w-7xl mx-auto px-4 mt-2">
          {/* <Breadcrumbs /> */}

          {/* New Hero Section with Image and CTAs */}
          <section
            id="hero"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6"
          >
            {/* Image Gallery */}
            {car?.imageUrls && car?.imageUrls.length > 0 && (
              <div className="relative flex justify-center items-center">
                {/* Prev button */}
                <button
                  onClick={prevImage}
                  disabled={images.length <= 1}
                  className="absolute left-2 top-1/2 -translate-y-1/2 btn btn-circle bg-white/50 backdrop-blur-md shadow-lg border-0"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="size-6" />
                </button>

                {/* Current image */}
                {images.length > 0 ? (
                  <img
                    src={images[currentIndex]}
                    alt={`Car image ${currentIndex + 1}`}
                    className="rounded-xl h-70 w-full object-cover"
                  />
                ) : (
                  <div className="w-full h-50 flex items-center justify-center rounded-xl bg-gray-100 text-gray-500">
                    No Image Available
                  </div>
                )}

                {/* Next button */}
                <button
                  onClick={nextImage}
                  disabled={images.length <= 1}
                  className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-circle bg-white/50 backdrop-blur-md shadow-lg border-0"
                  aria-label="Next Image"
                >
                  <ChevronRight className="size-6" />
                </button>

                {/* Video button */}
                <button
                  className="absolute left-4 bottom-4 btn rounded-full shadow-lg bg-black text-white border-0"
                  aria-label="Play Video"
                >
                  <Video className="size-5" /> Video
                </button>
              </div>
            )}

            {/* Price and Action Buttons */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-xl sm:text-5xl font-medium">{car?.make}</h1>
                <span className="text-3xl font-bold">{car?.model} </span>
                <span className="text-3xl font-bold">{car?.year}</span>
                <h1 className="text-2xl sm:text-3xl font-medium mt-2">
                  N{car?.price?.toLocaleString()}{' '}
                </h1>
              </div>

              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mt-6">
                <button
                  className="btn btn-primary w-full h-15 rounded-full font-bold text-lg"
                  onClick={() =>
                    document.getElementById('test_drive_modal').showModal()
                  }
                >
                  Schedule a Test Drive
                </button>
                <dialog id="test_drive_modal" className="modal">
                  <div className="modal-box bg-white p-6 py-8 rounded-2xl shadow-xl">
                    <button
                      className="btn btn-circle bg-transparent border-0 shadow-none btn-sm absolute right-2 top-2"
                      onClick={() =>
                        document.getElementById('test_drive_modal').close()
                      }
                    >
                      <X className="size-5" />
                    </button>
                    <h2 className="text-2xl font-semibold mb-4">
                      Schedule a Test Drive
                    </h2>
                    <form action="" className="space-y-4">
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
                          className={`absolute left-3 transition-all duration-300 text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary ${
                            testDriveFormData.name &&
                            'top-2 text-xs text-primary'
                          }`}
                        >
                          Your Name
                        </label>
                      </div>
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
                          className={`absolute left-3 transition-all duration-300 text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary ${
                            testDriveFormData.email &&
                            'top-2 text-xs text-primary'
                          }`}
                        >
                          Your Email
                        </label>
                      </div>
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
                          className={`absolute left-3 transition-all duration-300 text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary ${
                            testDriveFormData.date &&
                            'top-2 text-xs text-primary'
                          }`}
                        >
                          Select Date
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="w-full h-15 mt-2 text-white btn-primary btn-lg text-lg rounded-xl font-semibold"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </dialog>
                <button
                  className="btn btn-outline w-full h-15 rounded-full font-bold text-lg"
                  onClick={() => document.getElementById('Contact').showModal()}
                >
                  Contact Us
                </button>
                <dialog id="Contact" className="modal">
                  <div className="modal-box bg-white p-6 py-8 rounded-2xl shadow-xl">
                    <button
                      className="btn btn-circle bg-transparent border-0 shadow-none btn-sm absolute right-2 top-2"
                      onClick={() => document.getElementById('Contact').close()}
                    >
                      <X className="size-5" />
                    </button>
                    <h2 className="text-2xl font-semibold mb-4">
                      Contact Us Now!
                    </h2>
                    <div className="w-full flex justify-between my-4 space-x-2">
                      <button className="btn btn-lg bg-blue-500 rounded-full w-full flex-1 shadow-none border-none">
                        <Phone className="size-6 fill-white stroke-white" />
                      </button>
                      <button className="text-white btn btn-lg bg-green-500 rounded-full w-full flex-1 shadow-none border-none">
                        <img
                          src={whatsapp}
                          alt="WhatsApp"
                          className="size-6 fill-white stroke-white"
                        />
                      </button>
                    </div>
                    <form action="" className="space-y-4">
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
                          htmlFor="name"
                          className={`absolute left-3 transition-all duration-300 text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary ${
                            testDriveFormData.name &&
                            'top-2 text-xs text-primary'
                          }`}
                        >
                          Email
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="email"
                          name="subject"
                          value={testDriveFormData.subject}
                          onChange={handleTestDriveChange}
                          className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                          placeholder=" "
                        />
                        <label
                          htmlFor="email"
                          className={`absolute left-3 transition-all duration-300 text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary ${
                            testDriveFormData.email &&
                            'top-2 text-xs text-primary'
                          }`}
                        >
                          Subject
                        </label>
                      </div>
                      <div className="relative">
                        <textarea
                          name="message"
                          value={testDriveFormData.message}
                          onChange={handleTestDriveChange}
                          className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                          placeholder=" "
                        />
                        <label
                          htmlFor="message"
                          className={`absolute left-3 transition-all duration-300 text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary ${
                            testDriveFormData.message &&
                            'top-2 text-xs text-primary'
                          }`}
                        >
                          Message
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="w-full h-15 mt-2 text-white btn-primary btn-lg text-lg rounded-xl font-semibold"
                      >
                        Send Us a Message
                      </button>
                    </form>
                  </div>
                </dialog>
              </div>

              <div className="flex justify-around items-center space-x-2 mt-6">
                <button
                  className="flex-1 btn rounded-full border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-200"
                  onClick={() => handleShare()}
                >
                  <Share className="size-5" /> Share
                </button>
                <button className="flex-1 btn rounded-full border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-200">
                  <ArrowUpDown className="size-5" /> Compare
                </button>
                <button className="flex-1 btn rounded-full border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-200">
                  <Bookmark className="size-5" /> Save
                </button>
              </div>
            </div>
          </section>

          {/* Specs and Tabs Section */}
          <section className="w-full my-8">
            {/* Key Specs */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-white shadow-sm flex flex-col items-center">
                <img src={mileage} alt="Mileage" className="size-8 mb-2" />
                <span className="text-sm md:text-base">{car?.mileage} Km</span>
              </div>
              <div className="p-4 rounded-xl bg-white shadow-sm flex flex-col items-center">
                <img src={gas} alt="Gas" className="size-8 mb-2" />
                <span className="text-sm md:text-base capitalize">
                  {car?.fuelType}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-white shadow-sm flex flex-col items-center">
                <img
                  src={transmission}
                  alt="Transmission"
                  className="size-8 mb-2"
                />
                <span className="text-sm md:text-base capitalize">
                  {car?.transmission}
                </span>
              </div>
            </div>

            {/* Tab Selectors */}
            <div className="relative flex gap-6 mb-4 items-center justify-center w-full mt-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 relative pb-2 text-sm md:text-base font-medium transition-colors ${
                    activeTab === tab
                      ? 'text-primary'
                      : 'text-gray-500 hover:text-primary'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-primary"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Overview */}
                {activeTab === 'overview' && (
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                      <div className="flex items-center">
                        <img
                          src={sedan}
                          alt="Sedan"
                          className="inline mr-2 size-6"
                        />
                        <span className="text-sm text-primary">
                          {car?.bodyType}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <img
                          src={mileage}
                          alt="Sedan"
                          className="inline mr-2 size-6"
                        />
                        <span className="text-sm text-primary">
                          {car?.mileage}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <img
                          src={gas}
                          alt="Sedan"
                          className="inline mr-2 size-6"
                        />
                        <span className="text-sm text-primary">
                          {car?.fuelType}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <img
                          src={transmission}
                          alt="Sedan"
                          className="inline mr-2 size-6"
                        />
                        <span className="text-sm text-primary">
                          {car?.transmission}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <img
                          src={date}
                          alt="Sedan"
                          className="inline mr-2 size-6"
                        />
                        <span className="text-sm text-primary">
                          {car?.year}
                        </span>
                      </div>{' '}
                      <div className="flex items-center">
                        <UserRound className="inline mr-2 size-6" />
                        <span className="text-sm text-primary">
                          {car?.condition}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <img
                          src={engine}
                          alt="Sedan"
                          className="inline mr-2 size-6"
                        />
                        <span className="text-sm text-primary">
                          {car?.engineSize}L
                        </span>
                      </div>
                      <div className="flex items-center">
                        <img
                          src={cylinder}
                          alt="Sedan"
                          className="inline mr-2 size-6"
                        />
                        <span className="text-sm text-primary">
                          {car?.cylinder} Cylinders
                        </span>
                      </div>
                      <div className="flex items-center">
                        <PaintBucket className="inline mr-2 size-6" />
                        <span className="text-sm text-primary">
                          {car?.color}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <img
                          src={door}
                          alt="Sedan"
                          className="inline mr-2 size-6"
                        />
                        <span className="text-sm text-primary">
                          {car?.door} Doors
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {/* Description */}
                {activeTab === 'description' && (
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="text-gray-600">{car?.description}</p>
                  </div>
                )}
                {/* Features */}
                {activeTab === 'features' && (
                  <div className="bg-white p-6 rounded-xl shadow-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Interior</h3>
                      <ul className="space-y-2">
                        {car?.interior.map((item, index) => (
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
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Exterior</h3>
                      <ul className="space-y-2">
                        {car?.exterior.map((item, index) => (
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
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Comfort</h3>
                      <ul className="space-y-2">
                        {car?.comfort.map((item, index) => (
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
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Safety</h3>
                      <ul className="space-y-2">
                        {car?.safety.map((item, index) => (
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
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </section>

          {/* Consolidated Forms Section */}
          <section
            id="forms"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8"
          >
            {/* Installment Calculator */}
            <div className="bg-white p-6 py-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-semibold mb-4">
                Installment Calculator
              </h2>
              <form action="" className="space-y-4">
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
                    className={`absolute left-3 transition-all duration-300 text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary ${
                      calcFormData.price && 'top-2 text-xs text-primary'
                    }`}
                  >
                    Car Price (N)
                  </label>
                </div>
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
                    className={`absolute left-3 transition-all duration-300 text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary ${
                      calcFormData.years && 'top-2 text-xs text-primary'
                    }`}
                  >
                    Payment Period (Years)
                  </label>
                </div>
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
                    className={`absolute left-3 transition-all duration-300 text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary ${
                      calcFormData.downPayment && 'top-2 text-xs text-primary'
                    }`}
                  >
                    Down Payment (N)
                  </label>
                </div>
                <button
                  type="button"
                  className="w-full h-15 mt-2 text-white btn-primary btn-lg text-lg rounded-xl font-semibold"
                >
                  Calculate
                </button>
              </form>
            </div>
          </section>

          <section id="dimensions" className="w-full my-8">
            <div className="bg-white p-6 py-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-semibold mb-4">
                Dimensions & Capacity
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex flex-col">
                  <span className="font-medium">Length</span>
                  <span className="text-gray-500">{car?.length} cm</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">Width</span>
                  <span className="text-gray-500">{car?.width} cm</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">Trunk Capacity</span>
                  <span className="text-gray-500">{car?.trunkCapacity} L</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">Tire Size</span>
                  <span className="text-gray-500">{car?.tireSize}</span>
                </div>
              </div>
              {/* <div className="bg-white p-6 py-8 rounded-2xl shadow-xl"> */}
              <h2 className="text-2xl font-semibold my-8">
                Engine & Transmission
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex flex-col">
                  <span className="font-medium">Engine Capacity</span>
                  <span className="text-gray-500">{car?.engineSize} L</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">Horsepower</span>
                  <span className="text-gray-500">{car?.horsepower}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">Torque</span>
                  <span className="text-gray-500">{car?.torque} Nm</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">0-100 km/h</span>
                  <span className="text-gray-500">
                    {car?.zeroToHundred} sec
                  </span>
                </div>
              </div>
            </div>
            {/* </div> */}
          </section>
          <section id="reviews" className="w-full my-8">
            <div className="bg-white p-6 py-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-semibold mb-2">Customer Reviews</h2>
              {/* <h1 className="font-medium mb-2">Very Good</h1> */}
              <div className="flex items-center justify-between space-x-2 my-2">
                <div className="w-32 h-32 rounded-full border-4 borderprimary flex flex-col items-center justify-center text-red-500">
                  <span className="text-3xl font-semibold">5.0</span>
                  <span className="text-sm">Out of 5.0</span>
                </div>
                <div className="grid grid-cols-2 gap-4 flex-2">
                  <div className="flex flex-col">
                    <span className="font-medium">Exterior</span>
                    <div className="flex items-center w-full">
                      <Star className="fill-primary stroke-0 size-4" />
                      <span className="text-gray-500">5.0</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">Interior</span>
                    <div className="flex items-center w-full">
                      <Star className="fill-primary stroke-0 size-4" />
                      <span className="text-gray-500">5.0</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">Comfort</span>
                    <div className="flex items-center w-full">
                      <Star className="fill-primary stroke-0 size-4" />
                      <span className="text-gray-500">5.0</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">Performance</span>
                    <div className="flex items-center w-full">
                      <Star className="fill-primary stroke-0 size-4" />
                      <span className="text-gray-500">5.0</span>
                    </div>
                  </div>
                </div>
              </div>
              <p>
                Based on <b>100 reviews</b>
              </p>
              <div className="flex flex-col space-y-6 mt-4">
                <div>
                  <div className="flex w-full justify-between items-center">
                    <h1 className="font-medium text-lg">Name Surname</h1>
                    <p>Date</p>
                  </div>
                  <div className="flex space-x-2 my-1">
                    <Star className="fill-primary stroke-0 size-4" />
                    <Star className="fill-primary stroke-0 size-4" />
                    <Star className="fill-primary stroke-0 size-4" />
                    <Star className="fill-primary stroke-0 size-4" />
                    <Star className="fill-primary stroke-0 size-4" />
                  </div>
                  <p className=" text-sm">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Exercitationem libero tempora autem totam incidunt
                    cupiditate consequatur? Ratione excepturi doloribus ipsum
                    quo eaque. Cumque asperiores quas perspiciatis quisquam
                    possimus officiis et.
                  </p>
                </div>
                <div>
                  <div className="flex w-full justify-between items-center">
                    <h1 className="font-medium text-lg">Name Surname</h1>
                    <p>Date</p>
                  </div>
                  <div className="flex space-x-2 my-1">
                    <Star className="fill-primary stroke-0 size-4" />
                    <Star className="fill-primary stroke-0 size-4" />
                    <Star className="fill-primary stroke-0 size-4" />
                    <Star className="fill-primary stroke-0 size-4" />
                    <Star className="fill-primary stroke-0 size-4" />
                  </div>
                  <p className=" text-sm">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Exercitationem libero tempora autem totam incidunt
                    cupiditate consequatur? Ratione excepturi doloribus ipsum
                    quo eaque. Cumque asperiores quas perspiciatis quisquam
                    possimus officiis et.
                  </p>
                </div>
              </div>
              <h1 className="font-semibold text-xl mt-6 mb-4">
                Leave a Review
              </h1>
              <div className="grid grid-cols-2 gap-2 flex-2">
                <div className="flex flex-col gap-1">
                  <span className="font-medium">Exterior</span>
                  <div className="flex w-full justify-start">
                    <Star className="fill-primary stroke-0 size-4" />
                    <Star className="fill-primary stroke-0 size-4" />
                    <Star className="fill-primary stroke-0 size-4" />
                    <Star className="fill-primary stroke-0 size-4" />
                    <Star className="fill-primary stroke-0 size-4" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-medium">Interior</span>
                  <div className="flex w-full justify-start">
                    <Star className="fill-primary stroke-0 size-4" />
                    <Star className="fill-primary stroke-0 size-4" />
                    <Star className="fill-primary stroke-0 size-4" />
                    <Star className="fill-primary stroke-0 size-4" />
                    <Star className="fill-primary stroke-0 size-4" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-medium">Comfort</span>
                  <div className="flex w-full justify-start">
                    <Star className="fill-primary stroke-0 size-4" />
                    <Star className="fill-primary stroke-0 size-4" />
                    <Star className="fill-primary stroke-0 size-4" />
                    <Star className="fill-primary stroke-0 size-4" />
                    <Star className="fill-primary stroke-0 size-4" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-medium">Performance</span>
                  <div className="flex w-full justify-start">
                    <Star className="fill-primary stroke-0 size-4" />
                    <Star className="fill-primary stroke-0 size-4" />
                    <Star className="fill-primary stroke-0 size-4" />
                    <Star className="fill-primary stroke-0 size-4" />
                    <Star className="fill-primary stroke-0 size-4" />
                  </div>
                </div>
              </div>
              <form action="" className="space-y-4 mt-6">
                <div className="relative">
                  <input
                    type="number"
                    name="Name"
                    value={calcFormData.price}
                    onChange={handleCalcChange}
                    className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                    placeholder=" "
                  />
                  <label
                    htmlFor="name"
                    className={`absolute left-3 transition-all duration-300 text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary ${
                      calcFormData.price && 'top-2 text-xs text-primary'
                    }`}
                  >
                    Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={calcFormData.years}
                    onChange={handleCalcChange}
                    className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-3 transition-all duration-300 text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary ${
                      calcFormData.years && 'top-2 text-xs text-primary'
                    }`}
                  >
                    Email
                  </label>
                </div>
                <div className="relative">
                  <textarea
                    name="message"
                    value={calcFormData.message}
                    onChange={handleCalcChange}
                    className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  />

                  <label
                    htmlFor="message"
                    className={`absolute left-3 transition-all duration-300 text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary ${
                      calcFormData.message && 'top-2 text-xs text-primary'
                    }`}
                  >
                    Message
                  </label>
                </div>
                <button
                  type="button"
                  className="w-full h-15 mt-2 text-white btn-primary btn-lg text-lg rounded-xl font-semibold"
                >
                  Submit
                </button>
              </form>
            </div>
          </section>
          <section id="related-cars" className="w-full my-8">
            <h1 className="text-2xl font-bold">Related Cars</h1>
            <div className="flex overflow-x-auto w-full space-x-2 pl-1">
              <CarCard
                className="flex-shrink-0"
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
              <CarCard
                className="flex-shrink-0"
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
        </div>
      </div>

      <div id="main-content desktop" className="hidden sm:block w-full">
        <div className="bg-secondary h-16 w-full sticky top-0 z-50"></div>
        <div className="w-full max-w-5xl mx-auto px-4 mt-2">
          {/* <Breadcrumbs /> */}
          <section id="Hero" className="w-full my-4">
            <div className="flex w-full justify-between items-end">
              <div>
                <h1 className="text-3xl font-bold">
                  {car?.make} {car?.model}
                </h1>
                <span className="text-gray-500">{car?.year}</span>

                <h1 className="text-2xl font-medium text-primary">
                  N35,000,000
                </h1>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  className="flex-1 btn rounded-full border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-200"
                  onClick={() => handleShare()}
                >
                  <Share className="size-5" /> Share
                </button>
                <button className="flex-1 btn rounded-full border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-200">
                  <ArrowUpDown className="size-5" /> Compare
                </button>
                <button className="flex-1 btn rounded-full border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-200">
                  <Bookmark className="size-5" /> Save
                </button>
              </div>
            </div>
            <div className="relative flex justify-center items-center my-4 h-full">
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 btn btn-circle bg-white/50 backdrop-blur-md shadow-lg border-0"
                aria-label="Previous Image"
                onClick={() => prevImage()}
              >
                <ChevronLeft className="size-6" />
              </button>
              <img
                src={car?.imageUrls[currentIndex]}
                alt="m4"
                className="rounded-xl w-full h-full max-h-[70vh] object-cover"
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-circle bg-white/50 backdrop-blur-md shadow-lg border-0"
                aria-label="Next Image"
                onClick={() => nextImage()}
              >
                <ChevronRight className="size-6" />
              </button>
              {/* Video button */}
              <button
                className="absolute left-4 bottom-4 btn rounded-full shadow-lg bg-black text-white border-0"
                aria-label="Play Video"
              >
                <Video className="size-5" /> Video
              </button>
            </div>
          </section>
          <section id="key-specs" className="w-full my-8">
            {/* Key Specs */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-white shadow-sm flex flex-col items-center">
                <img src={mileage} alt="Mileage" className="size-8 mb-2" />
                <span className="text-sm md:text-base">{car?.mileage} Km</span>
              </div>
              <div className="p-4 rounded-xl bg-white shadow-sm flex flex-col items-center">
                <img src={gas} alt="Gas" className="size-8 mb-2" />
                <span className="text-sm md:text-base capitalize">
                  {car?.fuelType}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-white shadow-sm flex flex-col items-center">
                <img
                  src={transmission}
                  alt="Transmission"
                  className="size-8 mb-2"
                />
                <span className="text-sm md:text-base capitalize">
                  {car?.transmission}
                </span>
              </div>
            </div>

            <div className="my-4">
              <div className="w-full flex justify-between space-x-4">
                <div className="bg-white p-6 rounded-2xl shadow-xl w-full">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4">
                    Schedule a Test Drive
                  </h2>
                  <form action="" className="space-y-4">
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={testDriveFormData.name}
                        onChange={handleTestDriveChange}
                        className="peers w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                        placeholder=" "
                      />
                      <label
                        htmlFor="name"
                        className={`absolute left-3 transition-all duration-300 text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary ${
                          testDriveFormData.name && 'top-2 text-xs text-primary'
                        }`}
                      >
                        Your Name
                      </label>
                    </div>
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
                        className={`absolute left-3 transition-all duration-300 text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary ${
                          testDriveFormData.email &&
                          'top-2 text-xs text-primary'
                        }`}
                      >
                        Your Email
                      </label>
                    </div>
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
                        className={`absolute left-3 transition-all duration-300 text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary ${
                          testDriveFormData.date && 'top-2 text-xs text-primary'
                        }`}
                      >
                        Select Date
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="w-full h-15 mt-2 text-white btn-primary btn-lg text-lg rounded-xl font-semibold"
                    >
                      Submit
                    </button>
                  </form>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-xl w-full">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4">
                    Installment Calculator
                  </h2>
                  <form action="" className="space-y-4">
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
                        className={`absolute left-3 transition-all duration-300 text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary ${
                          calcFormData.price && 'top-2 text-xs text-primary'
                        }`}
                      >
                        Car Price (N)
                      </label>
                    </div>
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
                        className={`absolute left-3 transition-all duration-300 text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary ${
                          calcFormData.years && 'top-2 text-xs text-primary'
                        }`}
                      >
                        Payment Period (Years)
                      </label>
                    </div>
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
                        className={`absolute left-3 transition-all duration-300 text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary ${
                          calcFormData.downPayment &&
                          'top-2 text-xs text-primary'
                        }`}
                      >
                        Down Payment (N)
                      </label>
                    </div>
                    <button
                      type="button"
                      className="w-full h-15 mt-2 text-white btn-primary btn-lg text-lg rounded-xl font-semibold"
                    >
                      Calculate
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="md:hidden block">
              {/* Tab Selectors */}
              <div className="relative flex gap-6 mb-4 items-center justify-center w-full mt-8">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 relative pb-2 text-sm md:text-base font-medium transition-colors ${
                      activeTab === tab
                        ? 'text-primary'
                        : 'text-gray-500 hover:text-primary'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="underline"
                        className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-primary"
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Overview */}
                  {activeTab === 'overview' && (
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="flex items-center">
                          <img
                            src={sedan}
                            alt="Sedan"
                            className="inline mr-2 size-6"
                          />
                          <span className="text-sm text-primary">
                            {car?.bodyType}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <img
                            src={mileage}
                            alt="Sedan"
                            className="inline mr-2 size-6"
                          />
                          <span className="text-sm text-primary">
                            {car?.mileage}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <img
                            src={gas}
                            alt="Sedan"
                            className="inline mr-2 size-6"
                          />
                          <span className="text-sm text-primary">
                            {car?.fuelType}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <img
                            src={transmission}
                            alt="Sedan"
                            className="inline mr-2 size-6"
                          />
                          <span className="text-sm text-primary">
                            {car?.transmission}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <img
                            src={date}
                            alt="Sedan"
                            className="inline mr-2 size-6"
                          />
                          <span className="text-sm text-primary">
                            {car?.year}
                          </span>
                        </div>{' '}
                        <div className="flex items-center">
                          <UserRound className="inline mr-2 size-6" />
                          <span className="text-sm text-primary">
                            {car?.condition}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <img
                            src={engine}
                            alt="Sedan"
                            className="inline mr-2 size-6"
                          />
                          <span className="text-sm text-primary">
                            {car?.engineSize}L
                          </span>
                        </div>
                        <div className="flex items-center">
                          <img
                            src={cylinder}
                            alt="Sedan"
                            className="inline mr-2 size-6"
                          />
                          <span className="text-sm text-primary">
                            {car?.cylinder} Cylinders
                          </span>
                        </div>
                        <div className="flex items-center">
                          <PaintBucket className="inline mr-2 size-6" />
                          <span className="text-sm text-primary">
                            {car?.color}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <img
                            src={door}
                            alt="Sedan"
                            className="inline mr-2 size-6"
                          />
                          <span className="text-sm text-primary">
                            {car?.door} Doors
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Description */}
                  {activeTab === 'description' && (
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <p className="text-gray-600">
                        {car?.description || 'No description available.'}
                      </p>
                    </div>
                  )}
                  {/* Features */}
                  {activeTab === 'features' && (
                    <div className="bg-white p-6 rounded-xl shadow-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Interior</h3>
                        <ul className="space-y-2">
                          {car?.interior.map((item, index) => (
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
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Exterior</h3>
                        <ul className="space-y-2">
                          {car?.exterior.map((item, index) => (
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
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Comfort</h3>
                        <ul className="space-y-2">
                          {car?.comfort.map((item, index) => (
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
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Safety</h3>
                        <ul className="space-y-2">
                          {car?.safety.map((item, index) => (
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
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex flex-col space-y-4 my-4 hidden md:block">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="grid grid-cols-4 gap-4 mt-2">
                  <div className="flex items-center">
                    <img
                      src={sedan}
                      alt="Sedan"
                      className="inline mr-2 size-6"
                    />
                    <span className="text-sm text-primary">
                      {car?.bodyType}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <img
                      src={mileage}
                      alt="Sedan"
                      className="inline mr-2 size-6"
                    />
                    <span className="text-sm text-primary">{car?.mileage}</span>
                  </div>
                  <div className="flex items-center">
                    <img src={gas} alt="Sedan" className="inline mr-2 size-6" />
                    <span className="text-sm text-primary">
                      {car?.fuelType}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <img
                      src={transmission}
                      alt="Sedan"
                      className="inline mr-2 size-6"
                    />
                    <span className="text-sm text-primary">
                      {car?.transmission}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <img
                      src={date}
                      alt="Sedan"
                      className="inline mr-2 size-6"
                    />
                    <span className="text-sm text-primary">{car?.year}</span>
                  </div>{' '}
                  <div className="flex items-center">
                    <UserRound className="inline mr-2 size-6" />
                    <span className="text-sm text-primary">
                      {car?.condition}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <img
                      src={engine}
                      alt="Sedan"
                      className="inline mr-2 size-6"
                    />
                    <span className="text-sm text-primary">
                      {car?.engineSize}L
                    </span>
                  </div>
                  <div className="flex items-center">
                    <img
                      src={cylinder}
                      alt="Sedan"
                      className="inline mr-2 size-6"
                    />
                    <span className="text-sm text-primary">
                      {car?.cylinder} Cylinders
                    </span>
                  </div>
                  <div className="flex items-center">
                    <PaintBucket className="inline mr-2 size-6" />
                    <span className="text-sm text-primary">{car?.color}</span>
                  </div>
                  <div className="flex items-center">
                    <img
                      src={door}
                      alt="Sedan"
                      className="inline mr-2 size-6"
                    />
                    <span className="text-sm text-primary">
                      {car?.door} Doors
                    </span>
                  </div>
                </div>
              </div>
              <div className="">
                <h1 className="text-xl font-semibold">Description</h1>
                <p className="text-gray-600">
                  {car?.description || 'No description available.'}
                </p>
              </div>
              <hr className="border-t border-gray-300 my-8" />
              <div>
                <h1 className="text-xl font-semibold mb-2">Features</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Interior</h3>
                    <ul className="space-y-2">
                      {car?.interior.map((item, index) => (
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
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Exterior</h3>
                    <ul className="space-y-2">
                      {car?.exterior.map((item, index) => (
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
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Comfort</h3>
                    <ul className="space-y-2">
                      {car?.comfort.map((item, index) => (
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
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Safety</h3>
                    <ul className="space-y-2">
                      {car?.safety.map((item, index) => (
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
                </div>
              </div>
              <hr className="border-t border-gray-300 my-8" />
            </div>
          </section>
          <section id="dimensions" className="w-full my-8">
            <h2 className="text-2xl font-semibold mb-4">
              Dimensions & Capacity
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col">
                <span className="font-medium">Length</span>
                <span className="text-gray-500">{car?.length} cm</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Width</span>
                <span className="text-gray-500">{car?.width} cm</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Trunk Capacity</span>
                <span className="text-gray-500">{car?.trunkCapacity} L</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Tire Size</span>
                <span className="text-gray-500">{car?.tireSize}</span>
              </div>
            </div>
            <hr className="border-t border-gray-300 my-8" />
            {/* <div className="bg-white p-6 py-8 rounded-2xl shadow-xl"> */}
            <h2 className="text-2xl font-semibold my-8">Engine Details</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col">
                <span className="font-medium">Engine Type</span>
                <span className="text-gray-500">{car?.engineSize} L</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Horsepower</span>
                <span className="text-gray-500">{car?.horsepower}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Torque</span>
                <span className="text-gray-500">{car?.torque} Nm</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">0-100 km/h</span>
                <span className="text-gray-500">{car?.zeroToHundred} sec</span>
              </div>
            </div>

            {/* </div> */}
          </section>
          <hr className="border-t border-gray-300 my-8" />
          <section id="reviews" className="w-full my-8">
            <h2 className="text-2xl font-semibold mb-2">Customer Reviews</h2>
            {/* <h1 className="font-medium mb-2">Very Good</h1> */}
            <div className="flex items-center justify-between space-x-4 my-2">
              <div className="w-45 h-45 rounded-full border-4 borderprimary flex flex-col items-center justify-center text-red-500">
                <span className="text-5xl font-semibold">5.0</span>
                <span className="text">Out of 5.0</span>
              </div>
              <div className="grid grid-cols-2 gap-4 flex-2">
                <div className="flex w-full justify-between border-b-2 border-gray-300 pb-2">
                  <div>
                    <h1 className="font-medium">Exterior</h1>
                    <p className="text-gray-500">Perfect</p>
                  </div>

                  <div className="flex items-center ">
                    <Star className="fill-primary stroke-0 size-4" />
                    <span className="text-gray-500">5.0</span>
                  </div>
                </div>

                <div className="flex w-full justify-between border-b-2 border-gray-300 pb-2">
                  <div>
                    <h1 className="font-medium">Interior</h1>
                    <p className="text-gray-500">Perfect</p>
                  </div>

                  <div className="flex items-center ">
                    <Star className="fill-primary stroke-0 size-4" />
                    <span className="text-gray-500">5.0</span>
                  </div>
                </div>
                <div className="flex w-full justify-between border-b-2 border-gray-300 pb-2">
                  <div>
                    <h1 className="font-medium">Comfort</h1>
                    <p className="text-gray-500">Perfect</p>
                  </div>

                  <div className="flex items-center ">
                    <Star className="fill-primary stroke-0 size-4" />
                    <span className="text-gray-500">5.0</span>
                  </div>
                </div>
                <div className="flex w-full justify-between border-b-2 border-gray-300 pb-2">
                  <div>
                    <h1 className="font-medium">Performance</h1>
                    <p className="text-gray-500">Perfect</p>
                  </div>

                  <div className="flex items-center ">
                    <Star className="fill-primary stroke-0 size-4" />
                    <span className="text-gray-500">5.0</span>
                  </div>
                </div>
              </div>
            </div>
            <p>
              Based on <b>100 reviews</b>
            </p>
            <div className="flex flex-col space-y-6 mt-4">
              <div>
                <div className="flex max-w-md justify-between items-center">
                  <h1 className="font-medium text-lg">Name Surname</h1>
                  <p>Date</p>
                </div>
                <div className="flex space-x-2 my-1">
                  <Star className="fill-primary stroke-0 size-4" />
                  <Star className="fill-primary stroke-0 size-4" />
                  <Star className="fill-primary stroke-0 size-4" />
                  <Star className="fill-primary stroke-0 size-4" />
                  <Star className="fill-primary stroke-0 size-4" />
                </div>
                <p className=" text-sm max-w-lg">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Exercitationem libero tempora autem totam incidunt cupiditate
                  consequatur? Ratione excepturi doloribus ipsum quo eaque.
                  Cumque asperiores quas perspiciatis quisquam possimus officiis
                  et.
                </p>
              </div>
              <div>
                <div className="flex w-full max-w-md justify-between items-center">
                  <h1 className="font-medium text-lg">Name Surname</h1>
                  <p>Date</p>
                </div>
                <div className="flex space-x-2 my-1">
                  <Star className="fill-primary stroke-0 size-4" />
                  <Star className="fill-primary stroke-0 size-4" />
                  <Star className="fill-primary stroke-0 size-4" />
                  <Star className="fill-primary stroke-0 size-4" />
                  <Star className="fill-primary stroke-0 size-4" />
                </div>
                <p className=" text-sm max-w-lg">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Exercitationem libero tempora autem totam incidunt cupiditate
                  consequatur? Ratione excepturi doloribus ipsum quo eaque.
                  Cumque asperiores quas perspiciatis quisquam possimus officiis
                  et.
                </p>
              </div>
            </div>
            <hr className="border-t border-gray-300 my-8" />
            <h1 className="font-semibold text-xl mt-6 mb-4">Leave a Review</h1>
            <div className="grid grid-cols-2 gap-2 flex-2">
              <div className="flex flex-col gap-1">
                <span className="font-medium">Exterior</span>
                <div className="flex w-full justify-start">
                  <Star className="fill-primary stroke-0 size-4" />
                  <Star className="fill-primary stroke-0 size-4" />
                  <Star className="fill-primary stroke-0 size-4" />
                  <Star className="fill-primary stroke-0 size-4" />
                  <Star className="fill-primary stroke-0 size-4" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-medium">Interior</span>
                <div className="flex w-full justify-start">
                  <Star className="fill-primary stroke-0 size-4" />
                  <Star className="fill-primary stroke-0 size-4" />
                  <Star className="fill-primary stroke-0 size-4" />
                  <Star className="fill-primary stroke-0 size-4" />
                  <Star className="fill-primary stroke-0 size-4" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-medium">Comfort</span>
                <div className="flex w-full justify-start">
                  <Star className="fill-primary stroke-0 size-4" />
                  <Star className="fill-primary stroke-0 size-4" />
                  <Star className="fill-primary stroke-0 size-4" />
                  <Star className="fill-primary stroke-0 size-4" />
                  <Star className="fill-primary stroke-0 size-4" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-medium">Performance</span>
                <div className="flex w-full justify-start">
                  <Star className="fill-primary stroke-0 size-4" />
                  <Star className="fill-primary stroke-0 size-4" />
                  <Star className="fill-primary stroke-0 size-4" />
                  <Star className="fill-primary stroke-0 size-4" />
                  <Star className="fill-primary stroke-0 size-4" />
                </div>
              </div>
            </div>
            <form action="" className="space-y-4 mt-6">
              <div className="relative">
                <input
                  type="number"
                  name="Name"
                  value={calcFormData.price}
                  onChange={handleCalcChange}
                  className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className={`absolute left-3 transition-all duration-300 text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary ${
                    calcFormData.price && 'top-2 text-xs text-primary'
                  }`}
                >
                  Name
                </label>
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={calcFormData.years}
                  onChange={handleCalcChange}
                  className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className={`absolute left-3 transition-all duration-300 text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary ${
                    calcFormData.years && 'top-2 text-xs text-primary'
                  }`}
                >
                  Email
                </label>
              </div>
              <div className="relative">
                <textarea
                  name="message"
                  value={calcFormData.message}
                  onChange={handleCalcChange}
                  className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                />

                <label
                  htmlFor="message"
                  className={`absolute left-3 transition-all duration-300 text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary ${
                    calcFormData.message && 'top-2 text-xs text-primary'
                  }`}
                >
                  Message
                </label>
              </div>
              <button
                type="button"
                className="btn w-full max-w-70 mt-2 text-white btn-primary btn-lg text-lg rounded-xl font-semibold"
              >
                Submit
              </button>
            </form>
          </section>
          <section id="related-cars" className="w-full my-8">
            <h1 className="text-2xl font-bold">Related Cars</h1>
            <div className="flex overflow-x-auto w-full space-x-2 pl-1">
              <CarCard
                className="flex-shrink-0"
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
              <CarCard
                className="flex-shrink-0"
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
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
