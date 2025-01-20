import React, { useState } from 'react';
import { Menu, X, Moon } from 'lucide-react';
import logo from "../assets/tasklist.png"
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-black px-4 py-3">
            <div className=" mx-auto">
                <div className="flex items-center justify-between">
                    {/* Logo and Company Name */}
                    <div className="flex items-center space-x-4">
                        <img className='h-8 w-8 ' src={logo} alt='logo' />
                        <span className="text-white font-semibold text-xl">supertasks.io</span>
                        <span className="text-teal-200 text-sm bg-[#0F2E32] hidden sm:flex p-2 rounded-lg">Quick decision making tool</span>
                        <span className="bg-white  text-xs p-2 rounded hidden sm:flex">BETA</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <Moon className="text-white w-5 h-5" />
                        <a href="/" className="text-white hover:text-gray-300">Workspaces</a>
                        <a href="/" className="text-white hover:text-gray-300">About</a>
                        <a href="/" className="text-white hover:text-gray-300">Pricing</a>
                        <a href="/" className="text-white hover:text-gray-300">Feedback</a>
                        <button className=" text-white hover:text-gray-300 ">
                            Login
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white hover:text-gray-300"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="lg:hidden mt-4 pb-4">
                        <div className="flex flex-col space-y-4">
                            <a href="/" className="text-white hover:text-gray-300">Workspaces</a>
                            <a href="/" className="text-white hover:text-gray-300">About</a>
                            <a href="/" className="text-white hover:text-gray-300">Pricing</a>
                            <a href="/" className="text-white hover:text-gray-300">Feedback</a>
                            <button className=" text-white px-4 py-1.5 rounded hover:bg-gray-100 w-full">
                                Login
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;