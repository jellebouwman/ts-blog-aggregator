import { resetUsersTable } from "src/lib/db/queries/users";

export async function resetCommand() {
  try {
    await resetUsersTable();
    console.log("Successfully reset users table.");
  } catch (error) {
    console.log("Error while trying to reset the users table.");
    if (error instanceof Error) {
      console.error(error.message);
      console.error(error.stack);
      process.exit(1);
    } else {
      console.error("Unknown error:", error);
    }
  }
}
