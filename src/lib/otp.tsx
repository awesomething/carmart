
import nodemailer from "nodemailer";
import { env } from "@/env";
import { bcryptPasswordCompare, bcryptPasswordHash } from "../lib/bcrypt";
import { config } from "dotenv"
import { redis } from "../lib/redis-store";
import { transporter } from "@/lib/nodemailer";
import { prisma } from "./prisma";
import { fa } from "@faker-js/faker";

const REDIS_PREFIX = "otp";
config();
function generateChallengeEmailHTML(code: number): string {
	return `
	  <div style="font-family: Arial, sans-serif; padding: 20px;">
		<h2 style="color: #333;">🔐 Your Verification Code</h2>
		<p>Hello,</p>
		<p>Someone (hopefully you) is trying to sign in to your account.</p>
		<p>Please use the following verification code to complete your sign-in:</p>
		<div style="font-size: 32px; font-weight: bold; margin: 20px 0; color: #4A90E2;">
		  ${code}
		</div>
		<p>This code will expire in 10 minutes.</p>
		<p>If you didn’t request this, you can ignore this email.</p>
		<p style="margin-top: 40px;">Thanks,<br/>The ${process.env.NEXT_PUBLIC_APP_URL} Team</p>
	  </div>
	`;
}



export async function issueChallenge(userId: string, email: string) {
	const array = new Uint32Array(1);
	const code = (crypto.getRandomValues(array)[0] % 900000) + 100000;
	const hash = await bcryptPasswordHash(code.toString());
	const challenge = { codeHash: hash, email };

	await redis.setex(`${REDIS_PREFIX}:uid-${userId}`, 10 * 60, challenge);

	// Send email using nodemailer
	try {
		const info = await transporter.sendMail({
			from: `"EazyDev Dealership" <${env.ETHEREAL_USER}>`,
			to: email,
			subject: `Sign in to ${env.NEXT_PUBLIC_APP_URL}`,
			text: `Your sign-in code is: ${code}`,
			html: generateChallengeEmailHTML(code),
		});

		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	} catch (error) {
		console.log("Error sending email:", error);
	}
}
interface Challenge {
	codeHash: string,
	email: string
}
export async function completeChallenge(userId: string, code: string) {
	const challenge = await redis.get<Challenge>(`${REDIS_PREFIX}:uid-${userId}`);

	if (challenge) {
		const isCorrect = await bcryptPasswordCompare(code, challenge.codeHash);
		if (isCorrect) {
			const session = await prisma.session.findFirst({
				where: { userId, requires2FA: true },

			});
			if (session) {
				await prisma.session.updateMany({
					where: {
						userId,
						sessionToken: session.sessionToken
					},
					data: { requires2FA: false },
				});
				await redis.del(`${REDIS_PREFIX}:uid-${userId}`);
				return {success: true, message: "2FA enabled successfully"};
			}
			return {
				success: false,
				message: "Session not found",
			};
		}
		return {
			success: false,
			message: "Invalid code",
		};

	}
	return {
		success: false,
		message: "Challenge does not exist - please try again",
	}

}