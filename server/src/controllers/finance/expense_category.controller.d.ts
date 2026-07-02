import type { Response, Request } from "express";
export declare const fetchExpenseCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const addNewExpenseCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteExpenseCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const editExpenseCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=expense_category.controller.d.ts.map