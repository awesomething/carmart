// "use server";

// import { auth, clerkClient } from "@clerk/nextjs/server";

// /**
//  * Server action to log the user out of all sessions
//  */
// export async function logoutOfAllSessions() {
//   try {
//     // Get the current user ID from Clerk auth
//     const userId  = auth();
    
//     if (!userId) {
//       return { success: false, error: "No authenticated user found" };
//     }
    
//     // Sign out of all sessions for this user
//     await clerkClient. users.signOut(userId, { allSessions: true });
    
//     return { success: true };
//   } catch (error) {
//     console.error("Error signing out of all sessions:", error);
//     return { 
//       success: false, 
//       error: "Failed to sign out of all sessions. Please try again."
//     };
//   }
// }