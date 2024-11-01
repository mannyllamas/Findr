'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';

interface FormData {
    email: string;
    password: string;
}

const SignInForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
            const response = await axios.post('https://bsrwoinpyj.execute-api.us-east-2.amazonaws.com/dev/Findr-UserData/Findr-User-Auth', data);
            const responseBody = JSON.parse(response.data.body);

            // Check the message that is returned inside the response body
            if (responseBody.message === 'Login successful') {
                alert('Login successful!');
            } else if (responseBody.statusCode === 'Unauthorized') {
                alert('Invalid credentials');
            } else if (responseBody.message === 'User not found') {
                alert("User not found. Try Again.");
            } else {
                alert('Login failed'); // Catch other statuses as general failures
            }

            console.log(response.data); // Log the full response data
        } catch (error) {
            const axiosError = error as AxiosError;  // Type assertion here
            if (axiosError.response) {
                console.error('Response body:', axiosError.response.data);
                alert('Login failed - network issue or server error');
            } else {
                console.error('Error:', axiosError.message);
                alert('An unexpected network error occurred');
            }
        }
    };
    return (
        <>
            <div className="flex flex-col min-h-screen bg-gray-100">
                <div>
                    <Link href="/" passHref>
                        <h4 className="text-blue-500 jura text-4xl cursor-pointer m-4 ml-4">Fr</h4>
                    </Link>
                    <hr className="border-t-2 border-blue-900 my-0" />
                </div>
                <div className="flex grow items-center justify-center">
                    <div className="p-5 space-y-8 rounded-lg shadow-2xl bg-white">
                        <h1 className="text-3xl font-bold text-center text-gray-900 mb-10">Intern Sign In</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700"></label>
                                <input
                                    id="email"
                                    {...register("email", { required: "Email is required" })}
                                    placeholder="Email"
                                    type="email"
                                    className="block w-80 px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-50"
                                />
                                {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700"></label>
                                <input
                                    id="password"
                                    {...register("password", { required: "Password is required" })}
                                    placeholder="Password"
                                    type="password"
                                    className="block w-80 px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-50"
                                />
                                {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
                            </div>
                            <div className="text-center">
                                <Link href="/UserSignUp" passHref className="text-blue-500 hover:text-blue-800 inline-block mx-auto">
                                    Sign Up
                                </Link>
                            </div>
                            <button type="submit" className="w-full px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignInForm;