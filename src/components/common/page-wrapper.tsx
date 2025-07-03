import React from 'react';
import Header from '@/components/common/header';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  showHeader?: boolean;
}

// A lightweight wrapper that places the common Header at the top and renders page content underneath.
// Usage: <PageWrapper> ...page content... </PageWrapper>
export const PageWrapper: React.FC<PageWrapperProps> = ({ children, className = '', showHeader = true }) => {
  return (
    <div className={`flex flex-col w-full ${className}`.trim()}>
      {showHeader && (
        <Header className="w-full px-4 sm:px-6 lg:px-8" />
      )}
      {children}
    </div>
  );
};

export default PageWrapper; 