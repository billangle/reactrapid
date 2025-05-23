import { it, expect, describe, beforeAll, vi } from "vitest";
//import { it, expect, describe, beforeAll, vi } from "vitest";
import App from '../src/App';
import React from "react";
import { Provider } from 'react-redux';
import { store } from '../src/_store/store';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
    it('renders App component', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                <App />
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByText(/RAPID CC Login/i)).toBeInTheDocument();
    });

    it('dispatches appInitialized action on mount', () => {
        const dispatchSpy = vi.spyOn(store, 'dispatch');
        render(
            <Provider store={store}>
                <BrowserRouter>
                <App />
                </BrowserRouter>
            </Provider>
        );
        expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({ type: 'app/appInitialized' }));
    });

    it('renders ToastContainer component', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                <App />
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByTestId("govBanner")).toBeInTheDocument(); 
    });

    it('renders AppRoutes component', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByTestId("govBanner")).toBeInTheDocument(); 
    });
});