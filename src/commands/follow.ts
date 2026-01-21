import { readConfig } from "src/config";
import { createFeedFollow } from "src/lib/db/queries/feed-follow";
import { getFeedByUrl } from "src/lib/db/queries/feeds";
import { getUser } from "src/lib/db/queries/users";

export async function followCommand(_commandName: string, url: string) {
  const feed = await getFeedByUrl(url);
  const currentUser = await getUser(readConfig().currentUserName);
  const feedFollow = await createFeedFollow(currentUser.id, feed.id);

  console.log(
    `User '${feedFollow.userName}' now follows feed '${feedFollow.feedName}'!`,
  );

  return;
}
