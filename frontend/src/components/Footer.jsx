// import React, { useState } from 'react';

const Footer = () => {

return (
    <footer className="bg-secondary text-white py-8 px-4 font-[poppins] flex flex-col justify-center items-center w-full mt-auto">
        <div className="mb-4 md:flex w-full max-w-6xl items-center">
            <div className="w-full md:w-1/2">
                <h3 className="text-xl md:text-2xl font-semibold">Join</h3>
            <h3 className="text-2xl md:text-4xl font-semibold mb-1 font-['Microgramma_D_Extended'] text-primary">
                Company Name
            </h3>
            <p className="mb-3 text-gray-300 text-xs md:text-sm">
                Receive Price Updates, Blog notifications & more.
            </p>  
            </div>
            
            <form
            //   onSubmit={handleSubmit}
                className="w-full md:w-[50vw] inline-flex gap-2 flex-wrap justify-center"
            >
                <div className=" items-center justify-between p-1 flex w-full rounded-full bg-white/30 h-15 z-50 relative">
                    {/* <div className="relative text-white items-center flex h-full px-4 border-r-2 border-r-white/70 cursor-pointer text-sm transition-all duration-300"></div> */}
                    <div className="h-full items-center flex w-full">
                        <input
                            type="text"
                            placeholder="email"
                            className="input w-full border-none bg-transparent text-white placeholder:text-white shadow-none"
                        />
                    </div>
                    <div className="h-full flex justify-end">
                        <button className="btn px-6 btn-primary rounded-full h-full font-normal">
                            Join
                        </button>
                    </div>
                </div>
            </form>

        </div>
        <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Car Dealership. All rights reserved.
        </div>
    </footer>
);
};

export default Footer;
