'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WatchLogo } from '@/components/watch-logo';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const [activeMenuItem, setActiveMenuItem] = useState('Home');

  const menuItems = [
    { name: 'Home', icon: '/images/img_film.svg', href: '/home' },
    { name: 'Favourites', icon: '/images/img_heart.svg', href: '/favourites' },
    { name: 'Trending', icon: '/images/img_trending_up.svg', href: '/trending' },
    { name: 'Coming soon', icon: '/images/img_calendar.svg', href: '#' },
  ];

  const communityItems = [
    { name: 'Community', icon: '/images/img_users.svg', href: '#' },
    { name: 'Social', icon: '/images/img_vector.svg', href: '#' },
  ];

  const settingsItems = [
    { name: 'Settings', icon: '/images/img_sliders.svg', href: '#' },
    { name: 'Logout', icon: '/images/img_log_out.svg', href: '#' },
  ];

  const handleMenuClick = (menuName: string) => {
    setActiveMenuItem(menuName);
  };

  return (
    <aside 
      className={`
        bg-[#21201e] 
        shadow-[2px_0px_90px_#6100c266] 
        w-full 
        lg:w-[274px] 
        h-screen 
        flex 
        flex-col 
        pt-6 
        gap-8 
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className="ml-10">
        <WatchLogo
          width={130}
          height={36}
          className="w-[130px] h-9"
        />
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col flex-1 justify-between">
        <div>
          {/* Main Menu */}
          <div className="flex flex-col">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => handleMenuClick(item.name)}
                className={`
                  flex 
                  items-center 
                  w-full 
                  px-4 
                  py-3 
                  transition-all 
                  duration-200 
                  hover:bg-white/10 
                  ${activeMenuItem === item.name ? 'bg-white/10' : ''}
                `.trim().replace(/\s+/g, ' ')}
                role="menuitem"
              >
                <Image
                  src={item.icon}
                  alt={`${item.name} icon`}
                  width={24}
                  height={24}
                  className="w-6 h-6 ml-6"
                />
                <span className="text-base font-poppins font-normal leading-6 text-left text-[#ffffffcc] ml-3">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
          {/* Community Section */}
          <div className="flex flex-col mt-8">
            {communityItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => handleMenuClick(item.name)}
                className={`
                  flex 
                  items-center 
                  w-full 
                  px-4 
                  py-3 
                  transition-all 
                  duration-200 
                  hover:bg-white/10 
                  ${activeMenuItem === item.name ? 'bg-white/10' : ''}
                `.trim().replace(/\s+/g, ' ')}
                role="menuitem"
              >
                <Image
                  src={item.icon}
                  alt={`${item.name} icon`}
                  width={24}
                  height={24}
                  className="w-6 h-6 ml-6"
                />
                <span className="text-base font-poppins font-normal leading-6 text-left text-[#ffffffcc] ml-3">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
        {/* Settings Section - Bottom of sidebar */}
        <div className="flex flex-col mb-8">
          {settingsItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => handleMenuClick(item.name)}
              className={`
                flex 
                items-center 
                w-full 
                px-4 
                py-3 
                transition-all 
                duration-200 
                hover:bg-white/10 
                ${activeMenuItem === item.name ? 'bg-white/10' : ''}
              `.trim().replace(/\s+/g, ' ')}
              role="menuitem"
            >
              <Image
                src={item.icon}
                alt={`${item.name} icon`}
                width={24}
                height={24}
                className="w-6 h-6 ml-7"
              />
              <span className="text-base font-poppins font-normal leading-6 text-left text-[#ffffffcc] ml-3">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;