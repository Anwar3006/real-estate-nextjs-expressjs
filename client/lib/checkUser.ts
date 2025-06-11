// After user signs in with Clerk we want to store that user in our own DB

import { currentUser } from "@clerk/nextjs/server";

const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null; // User is not signed in
  }

  // const dbUser = await getUserFromDatabase(user.id);

  // If the user does not exist in your database, you can create them
  // if (!dbUser) {
  //   await createUserInDatabase(user);
  // }

  return user; // Return the Clerk user object
};

export default checkUser;
