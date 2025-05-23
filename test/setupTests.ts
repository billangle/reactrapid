import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Mock window.URL.createObjectURL
Object.defineProperty(window.URL, "createObjectURL", {
  writable: true,
  value: vi.fn(),
});
