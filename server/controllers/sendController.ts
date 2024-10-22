import { NextFunction, Request, Response } from "express";
import { contentSchema } from "../model/MessageSchema";
import { dbConfig } from "../helper/DbConfig";
import { prismaInstance } from "../helper/prismaInstance";

export const sendController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const reqBody = req.body;
    const parsedRes = contentSchema.safeParse(reqBody);
    if (!parsedRes.success) {
      next(parsedRes.error.message || "Invalid Data");
    }

    const parsedData = parsedRes.data;

    await dbConfig();

    await prismaInstance.message.create({
      data: {
        content: parsedData?.content as string,
      },
    });
    res
      .json({
        message: "Tweeted",
      })
      .status(201);
  } catch (error) {
    console.log(`Something went wrong. Please try again. ${error}`);
    return next(error as Error);
  }
};
