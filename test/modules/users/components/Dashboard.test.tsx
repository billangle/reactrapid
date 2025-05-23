import { it, expect, describe, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { store } from "../../../../src/_store/store";
import Dashboard from "../../../../src/modules/users/components/dashboard/Dashboard";
import React from "react";
import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

window.URL.createObjectURL = function () {
  // Return some default URL or a placeholder
  return "data:application/octet-stream;base64,AAECAwQFBgcICQo=";
};

describe("Dashboard Component", () => {
  it("renders Dashboard component", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Authenticator.Provider>
          <BrowserRouter>
            <Dashboard />
          </BrowserRouter>
        </Authenticator.Provider>
      </Provider>
    );

    expect(getByText("Reset Password")).toBeInTheDocument();
  });
  
    it('displays user details correctly', () => {
        const { getByText } = render(
            <Provider store={store}>
                <Authenticator.Provider>
                    <BrowserRouter>
                        <Dashboard />
                    </BrowserRouter>
                </Authenticator.Provider>
            </Provider>
        );
        expect(getByText('Username:')).toBeInTheDocument();
        expect(getByText('User Email:')).toBeInTheDocument();
        expect(getByText('Name:')).toBeInTheDocument();
        expect(getByText('Phone:')).toBeInTheDocument();
        expect(getByText('Street1:')).toBeInTheDocument();
        expect(getByText('Street2:')).toBeInTheDocument();
        expect(getByText('City:')).toBeInTheDocument();
        expect(getByText('State:')).toBeInTheDocument();
        expect(getByText('Zip:')).toBeInTheDocument();
        expect(getByText('Apt:')).toBeInTheDocument();
        expect(getByText('Confirm Email:')).toBeInTheDocument();
        expect(getByText('Middle Name:')).toBeInTheDocument();
        expect(getByText('Prefix:')).toBeInTheDocument();
        expect(getByText('Suffix:')).toBeInTheDocument();
        expect(getByText('Challenge Question:')).toBeInTheDocument();
        expect(getByText('Challenge Answer:')).toBeInTheDocument();
        expect(getByText('Admin:')).toBeInTheDocument();
    });
    it('renders PasswordReset component', () => {
        const { getByText } = render(
            <Provider store={store}>
                <Authenticator.Provider>
                    <BrowserRouter>
                        <Dashboard />
                    </BrowserRouter>
                </Authenticator.Provider>
            </Provider>
        );
        expect(getByText('Reset Password')).toBeInTheDocument();
    });
    
});
