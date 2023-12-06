import { db } from "../client";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { personas } from "../schema/persona.schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export const getToken = async (dni: string, constrasena: string) => {
  const user = await db.select().from(personas).where(eq(personas.dni, dni));
  if (user.length > 0) {
    if (await bcrypt.compare(constrasena, user[0].hash)) {
      const token = jwt.sign(
        { id: user[0].id },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: "1d" }
      );
      return { accessToken: token };
    } else {
      return 401;
    }
  } else {
    return 404;
  }
};

export const validateToken = async (token: string) => {
  const result = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
  return result;
};
