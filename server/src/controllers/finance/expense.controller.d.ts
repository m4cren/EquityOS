import type { Request, Response } from "express";
export declare const recordExpense: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const fetchExpense: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=expense.controller.d.ts.map