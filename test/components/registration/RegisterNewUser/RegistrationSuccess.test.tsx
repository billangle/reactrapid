import { it, expect, describe, beforeAll, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { store } from "../../../../src/_store/store";
import RegistrationSuccess from "../../../../src/components/registration/RegisterNewUser/RegistrationSuccess";  
import React from "react";
import "@testing-library/jest-dom/vitest";

window.URL.createObjectURL = function () {
  // Return some default URL or a placeholder
  return "data:application/octet-stream;base64,AAECAwQFBgcICQo=";
};

describe("Registration Success Component", () => {
    it("renders Registration Success component", () => {
        render(
            <Provider store={store}>
                <Authenticator.Provider>
                    <BrowserRouter>
                        <RegistrationSuccess />
                    </BrowserRouter>
                </Authenticator.Provider>
            </Provider>
        );
        expect(screen.getByText(/Congratulations! Registration was successful/i)).toBeInTheDocument();
    });

  
    
});
