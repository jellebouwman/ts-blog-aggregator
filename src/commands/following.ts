import { readConfig } from "src/config";
import { getFeedFollowsByUser } from "src/lib/db/queries/feed-follow";

export async function followingCommand() {
  const username = readConfig().currentUserName;
  const feedFollows = await getFeedFollowsByUser(username);

  console.log(`${username} is following these feeds:`);

  feedFollows.forEach((feedFollow) => {
    console.log(`- ${feedFollow.feedName}`);
  });

  return;
}
