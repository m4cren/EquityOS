import type { Request, Response } from "express";
export declare const fetchTradingSystem: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createTradingSystem: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateTradingSystem: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const addTradingPair: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const removeTradingPair: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateTradingPairs: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const addTradingStep: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const removeTradingStep: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateTradingSteps: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const addTradingCriterion: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const removeTradingCriterion: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateTradingCriteria: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=system.controller.d.ts.map