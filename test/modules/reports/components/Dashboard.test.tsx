import { it, expect, describe, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { store } from "../../../../src/_store/store";
import Dashboard from "../../../../src/modules/reports/components/dashboard/Dashboard";
import React from "react";
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

  });
  
    
});
