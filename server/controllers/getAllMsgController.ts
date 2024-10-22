import { NextFunction, Request, Response } from "express";
import { prismaInstance } from "../helper/prismaInstance";
import { dbConfig } from "../helper/DbConfig";

export const getAllMsgController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // console.log("query", req.query);

    let { skip = 0, limit = 10 } = req.query;

    if (+skip < 0 || +limit < 0) {
      res.json({
        message: "Skip and Limit shouldn't be a negative",
      });
    }

    const MAX_LIMIT = 10;
    limit = Math.min(MAX_LIMIT, +limit);

    await dbConfig();

    const [totalCount, tweets] = await Promise.all([
      await prismaInstance.message.count(),
      await prismaInstance.message.findMany({
        skip: +skip,
        take: +limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

    res
      .json({
        total: totalCount,
        pagination: {
          hasMore: totalCount - (Number(skip) + Number(limit)) > 0,
          skip,
          limit,
        },
        tweets,
      })
      .status(201);
  } catch (error) {
    console.log(`Something went wrong. Please try again. ${error}`);
    return next(error as Error);
  }
};
