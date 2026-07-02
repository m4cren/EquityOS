import type { Response, Request } from "express";
export declare const fetchTrades: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const addNewTrade: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const closeTrade: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteAccount: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=trade.controller.d.ts.map