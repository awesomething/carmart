// "use server";

// import { auth } from "@/auth";
// import { completeChallenge, issueChallenge } from "@/lib/otp";
// import { genericRateLimit } from "@/lib/rate-limiter";

// export const resendChallengeAction = async () => {
//   // const limiterError = await genericRateLimit("otp");
//   // if (limiterError) return limiterError;

//   const session = await auth();

//   if (!session?.user) {
//     return {
//       success: false,
//       message: "Unauthorized",
//     };
//   }

//   await issueChallenge(session.user.id as string, session.user.email as string);
//   console.log("Challenge sent to user", session.user.email);
//   return {
//     success: true,
//     message: "Code sent!",
//   };
// };
// export const sendChallengeAction = async () => {
//   const session = await auth();
//   if (!session?.user?.id || !session?.user?.email) {
//     return { success: false, message: "User not authenticated" };
//   }

//   return await issueChallenge(session.user.id, session.user.email);
// };


// export const completeChallengeAction = async (code: string) =>{
// 	const session = await auth();
// 	if (!session?.user) {
// 		return { success: false, message: "User not authenticated" };
// 	}
// 	const {id} = session.user;
// 	const result = completeChallenge(id as string, code);
// 	return result;
// }