"use client"
import { PayPalButtons } from '@paypal/react-paypal-js'
import { useMutation } from 'convex/react'
import React from 'react'
import { api } from '../../../convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'

export default function UpgradePlans(props) {
    const userUpgradePlan = useMutation(api.user.userUpgradePlan)
    const {user} = useUser();
    const onPaymentSuccess = async () => {
        const result = await userUpgradePlan({userEmail:user?.primaryEmailAddress?.emailAddress})
        console.log(result);
        toast('Plan upgraded successfully!!');
    }

    return (
        <div>
            <h2 className='font-medium text-3xl'>Plans</h2>
            <p>Upgrade your plan to upload mulitple PDFs.</p>

            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Free Plan */}
                    <div className="rounded-2xl border border-gray-200 p-6 text-center shadow-md">
                    <h2 className="text-xl font-semibold text-gray-900">Free</h2>
                    <p className="mt-2 text-5xl font-bold text-gray-900">0$ <span className="text-base font-normal text-gray-500">/month</span></p>

                    <ul className="mt-6 space-y-3 text-gray-700 text-sm text-left">
                        <li className="flex items-center gap-2">✔ 5 PDF Upload</li>
                        <li className="flex items-center gap-2">✔ Unlimited Notes Taking</li>
                        <li className="flex items-center gap-2">✔ Email support</li>
                        <li className="flex items-center gap-2">✔ Help center access</li>
                    </ul>

                    <button className="mt-8 w-full rounded-full border border-indigo-600 px-6 py-2 text-indigo-600 font-medium hover:bg-indigo-50">
                        Current Plan
                    </button>
                    </div>

                    {/* Unlimited Plan */}
                    <div className="rounded-2xl border border-gray-200 p-6 text-center shadow-md">
                    <h2 className="text-xl font-semibold text-gray-900">Unlimited</h2>
                    <p className="mt-2 text-5xl font-bold text-gray-900">1.99$ <span className="text-base font-normal text-gray-500">/One Time</span></p>

                    <ul className="mt-6 space-y-3 text-gray-700 text-sm text-left">
                        <li className="flex items-center gap-2">✔ Unlimited PDF Upload</li>
                        <li className="flex items-center gap-2">✔ Unlimited Notes Taking</li>
                        <li className="flex items-center gap-2">✔ Email support</li>
                        <li className="flex items-center gap-2">✔ Help center access</li>
                    </ul>

                    {/* <button className="mt-8 w-full rounded-full border border-indigo-600 bg-indigo-600 px-6 py-2 text-white font-medium hover:bg-indigo-700">
                        Get Started
                    </button> */}
                    <div className='mt-5'>
                        <PayPalButtons 
                        onApprove={() => onPaymentSuccess()}
                        onCancel={() => console.log("Payment Cancel")}
                        createOrder={(data, actions) => {
                            return actions?.order?.create({
                                purchase_units:[
                                    {
                                        amount:{
                                            value:1.99,
                                            currency_code:'USD'
                                        }
                                    }
                                ]
                            })
                        }}
                        />
                    </div>
                    
                    </div>

                </div>
            </div>

        </div>
    )
}
