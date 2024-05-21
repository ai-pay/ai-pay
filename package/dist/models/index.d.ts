import { z } from 'zod';

declare const checkAccessRequestSchema: z.ZodObject<{
    userId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: string;
}, {
    userId: string;
}>;
type CheckAccessRequest = z.infer<typeof checkAccessRequestSchema>;
declare const checkAccessResponseSchema: z.ZodObject<{
    access: z.ZodBoolean;
    creditsRemaining: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    access: boolean;
    creditsRemaining: number;
}, {
    access: boolean;
    creditsRemaining: number;
}>;
type CheckAccessResponse = z.infer<typeof checkAccessResponseSchema>;

declare const requestAccessRequestSchema: z.ZodObject<{
    userId: z.ZodString;
    requestCredits: z.ZodNumber;
    accessType: z.ZodUnion<[z.ZodObject<{
        type: z.ZodLiteral<"reoccurring">;
        dayFrequency: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        type: "reoccurring";
        dayFrequency: number;
    }, {
        type: "reoccurring";
        dayFrequency: number;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"one-time">;
    }, "strip", z.ZodTypeAny, {
        type: "one-time";
    }, {
        type: "one-time";
    }>]>;
}, "strip", z.ZodTypeAny, {
    userId: string;
    requestCredits: number;
    accessType: {
        type: "reoccurring";
        dayFrequency: number;
    } | {
        type: "one-time";
    };
}, {
    userId: string;
    requestCredits: number;
    accessType: {
        type: "reoccurring";
        dayFrequency: number;
    } | {
        type: "one-time";
    };
}>;
type RequestAccessRequest = z.infer<typeof requestAccessRequestSchema>;
declare const requestAccessResponseSchema: z.ZodObject<{
    url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
}, {
    url: string;
}>;
type RequestAccessResponse = z.infer<typeof requestAccessResponseSchema>;

type ApiResponse<T> = {
    error: string;
    debugError?: string;
    data?: undefined;
} | {
    error?: undefined;
    debugError?: undefined;
    data: T;
};
type PathToRequestResponse = {
    "/api/access/request": {
        request: RequestAccessRequest;
        response: RequestAccessResponse;
    };
    "/api/access/check": {
        request: CheckAccessRequest;
        response: CheckAccessResponse;
    };
};

export { ApiResponse, CheckAccessRequest, CheckAccessResponse, PathToRequestResponse, RequestAccessRequest, RequestAccessResponse, checkAccessRequestSchema, checkAccessResponseSchema, requestAccessRequestSchema, requestAccessResponseSchema };
