'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WatchLogo } from '@/components/watch-logo';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  // Local state only for links that don't navigate (href === '#')
  const [manualActiveItem, setManualActiveItem] = useState<string | null>(null);

  const pathname = usePathname();

  const menuItems = [
    { name: 'Home', icon: '/images/img_film.svg', href: '/home' },
    { name: 'Favourites', icon: '/images/img_heart.svg', href: '/favourites' },
    { name: 'Trending', icon: '/images/img_trending_up.svg', href: '/trending' },
    { name: 'Coming soon', icon: '/images/img_calendar.svg', href: '/404' },
  ];

  const communityItems = [
    { name: 'Community', icon: '/images/img_users.svg', href: '/404' },
    { name: 'Social', icon: '/images/img_vector.svg', href: '/404' },
  ];

  const settingsItems = [
    { name: 'Settings', icon: '/images/img_sliders.svg', href: '/404' },
    { name: 'Logout', icon: '/images/img_log_out.svg', href: '/404' },
  ];

  const handleMenuClick = (item: { name: string; href: string }) => {
    if (item.href === '#') {
      setManualActiveItem(item.name);
    }
  };

  const isItemActive = (item: { name: string; href: string }) => {
    if (item.href !== '#') {
      // Highlight based on the current route
      return pathname.startsWith(item.href);
    }
    // For placeholder links without navigation, rely on manual state
    return manualActiveItem === item.name;
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
                onClick={() => handleMenuClick(item)}
                className={`
                  flex 
                  items-center 
                  w-full 
                  px-4 
                  py-3 
                  transition-all 
                  duration-200 
                  hover:bg-white/10 
                  ${isItemActive(item) ? 'bg-white/10' : ''}
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
                onClick={() => handleMenuClick(item)}
                className={`
                  flex 
                  items-center 
                  w-full 
                  px-4 
                  py-3 
                  transition-all 
                  duration-200 
                  hover:bg-white/10 
                  ${isItemActive(item) ? 'bg-white/10' : ''}
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
              onClick={() => handleMenuClick(item)}
              className={`
                flex 
                items-center 
                w-full 
                px-4 
                py-3 
                transition-all 
                duration-200 
                hover:bg-white/10 
                ${isItemActive(item) ? 'bg-white/10' : ''}
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