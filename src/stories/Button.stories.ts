import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import PetsButton, { PetsButtonProps } from "../ui/button/PetsButton";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Button",
  component: PetsButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof PetsButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Submit: Story = {
  args: {
    text: "Submit",
    role: "submit",
  },
};

export const Back: Story = {
  args: {
    text: "Back",
    role: "back",
  },
};

export const Save: Story = {
  args: {
    text: "Save",
    role: "save",
  },
};

export const Cancel: Story = {
  args: {
    text: "Cancel",
    role: "cancel",
  },
};
