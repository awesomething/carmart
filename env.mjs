import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    UPSTASH_REDIS_REST_URL: z.string().url(),
    UPSTASH_REDIS_REST_TOKEN: z.string(),
    S3_BUCKET_ACCESS_KEY: z.string(),
    S3_BUCKET_SECRET_KEY: z.string(),
    ETHEREAL_USER: z.string(),
    ETHEREAL_PASS: z.string(),
    X_AUTH_TOKEN: z.string(),
    OPENAI_API_KEY: z.string(),
    NEXT_PUBLIC_S3_BUCKET_REGION: z.string(),
    NEXT_PUBLIC_S3_BUCKET_NAME: z.string(),
    NEXT_PUBLIC_S3_URL: z.string(),
    GEMINI_API_KEY: z.string()

  },

  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_IMGIX_URL: z.string().url(),
  },

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL || "",
    NODE_ENV: process.env.NODE_ENV || "test",
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    S3_BUCKET_ACCESS_KEY: process.env.S3_BUCKET_ACCESS_KEY || "",
    S3_BUCKET_SECRET_KEY: process.env.S3_BUCKET_SECRET_KEY || "",

    NEXT_PUBLIC_APP_URL:
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    NEXT_PUBLIC_IMGIX_URL: process.env.NEXT_PUBLIC_IMGIX_URL || "",
    X_AUTH_TOKEN: process.env.X_AUTH_TOKEN || "",
    ETHEREAL_USER: process.env.ETHEREAL_USER || "",
    ETHEREAL_PASS: process.env.ETHEREAL_PASS || "",
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "",
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
    NEXT_PUBLIC_S3_BUCKET_REGION: process.env.NEXT_PUBLIC_S3_BUCKET_REGION,
    NEXT_PUBLIC_S3_BUCKET_NAME: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    NEXT_PUBLIC_S3_URL: process.env.NEXT_PUBLIC_S3_URL,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY
  },
});
