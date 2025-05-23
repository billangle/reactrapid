import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import Help from "../../../src/components/help/Help";
import { MemoryRouter } from "react-router-dom";

describe("Help Component", () => {
  it("renders the help component correctly", () => {
    render(
      <MemoryRouter>
        <Help />
      </MemoryRouter>
    );
    const message = screen.getByText(
      /What are the minimum operating system and browser requirements for/i
    );
    expect(message).not.toBeNull();
  });
});
