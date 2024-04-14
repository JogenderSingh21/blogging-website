import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { signinInput, signupInput } from "@jojosehrawat/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      error: "Inputs not correct",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      userDetails: {
        id: user.id,
        username: user.username,
        name: user.name,
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
    c.status(411);
    return c.json(error);
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();

  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      error: "Inputs not correct",
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "user not found" });
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      userDetails: {
        id: user.id,
        username: user.username,
        name: user.name,
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
    c.status(411);
    return c.json(error);
  }
});

userRouter.get("/me", async (c) => {
  try {
    const header = c.req.header("authorization") || "";

    const token = header.split(" ")[1];

    const { id } = await verify(token, c.env.JWT_SECRET);
    if (id) {
      return c.json({ id });
    } else {
      c.status(403);
      return c.json({
        error: "Not Authorized",
      });
    }
  } catch (error) {
    c.status(403);
    return c.json({
      error: "Error while Authorization",
    });
  }
});
