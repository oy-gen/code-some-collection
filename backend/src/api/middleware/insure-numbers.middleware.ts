import { Request, Response, NextFunction } from "express";

export class InsureNumbersMiddleware {
  public static async validateInsureNumberParam(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { insureNumber } = req.params;
    console.log(req.params);

    if (!insureNumber || insureNumber.trim() === "") {
      res.status(400).json({ message: "parameter cannot be empty." });
      return;
    }
    next();
  }
  public static async validateSearchStringParam(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { searchString } = req.params;
    console.log(req.params);

    if (!searchString || searchString.trim() === "") {
      res.status(400).json({ message: "parameter cannot be empty." });
      return;
    }
    next();
  }
}
