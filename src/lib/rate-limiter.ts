
// import { PrevState } from '@/config/types';
// import {Ratelimit} from '@upstash/ratelimit';
// import {Redis} from '@upstash/redis';
// import {differenceInMinutes} from 'date-fns';
// import {headers} from 'next/headers';

// const rateLimitLogin = new Ratelimit({
//     redis: Redis.fromEnv(),
//     limiter: Ratelimit.slidingWindow(5, '10 m'), // 5 requests per 10minute
// })

// const rateLimitOtp = new Ratelimit({
//     redis: Redis.fromEnv(),
//     limiter: Ratelimit.slidingWindow(3, '1 m'), // 3 codes per 10minute
// })

// async function genericRateLimiter(
//     type: "otp" | "login",

// )
// {
//     const headersList = await headers();
//     const ip= headersList.get("x-forwarded-for") ?? "";
//     return type === "otp" ? rateLimitOtp.limit(ip): rateLimitLogin.limit(ip)
// }
// export async function genericRateLimit(type: "otp" | "login"): Promise<PrevState | undefined>{
//     const {success, reset} = await genericRateLimiter(type)
//     const resetTime = new Date(reset);
//     const now = new Date();
//     const diffInSeconds = Math.round((resetTime.getTime() - now.getTime())/1000,
// );
// if (!success){
//     if(diffInSeconds > 60){
//         const resetTimeInMinutes = differenceInMinutes(resetTime, now);
//         return {
//             success: false,
//             message:`Too many attempts. Please try again in ${resetTimeInMinutes} minute${resetTimeInMinutes > 1 ? "s" : ""} `
//         };
//     }
//     return {
//         success: false,
//         message:`Too many attempts. Please try again in ${diffInSeconds} minute${diffInSeconds > 1 ? "s" : ""} `
//     };   
// }
// }