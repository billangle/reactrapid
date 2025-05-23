import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";

import { EmploymentHistoryPage } from "./EmploymentHistoryPage";

const meta = {
  title: "Example/EmploymentHistory",
  component: EmploymentHistoryPage,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof EmploymentHistoryPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const LoggedOut: Story = {};

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const EmptyForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const companyNameInput = canvas.getByText("Company name");
    await userEvent.type(companyNameInput, "Test company name");

    const jobTitleInput = canvas.getByText("Job title");
    await userEvent.type(jobTitleInput, "Test job title");

    const salaryInput = canvas.getByText("Salary");
    await userEvent.type(salaryInput, "100");

    const socialSecurityNumberInput = canvas.getByText(
      "Social security number"
    );
    await userEvent.type(socialSecurityNumberInput, "123456789");

    const addressInput = canvas.getByText("Employer street address");
    await userEvent.type(addressInput, "Test street address");

    const aptSuitInput = canvas.getByText("Apt/Suite");
    await userEvent.type(aptSuitInput, "Test apt/suite");

    const cityInput = canvas.getByText("City");
    await userEvent.type(cityInput, "Test City");

    const stateInput = canvas.getByText("State");
    await userEvent.type(stateInput, "Test State");

    const zipInput = canvas.getByText("Zip");
    await userEvent.type(zipInput, "12345");

    const submitFormButton = canvas.getByText("Submit");
    await expect(submitFormButton).toBeInTheDocument();

    const resetForm = canvas.getByText("Reset form");
    await expect(resetForm).toBeInTheDocument();
    await userEvent.click(resetForm);
  },
};
