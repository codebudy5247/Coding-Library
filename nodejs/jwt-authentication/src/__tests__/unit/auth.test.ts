import supertest from "supertest";
import { createServer } from "../../server";
import { db } from "../../database";

describe("Auth Routes", () => {
  const server = createServer();
  const request = supertest(server);
  const avatarUrl =
    "https://lh3.googleusercontent.com/ogw/AF2bZyjFJIr2Mw4DiejAL2zjb1ZLa7FVVmy1lshG8ErCO3GPLFk=s32-c-mo";
  const defaultTestUser = {
    name: "aditya",
    email: "aditya@example.com",
    password: "password123",
  };

  let createdUserId: string | null = null;

  // beforeAll(() => {

  // });

  afterAll(async () => {
    if (createdUserId) {
      await db.user.delete({
        where: { id: createdUserId },
      });
    }
  });

  const testUserRegistration = async (
    userData: Record<string, string>,
    expectedStatusCode: number
  ) => {
    return request
      .post("/api/v1/user/register")
      .send(userData)
      .expect(expectedStatusCode);
  };

  //register tests 
  describe("User Registration POST /v1/auth/register", () => {
    it("should return 200 and successfully register a user with valid data", async () => {
      const response = await testUserRegistration(defaultTestUser, 200);

      expect(response.body).toEqual({
        id: expect.anything(),
        name: defaultTestUser.name,
        email: defaultTestUser.email,
        avatar: avatarUrl,
        role: "USER",
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });

      createdUserId = response.body.id;

      const dbUser = await db.user.findFirst({
        where: { id: response.body.id },
      });

      expect(dbUser).toBeDefined();
      expect(dbUser).toMatchObject({
        name: defaultTestUser.name,
        email: defaultTestUser.email,
        role: "USER",
        avatar: avatarUrl,
      });
    });

    it("should return 422 if email is invalid", async () => {
      const invalidUser = { ...defaultTestUser, email: "invalidEmail" };
      await testUserRegistration(invalidUser, 422);
    });

    it("should return 400 if email is already used", async () => {
      const duplicateEmailUser = { ...defaultTestUser };
      await testUserRegistration(duplicateEmailUser, 400);
    });

    it("should return 422 if password length is less than 6 characters", async () => {
      const shortPasswordUser = { ...defaultTestUser, password: "1234" };
      await testUserRegistration(shortPasswordUser, 422);
    });

    it("should return 422 if password does not contain both letters and numbers", async () => {
      const noLettersPassword = { ...defaultTestUser, password: "123456" };
      const noNumbersPassword = { ...defaultTestUser, password: "password" };

      await testUserRegistration(noLettersPassword, 422);
      await testUserRegistration(noNumbersPassword, 422);
    });
  });

  // login tests
  
});
