import React from 'react';

interface PageWrapperProps {
    children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            {children}
        </div>
    );
};

export default PageWrapper;