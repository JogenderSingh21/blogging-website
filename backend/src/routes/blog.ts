import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@jojosehrawat/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    user: {
      id: number;
      username: string;
      name: string | null;
    };
  };
}>();

blogRouter.use("/*", async (c, next) => {
  try {
    const header = c.req.header("authorization") || "";

    const token = header.split(" ")[1];

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const { id } = await verify(token, c.env.JWT_SECRET);
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        name: true,
      },
    });
    if (id && user) {
      c.set("user", user);
      await next();
    } else {
      c.status(403);
      return c.json({
        error: "You are not logged in",
      });
    }
  } catch (error) {
    c.status(403);
    return c.json({
      message: "some error while authorization",
      error,
    });
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();

  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      error: "Inputs not correct",
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const user = c.get("user");
  console.log(user);

  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: Number(user.id),
      },
    });
    console.log(blog);

    return c.json({
      id: blog.id,
    });
  } catch (error) {
    console.log(error);
    c.status(411);
    return c.text("Invalid");
  }
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();

  const { success } = updateBlogInput.safeParse(body);
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
    const blog = await prisma.blog.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({
      id: blog.id,
    });
  } catch (error) {
    console.log(error);
    c.status(411);
    return c.text("Invalid");
  }
});

// Todo - pagination
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const user = c.get("user");
  try {
    const blogs = await prisma.blog.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({
      blogs,
      user,
    });
  } catch (error) {
    console.log(error);
    c.status(411);
    return c.json({
      message: "Error while fetching blogs",
    });
  }
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");
  const user = c.get("user");
  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: Number(id),
      },
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({
      blog,
      user,
    });
  } catch (error) {
    console.log(error);
    c.status(411);
    return c.json({
      message: "Error while fetching blog",
    });
  }
});
