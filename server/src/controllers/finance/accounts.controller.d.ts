import type { Response, Request } from "express";
export declare const fetchAccounts: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const addNewAccount: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteAccount: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const editAccount: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=accounts.controller.d.ts.map