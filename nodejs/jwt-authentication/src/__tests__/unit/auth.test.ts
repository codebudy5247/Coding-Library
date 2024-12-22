import supertest from "supertest";
import { createServer } from "../../server";
import { db } from "../../database";

describe("Auth routes", () => {
  describe("POST api/v1/auth/register", () => {
    const server = createServer();
    const request = supertest(server);
    let newUser: any;
    beforeAll(async () => {
      supertest(createServer());
      newUser = {
        name: "aditya",
        email: "aditya@example.com",
        password: "password1",
      };
    });

    test("should return 201 and successfully register user if request data is ok", async () => {
      const res = await request
        .post("/api/v1/user/register")
        .send(newUser)
        .expect(200);
      expect(res.body).toEqual({
        id: expect.anything(),
        name: newUser.name,
        email: newUser.email,
        avatar:
          "https://lh3.googleusercontent.com/ogw/AF2bZyjFJIr2Mw4DiejAL2zjb1ZLa7FVVmy1lshG8ErCO3GPLFk=s32-c-mo",
        role: "USER",
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });

      const dbUser = await db.user.findFirst({
        where: {
          id: res.body.id,
        },
      });
      expect(dbUser).toBeDefined();
      expect(dbUser).toMatchObject({
        name: newUser.name,
        email: newUser.email,
        role: "USER",
        avatar:
          "https://lh3.googleusercontent.com/ogw/AF2bZyjFJIr2Mw4DiejAL2zjb1ZLa7FVVmy1lshG8ErCO3GPLFk=s32-c-mo",
      });
    });
  });
});
