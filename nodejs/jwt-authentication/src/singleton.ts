import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

// Create a mocked instance of PrismaClient
jest.mock("../src/database", () => ({
  __esModule: true,
  db: mockDeep<PrismaClient>(), // Export the mocked PrismaClient
}));

// Import the mocked `db` instance
import { db } from "../src/database";

// Ensure `db` is treated as a mock and reset it before each test
export const prismaMock = db as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
  mockReset(prismaMock); // Reset the mock to its initial state before each test
});
