import type { Response, Request } from "express";
export declare const hashPin: (pin: string) => Promise<string>;
export declare const verifyPin: (pin: string, hash: string) => Promise<boolean>;
export declare const checkIfPinExist: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createNewPin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=security.controller.d.ts.map