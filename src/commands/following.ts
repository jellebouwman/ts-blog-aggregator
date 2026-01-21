import { getFeedFollowsByUser } from "src/lib/db/queries/feed-follow";
import { User } from "src/types";

export async function followingCommand(_commandName: string, user: User) {
  const feedFollows = await getFeedFollowsByUser(user);

  console.log(`${user.name} is following these feeds:`);

  feedFollows.forEach((feedFollow) => {
    console.log(`- ${feedFollow.feedName}`);
  });

  return;
}
