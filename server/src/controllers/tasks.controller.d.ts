import type { Request, Response } from "express";
export declare const createTask: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const fetchTasks: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const finishTask: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=tasks.controller.d.ts.map