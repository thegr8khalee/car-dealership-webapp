import { Phone } from 'lucide-react';
import React, { useState } from 'react';

const Contact = () => {
  const [isFocusedMessage, setIsFocusedMessage] = useState(false);
  const [isFocusedName, setIsFocusedName] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPhone, setIsFocusedPhone] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const showroomLatitude = 9.053328635799218; // Example Latitude (e.g., for Lagos, Nigeria)
  const showroomLongitude = 7.475317593815377; // Example Longitude (e.g., for Lagos, Nigeria)
  const googleMapsApiKey = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;
  const googleMapsEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${showroomLatitude},${showroomLongitude}&center=${showroomLatitude},${showroomLongitude}&zoom=17`;

  //   const descriptiveAddress = 'C16 Bamaiyi Road, Kaduna Nigeria.';

  return (
    <div className="font-[poppins] min-h-screen items-center justify-center">
      <section className="w-full bg-secondary pt-16 px-4 h-16 sticky top-0 z-50"></section>
      <div className="min-h-screen w-full max-w-7xl mx-auto flex items-center justify-center flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="mb-2">
              We would love to hear from you! Whether you have questions about
              our cars, need assistance, or want to provide feedback, feel free
              to reach out.
            </p>
            <p className="mb-2">
              Email:{' '}
              <a href="mailto:info@sarkinmota.com" className="text-blue-500">
                info@sarkinmota.com
              </a>
            </p>
            <p>
              Phone: <a href="tel:+234701 513 6111">+234 701 5136 111</a>
            </p>
            <p className="mb-2">Address: 3F3G+74Q, Olusegun Obasanjo Wy, beside NNPC Mega Gas Station, Central Business Dis, Abuja 900103, Federal Capital Territory.</p>
          </div>
          <div className="bg-white shadow-lg rounded-3xl h-full w-full p-4 items-center justify-center">
            <h1 className="font-[poppins] text-2xl font-bold mt-2">
              Send Us a Message
            </h1>
            <p className="text-xs font-[poppins] mt-1">
              Use this form to send us a message. We'll get back to you as soon
              as possible.
            </p>
            <form action="" className="my-2">
              <div className="relative w-full mb-4">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  onFocus={() => setIsFocusedName(true)}
                  onBlur={() => setIsFocusedName(false)}
                  className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder=" " // Floating label trick
                  required
                />
                <label
                  className={`absolute left-3 transition-all duration-300
      ${
        isFocusedName || formData.name
          ? 'text-xs top-2 text-gray-500'
          : 'text-gray-400 top-4 text-lg'
      }
    `}
                >
                  Name Surname
                </label>
                <p className="validator-hint hidden">
                  Enter a valid email address
                </p>
              </div>
              <div className="flex space-x-2 mt-2">
                <div className="relative w-full mb-4">
                  <input
                    type="text"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    onFocus={() => setIsFocusedEmail(true)}
                    onBlur={() => setIsFocusedEmail(false)}
                    className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder=" " // Floating label trick
                    required
                  />
                  <label
                    className={`absolute left-3 transition-all duration-300
      ${
        isFocusedEmail || formData.email
          ? 'text-xs top-2 text-gray-500'
          : 'text-gray-400 top-4 text-lg'
      }
    `}
                  >
                    Email Address
                  </label>
                  <p className="validator-hint hidden">
                    Enter a valid email address
                  </p>
                </div>
                <div className="relative w-full mb-4">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    onFocus={() => setIsFocusedPhone(true)}
                    onBlur={() => setIsFocusedPhone(false)}
                    className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder=" " // Floating label trick
                    required
                  />
                  <label
                    className={`absolute left-3 transition-all duration-300
      ${
        isFocusedPhone || formData.phone
          ? 'text-xs top-2 text-gray-500'
          : 'text-gray-400 top-4 text-lg'
      }
    `}
                  >
                    Phone Number
                  </label>
                  <p className="validator-hint hidden">
                    Enter a valid Phone Number
                  </p>
                </div>
              </div>
              <div className="relative w-full mb-4">
                <textarea
                  type="text"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  onFocus={() => setIsFocusedMessage(true)}
                  onBlur={() => setIsFocusedMessage(false)}
                  className="peer w-full px-3 pt-6 pb-2 text-lg font-medium border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder=" " // Floating label trick
                  required
                />
                <label
                  className={`absolute left-3 transition-all duration-300
      ${
        isFocusedMessage || formData.message
          ? 'text-xs top-2 text-gray-500'
          : 'text-gray-400 top-4 text-lg'
      }
    `}
                >
                  Your Message
                </label>
              </div>
              <button className="w-full btn mt-2 text-white btn-primary btn-lg rounded-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4">Our Location</h1>
            <p className="mb-2">
              Visit us at our dealership! We're located at 3F3G+74Q, Olusegun
              Obasanjo Wy, beside NNPC Mega Gas Station, Central Business Dis,
              Abuja 900103, Federal Capital Territory. Our friendly team is
              ready to assist you with all your car needs.
            </p>
            <h3>Opening Hours</h3>
            <ul className="list-disc list-inside">
              <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
              <li>Saturday: 10:00 AM - 4:00 PM</li>
            </ul>
          </div>
          <div className="bg-base-100 p-2 rounded-3xl shadow-xl flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold font-[poppins] mb-6">
              Find Us on the Map
            </h2>
            <div className="w-full h-80 rounded-3xl overflow-hidden border border-base-300">
              {googleMapsApiKey ? (
                <iframe
                  src={googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Our Showroom Location"
                ></iframe>
              ) : (
                <div className="flex items-center justify-center h-full text-center text-error">
                  <p>
                    Google Maps API Key is missing or unauthorized. Please check
                    your console.
                  </p>
                </div>
              )}
            </div>
            <p className="mt-4 text-sm text-gray-600 text-center">
              Click on the map for directions.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 w-full max-w-7xl">
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold font-[poppins] mb-2">
              Support
            </h2>
            <p>If you need assistance, please contact our support team.</p>
            <p>
              Email:{' '}
              <a href="mailto:support@sarkinmota.com">support@sarkinmota.com</a>
            </p>
            <p>
              Phone: <a href="tel:+234701 513 6111">+234 701 5136 111</a>
            </p>
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold font-[poppins] mb-2">
              Sales Inquiries
            </h2>
            <p>
              If you're interested in purchasing a vehicle, please contact our
              sales team.
            </p>
            <p>
              Email: <a href="mailto:sales@sarkinmota.com">sales@sarkinmota.com</a>
            </p>
            <p>
              Phone: <a href="tel:+234701 513 6111">+234 701 5136 111</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
