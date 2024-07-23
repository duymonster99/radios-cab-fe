import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Libraries
import { BrowserRouter } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import { LazyMotion, domMax } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// css
import './Assets/css/icons.css';
import './Assets/css/global.css';
import './Assets/css/pages.css';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <LazyMotion features={domMax}>
        <ParallaxProvider>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </BrowserRouter>
        </ParallaxProvider>
    </LazyMotion>,
);
