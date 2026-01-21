import { createFeedFollow } from "src/lib/db/queries/feed-follow";
import { getFeedByUrl } from "src/lib/db/queries/feeds";
import { User } from "src/types";

export async function followCommand(
  _commandName: string,
  user: User,
  url: string,
) {
  const feed = await getFeedByUrl(url);
  const feedFollow = await createFeedFollow(user.id, feed.id);

  console.log(
    `User '${feedFollow.userName}' now follows feed '${feedFollow.feedName}'!`,
  );

  return;
}
