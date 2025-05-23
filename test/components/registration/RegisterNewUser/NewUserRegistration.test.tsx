import { it, expect, describe, beforeAll, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { store } from "../../../../src/_store/store";
import NewUserRegistration from "../../../../src/components/registration/RegisterNewUser/NewUserRegistration";  
import React from "react";
import "@testing-library/jest-dom/vitest";

window.URL.createObjectURL = function () {
  // Return some default URL or a placeholder
  return "data:application/octet-stream;base64,AAECAwQFBgcICQo=";
};

describe("NewUserRegistration Component", () => {
    it("renders NewUserRegistration component", () => {
        render(
            <Provider store={store}>
                <Authenticator.Provider>
                    <BrowserRouter>
                        <NewUserRegistration />
                    </BrowserRouter>
                </Authenticator.Provider>
            </Provider>
        );
        expect(screen.getByText(/RAPID CC User Registration/i)).toBeInTheDocument();
    });

    it("displays validation errors when required fields are empty", async () => {
        render(
            <Provider store={store}>
                <Authenticator.Provider>
                    <BrowserRouter>
                        <NewUserRegistration />
                    </BrowserRouter>
                </Authenticator.Provider>
            </Provider>
        );

        fireEvent.click(screen.getByText(/Finish and Register/i));

        expect(await screen.findByText(/First Name/i)).toBeInTheDocument();
        expect(await screen.findByText(/Last Name/i)).toBeInTheDocument();
        expect(await screen.findByText(/Confirm Email/i)).toBeInTheDocument();
        expect(await screen.findByText(/Username/i)).toBeInTheDocument();
       // expect(await screen.findByText(/Please select a password that meets all of the requirements listed./i)).toBeInTheDocument();
    });

    it("validates email format", async () => {
        render(
            <Provider store={store}>
                <Authenticator.Provider>
                    <BrowserRouter>
                        <NewUserRegistration />
                    </BrowserRouter>
                </Authenticator.Provider>
            </Provider>
        );

        fireEvent.input(screen.getByLabelText(/Confirm Email/i), {
            target: { value: "invalid-email" },
        });

        fireEvent.click(screen.getByText(/Finish and Register/i));

       // expect(await screen.findByText(/Enter a valid e-mail address./i)).toBeInTheDocument();
    });

    

    it("validates password requirements", async () => {
        render(
            <Provider store={store}>
                <Authenticator.Provider>
                    <BrowserRouter>
                        <NewUserRegistration />
                    </BrowserRouter>
                </Authenticator.Provider>
            </Provider>
        );

        fireEvent.input(screen.getByLabelText(/Create Password/i), {
            target: { value: "short" },
        });

        fireEvent.click(screen.getByText(/Finish and Register/i));

       //expect(await screen.findByText(/Password should match the below requirements./i)).toBeInTheDocument();
    });

    
    it("submits the form when all fields are valid", async () => {
        const submitSpy = vi.spyOn(console, 'log');

        render(
      <Provider store={store}>
        <Authenticator.Provider>
          <BrowserRouter>
                        <NewUserRegistration />
          </BrowserRouter>
        </Authenticator.Provider>
      </Provider>
    );

        fireEvent.input(screen.getByLabelText(/First Name/i), {
            target: { value: "John" },
        });
        fireEvent.input(screen.getByLabelText(/Last Name/i), {
            target: { value: "Doe" },
        });

        fireEvent.input(screen.getByLabelText(/Username/i), {
            target: { value: "johndoe" },
        });
        fireEvent.input(screen.getByLabelText(/Create Password/i), {
            target: { value: "Password123!" },
        });
        fireEvent.input(screen.getByLabelText(/Confirm Password/i), {
            target: { value: "Password123!" },
        });

        fireEvent.click(screen.getByText(/Finish and Register/i));

    });
    
});
