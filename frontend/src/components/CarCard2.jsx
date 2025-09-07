import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const CarCard2 = ({
  image,
  title,
  description,
  mileage,
  transmission,
  fuel,
  year,
  price,
  link = '#',
}) => {
  return (
    <div className="card rounded-2xl bg-base-100 min-w-60 shadow-lg my-4">
      <figure>
        <img src={image} alt={title} className="w-full h-60 md:h-45 object-cover" />
      </figure>
      <div className="px-5 py-4">
        <h2 className="card-title">{title}</h2>
        <p className='text-sm truncate'>{description}</p>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 my-4 text-sm">
          <div className="flex items-center">
            <img src={mileage.icon} alt="Mileage" className="mr-2 size-5" />
            <span>{mileage.value}</span>
          </div>
          <div className="flex items-center">
            <img
              src={transmission.icon}
              alt="Transmission"
              className="mr-2 size-5"
            />
            <span className='capitalize'>{transmission.value}</span>
          </div>
          <div className="flex items-center">
            <img src={fuel.icon} alt="Fuel" className="mr-2 size-5" />
            <span className='capitalize'>{fuel.value}</span>
          </div>
          <div className="flex items-center">
            <img src={year.icon} alt="Year" className="mr-2 size-5" />
            <span>{year.value}</span>
          </div>
        </div>

        <hr className="border-t border-gray-300 my-2" />

        {/* Price + Link */}
        <div className="flex justify-between items-center">
          <h1 className="font-semibold">{price}</h1>
          <div className="flex items-center">
            <Link to={link} className="text-primary text-xs">
              View Details
            </Link>
            <ArrowUpRight className="stroke-primary size-5 ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard2;
