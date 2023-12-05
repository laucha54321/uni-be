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
        user[0].id,
        process.env.ACCESS_TOKEN_SECRET + user[0].hash,
        { expiresIn: "30s" }
      );
      return { accessToken: token };
    } else {
      return 400;
    }
  } else {
    return 404;
  }
};
