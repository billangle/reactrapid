import { it, expect, describe, beforeAll, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { store } from "../../../src/_store/store";
import Footer from "../../../src/components/footer/Footer";  
import React from "react";
import { FOOTER_CONTACT_TYPE } from "../../../src/types/enums";
import "@testing-library/jest-dom/vitest";

window.URL.createObjectURL = function () {
  // Return some default URL or a placeholder
  return "data:application/octet-stream;base64,AAECAwQFBgcICQo=";
};

describe("Footer Component", () => {
    it("renders Footer component", () => {
        render(
            <Provider store={store}>
                <Authenticator.Provider>
                    <BrowserRouter>
                        <Footer contactType={FOOTER_CONTACT_TYPE.contactRei} />
                    </BrowserRouter>
                </Authenticator.Provider>
            </Provider>
        );
           });

  
    
});
