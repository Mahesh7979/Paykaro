import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import PaymentDone from './PaymentDone';
import toast, { Toaster } from 'react-hot-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function Transfer() {
    const [amount, setAmount] = useState(0);
    const [searchParams] = useSearchParams();
    const toid = searchParams.get('userId');
    const name = searchParams.get('name');
    const navigate = useNavigate();
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const schema = z.object({
        amount: z.string()
            .min(1, { message: "Amount required" })
            .max(4, { message: "Transactions >= 10000 are not supported" })
            .refine(value => /^[0-9]+$/.test(value), { message: "Enter digits only" }),
    });

    const {
        register, handleSubmit, formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async () => {
        if (!toid || !localStorage.getItem('token')) {
            toast.error("Invalid user ID or token missing");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/v1/account/transfer', {
                amount,
                to: toid
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            });

            if (response.data.msg === 'Transfer successful') {
                setTimeout(()=>{
                    toast.success(response.data.msg, { duration: 1000 });
                },10);
                setPaymentSuccess(true);
            } else {
                toast.error(response.data.msg, { duration: 3000 });
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message+" occurred during the transfer", { duration: 3000 });
        }
    };

    return (
        !paymentSuccess ? (
            <div className='w-full h-screen bg-offblck flex justify-center'>
                <div className='w-1/3 flex flex-col justify-center'>
                    <div className='flex justify-center items-center m-3'>
                    <a><div className='bg-blu pt-1 h-10 w-10 rounded-full  text-center text-white text-2xl font-poppins font-bold cursor-pointer ' onClick={()=>{
            navigate('/settings')
          }}>{name ? name[0].toUpperCase() : "U"}</div></a>
                        
                        <div className="text-white font-poppins font-bold text-4xl ml-4">{name}</div>
                    </div>
                    <form className="bg-offblck text-gray-50" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col m-1">
                            <div className="relative m-1">
                                <input
                                    type="text"
                                    id="amount"
                                    placeholder="Amount"
                                    className="h-10 sm:h-11 px-2.5 pb-2.5 pt-4 w-full text-md text-white bg-transparent rounded-lg border-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    {...register("amount")}
                                    onChange={(e) => setAmount(parseInt(e.target.value))}
                                />
                                <label
                                    htmlFor="amount"
                                    className="absolute text-md md:text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-offblck px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                                >
                                </label>
                            </div>
                            <div className="ml-1">
                                {errors.amount && (
                                    <span className="text-xs text-rose-500">{errors.amount?.message}</span>
                                )}
                            </div>
                        </div>
                        <div className='m-3'></div>
                        <div className="flex justify-center">
                            <button
                                type='submit'
                                className="text-white bg-700 m-4 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-9 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                                <Toaster />Send
                            </button>
                        </div>
                        <div className='flex justify-center'>
                            <button
                                className="text-white bg-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-4 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                onClick={() => {
                                    navigate('/pay');
                                }}
                            >
                                Go Back
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        ) : (
            <PaymentDone />
        )
    );
}






