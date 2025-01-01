import { Request, Response } from "express";
import { InsureNumbersQueryHandler } from "../../business/query-handlers/insure-numbers.query-handler";
import { InsureNumberInterface } from "../../business/interfaces/insure-number.interface";
import { InsureNumbersCommandHandler } from "../../business/command-handlers/insure-numbers.command-handler";

export class InsureNumbersHandler {
  public static async handleGetMatchingInsureNumbers(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const result: InsureNumberInterface[] =
        await InsureNumbersQueryHandler.executeGetMatchingInsureNumbers(
          req.params.searchString,
        );

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
  public static async handleGetAllInsureNumbers(
    _req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const result: InsureNumberInterface[] =
        await InsureNumbersQueryHandler.executeGetAllInsureNumbers();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  public static async handleSaveNewInsureNumber(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      await InsureNumbersCommandHandler.executeSaveNewInsureNumber(
        req.params.insureNumber,
      );
      res.status(200).json({ message: "Insure number saved successfully" });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
}
