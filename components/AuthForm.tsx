"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions'

const formSchema = (type : string) => z.object({
      email: z.string().email(),
      password: z.string().min(8),
      firstName: type === 'Sign-in' ? z.string().optional() :  z.string().min(2),
      lastName :  type === 'Sign-in' ? z.string().optional() : z.string().min(2),
      address: type === 'Sign-in' ? z.string().optional() :  z.string().max(50),
      state: type === 'Sign-in' ? z.string().optional() :  z.string().min(2),
      city: type === 'Sign-in' ? z.string().optional() :  z.string().min(2),
      postalCode: type === 'Sign-in' ? z.string().optional() :  z.string().min(2),
      dob: type === 'Sign-in' ? z.string().optional() :  z.string().min(2),
      mobileNumber: type === 'Sign-in' ? z.string().optional() :  z.string().min(10).max(10),
  })

const AuthForm = ({type}:{type:string}) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    

    const fSchema = formSchema(type);
    // 1. Define your form.
  const form = useForm<z.infer<typeof fSchema>>({
    resolver: zodResolver(fSchema),
    defaultValues: {
      email: "",
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit = async(data: z.infer<typeof fSchema>) => {
    setIsLoading(true)


    try {
      // will generate a token for this func
      if(type === 'sign-up'){
        const newUser = await signUp(data);

        setUser(newUser);
      }
      console.log("login");
      if(type === 'sign-in'){
        const response = await signIn({
          email: data.email,
          password: data.password,
        })
          console.log(response);
        if(response) router.push('/')
      }

    } catch (error) {
      console.log(error);
    }
    finally{
      setIsLoading(false);
    }
  }
  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
        <Link href="/" className='cursor-pointer 
        flex items-center gap-2 mb-3'>
                <Image
                    src="/icons/logo.svg"
                    width={34}
                    height={34}
                    alt='Aritrozz Logo'
                    className='size-[29px] max-xl:size-14'
                />
                <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Aritrozz</h1>
            </Link>
            <div className='flex flex-col gap-1 md:gap-3'>
                <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                    {user
                        ? 'Link Account'
                        : type==='sign-in'
                            ? 'Sign In'
                            : 'Sign Up'
                    }
                    <p className='text-16 font-normal text-gray-800'>
                        {user
                        ? 'Link your Account to get started'
                        : 'Please enter your details'
                        }
                    </p>
                </h1>
            </div>
        </header>
        {user ? (
            <div className='flex flex-col gap-4'>
                {/* implement plaidlink component to link out bank account */}
            </div>
        ):(
            <>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    {type === 'sign-up' && (
                      <>
                        <div className='flex flex-row gap-2'> 
                          <FormField
                              control={form.control}
                              name="firstName"
                              render={({ field }) => (
                                <div className='form-item'>
                                  <FormLabel className='form-label'>
                                    First Name
                                  </FormLabel>
                                  <div className='flex w-full flex-col'>
                                      <FormControl>
                                        <Input 
                                          placeholder='Enter your First Name'
                                          className='text-gray-600 input-class'
                                          type='text'
                                          {...field}
                                          />
                                      </FormControl>
                                      <FormMessage 
                                        className='form-message mt-2'
                                      />
                                  </div>
                                </div>
                              )}
                            />
                          <FormField
                              control={form.control}
                              name="lastName"
                              render={({ field }) => (
                                <div className='form-item'>
                                  <FormLabel className='form-label'>
                                    Last Name
                                  </FormLabel>
                                  <div className='flex w-full flex-col'>
                                      <FormControl>
                                        <Input 
                                          placeholder='Enter your Last Name'
                                          className='text-gray-600 input-class'
                                          type='text'
                                          {...field}
                                          />
                                      </FormControl>
                                      <FormMessage 
                                        className='form-message mt-2'
                                      />
                                  </div>
                                </div>
                              )}
                            />
                        </div>
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <div className='form-item'>
                              <FormLabel className='form-label'>
                                Address
                              </FormLabel>
                              <div className='flex w-full flex-col'>
                                  <FormControl>
                                    <Input 
                                      placeholder='Enter your Specific Address'
                                      className='text-gray-600 input-class'
                                      type='text'
                                      {...field}
                                      />
                                  </FormControl>
                                  <FormMessage 
                                    className='form-message mt-2'
                                  />
                              </div>
                            </div>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <div className='form-item'>
                              <FormLabel className='form-label'>
                                City
                              </FormLabel>
                              <div className='flex w-full flex-col'>
                                  <FormControl>
                                    <Input 
                                      placeholder='Enter your City'
                                      className='text-gray-600 input-class'
                                      type='text'
                                      {...field}
                                      />
                                  </FormControl>
                                  <FormMessage 
                                    className='form-message mt-2'
                                  />
                              </div>
                            </div>
                          )}
                        />
                        <div className='flex flex-row gap-2'> 
                          <FormField
                              control={form.control}
                              name="state"
                              render={({ field }) => (
                                <div className='form-item'>
                                  <FormLabel className='form-label'>
                                    State
                                  </FormLabel>
                                  <div className='flex w-full flex-col'>
                                      <FormControl>
                                        <Input 
                                          placeholder='eg: Himachal Pradesh'
                                          className='text-gray-600 input-class'
                                          type='text'
                                          {...field}
                                          />
                                      </FormControl>
                                      <FormMessage 
                                        className='form-message mt-2'
                                      />
                                  </div>
                                </div>
                              )}
                            />
                          <FormField
                              control={form.control}
                              name="postalCode"
                              render={({ field }) => (
                                <div className='form-item'>
                                  <FormLabel className='form-label'>
                                    Postal code
                                  </FormLabel>
                                  <div className='flex w-full flex-col'>
                                      <FormControl>
                                        <Input 
                                          placeholder='eg : 700***'
                                          className='text-gray-600 input-class'
                                          type='text'
                                          {...field}
                                          />
                                      </FormControl>
                                      <FormMessage 
                                        className='form-message mt-2'
                                      />
                                  </div>
                                </div>
                              )}
                            />
                        </div>
                        <div className='flex flex-row gap-2'> 
                          <FormField
                              control={form.control}
                              name="dob"
                              render={({ field }) => (
                                <div className='form-item'>
                                  <FormLabel className='form-label'>
                                    Date of Birth
                                  </FormLabel>
                                  <div className='flex w-full flex-col'>
                                      <FormControl>
                                        <Input 
                                          placeholder='DD/MM/YYYY'
                                          className='text-gray-600 input-class'
                                          type='text'
                                          {...field}
                                          />
                                      </FormControl>
                                      <FormMessage 
                                        className='form-message mt-2'
                                      />
                                  </div>
                                </div>
                              )}
                            />
                          <FormField
                              control={form.control}
                              name="mobileNumber"
                              render={({ field }) => (
                                <div className='form-item'>
                                  <FormLabel className='form-label'>
                                    Phone Number
                                  </FormLabel>
                                  <div className='flex w-full flex-col'>
                                      <FormControl>
                                        <Input 
                                          placeholder='eg:+91 **********'
                                          className='text-gray-600 input-class'
                                          type='text'
                                          {...field}
                                          />
                                      </FormControl>
                                      <FormMessage 
                                        className='form-message mt-2'
                                      />
                                  </div>
                                </div>
                              )}
                            />
                        </div>
                      </>
                    )}

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <div className='form-item'>
                          <FormLabel className='form-label'>
                            Email
                          </FormLabel>
                          <div className='flex w-full flex-col'>
                              <FormControl>
                                <Input 
                                  placeholder='Enter your email'
                                  className='text-gray-600 input-class'
                                  type='email'
                                  {...field}
                                  />
                              </FormControl>
                              <FormMessage 
                                className='form-message mt-2'
                              />
                          </div>
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <div className='form-item'>
                          <FormLabel className='form-label'>
                            Password
                          </FormLabel>
                          <div className='flex w-full flex-col'>
                              <FormControl>
                                <Input 
                                  placeholder='Enter your password'
                                  className='text-gray-600 input-class'
                                  type='password'
                                  {...field}
                                  />
                              </FormControl>
                              <FormMessage 
                                className='form-message mt-2'
                              />
                          </div>
                        </div>
                      )}
                    />
                    <div className='flex flex-col gap-4'>
                      <Button className='form-btn' type="submit" disabled={isLoading} >
                        {isLoading ? (
                          <>
                            <Loader2 
                              size={20}
                              className='animate-spin'
                            /> &nbsp;
                              Loading...
                          </>
                        ) : type === 'sign-in' ? 'Sign In' : 'Sign Up'
                      }
                      </Button>
                    </div>
                  </form>
                </Form>

                <footer className='flex justify-center gap-1'>
                    <p className='text-normal text-gray-800'>
                      {type === 'sign-in' ? "Do't have an account?" : 'Already have an account?'}
                    </p>
                    <Link 
                      className='form-link'
                    href = {type === 'sign-in' ? "/sign-up" : "sign-in"}>
                    {type === 'sign-in' ? " Sign Up" : "Sign In"}
                    </Link>
                </footer>
            </>
        )}
    </section>
  )
}

export default AuthForm