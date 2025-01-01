import { Request, Response, NextFunction } from "express";

export class InsureNumbersMiddleware {
  public static async validateParamString(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const parameter: string = Object.keys(req.params)[0];

    if (!parameter || parameter.trim() === "") {
      res.status(400).json({ message: "url parameter is not valid." });
      return;
    }
    next();
  }
}
