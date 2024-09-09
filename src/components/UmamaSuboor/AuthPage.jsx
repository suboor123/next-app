import React, { useState } from 'react';

const AuthPage = () => {
    const [password, setPassword] = useState(''); // State to hold the password

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page refresh on form submit
        if (password.toLowerCase().trim() === 'umamasuboor') {
            localStorage.setItem('ps', 'true');
            window.location.reload();
        }
        // You can add further logic here, such as sending the password to an API
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
            <div className="bg-white mx-5 bg-opacity-20 backdrop-filter backdrop-blur-lg p-10 rounded-xl shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold text-white text-center mb-8">Password Required</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm text-white">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password} // Bind input value to state
                            onChange={(e) => setPassword(e.target.value)} // Update state on input change
                            className="w-full p-3 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:border-purple-500 text-white"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="w-full p-3 bg-pink-600 hover:bg-purple-700 text-white font-bold rounded-md focus:outline-none focus:bg-purple-700 transition-all duration-300">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthPage;
