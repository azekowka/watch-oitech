'use client';
import React from 'react';
import Button from '@/components/ui/button';
import { WatchLogo } from '@/components/watch-logo';

const WelcomePage: React.FC = () => {
  const handleLoginClick = () => {
    // Handle login logic here
    console.log('Login clicked');
  };
  const handleSignUpClick = () => {
    // Handle sign up logic here
    console.log('Sign up clicked');
  };
  return (
    <div 
      className="
        flex 
        flex-row 
        justify-center 
        items-center 
        w-full 
        min-h-screen 
        bg-[linear-gradient(12deg,#6100c2_0%,#191817_100%)]
        bg-cover
        bg-center
        bg-no-repeat
        relative
      "
      style={{
        backgroundImage: "url('/images/img_rectangle_240.png')"
      }}
    >
      {/* Main Content Container */}
      <div className="
        flex 
        flex-col 
        justify-start 
        items-center 
        w-full 
        max-w-sm 
        sm:max-w-md 
        md:max-w-lg 
        lg:max-w-xl 
        px-4 
        sm:px-6 
        md:px-8
      ">
        {/* Logo and Brand Section */}
        <div className="
          flex 
          flex-col 
          gap-2 
          sm:gap-3 
          md:gap-4 
          justify-start 
          items-center 
          w-full 
          mb-8 
          sm:mb-10 
          md:mb-12
        ">
          {/* Logo and Title Row */}
          <div className="
            flex 
            flex-row 
            gap-2 
            sm:gap-3 
            md:gap-4 
            justify-center 
            items-center 
            w-auto
          ">
            <WatchLogo 
              className="
                w-[130px]
                h-9
                self-start
              "
              width={130}
              height={36}
            />
          </div>
          {/* Subtitle */}
          <p className="
            text-sm 
            sm:text-base 
            md:text-lg 
            lg:text-xl 
            font-poppins 
            font-normal 
            leading-relaxed 
            text-center 
            text-white 
            w-auto
          ">
            Enjoy the newest movies
          </p>
        </div>
        {/* Login Button */}
        <Button
          onClick={handleLoginClick}
          variant="primary"
          size="lg"
          fullWidth
          className="
            bg-[#6100c2] 
            text-white 
            font-poppins 
            font-medium 
            text-sm 
            sm:text-base 
            md:text-lg 
            leading-6 
            rounded-xl 
            sm:rounded-2xl 
            px-6 
            sm:px-8 
            md:px-10 
            py-3 
            sm:py-4 
            md:py-5 
            mb-4 
            sm:mb-5 
            md:mb-6 
            transition-all 
            duration-200 
            hover:bg-[#7a1dd4] 
            active:bg-[#4d0099] 
            focus:ring-2 
            focus:ring-purple-500 
            focus:ring-opacity-50
          "
        >
          Log in
        </Button>
        {/* Sign Up Link */}
        <button
          onClick={handleSignUpClick}
          className="
            text-sm 
            sm:text-base 
            md:text-lg 
            font-poppins 
            font-medium 
            leading-6 
            text-center 
            text-white 
            w-auto 
            transition-all 
            duration-200 
            hover:text-[#6100c2] 
            focus:outline-none 
            focus:ring-2 
            focus:ring-white 
            focus:ring-opacity-50 
            rounded 
            px-2 
            py-1
          "
        >
          <span className="font-medium">No account? </span>
          <span className="font-bold underline">Sign up</span>
        </button>
      </div>
    </div>
  );
};
export default WelcomePage;