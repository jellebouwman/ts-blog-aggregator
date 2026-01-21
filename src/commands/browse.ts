import { getPostsForUser } from "src/lib/db/queries/posts";
import { User } from "src/types";

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  } else if (diffHours > 0) {
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  } else {
    return `${diffSeconds} second${diffSeconds === 1 ? "" : "s"} ago`;
  }
}

function truncateDescription(description: string, maxLength: number = 40): string {
  if (description.length <= maxLength) {
    return description;
  }
  return description.substring(0, maxLength) + "...";
}

export async function browseCommand(
  _commandName: string,
  user: User,
  ...args: string[]
) {
  let limit = 2;
  
  if (args.length > 0) {
    const parsedLimit = parseInt(args[0], 10);
    if (!isNaN(parsedLimit) && parsedLimit > 0) {
      limit = parsedLimit;
    }
  }

  const posts = await getPostsForUser(user.id, limit);

  if (posts.length === 0) {
    console.log("No posts found. Follow some feeds and run 'agg' to fetch posts!");
    return;
  }

  console.log(`Latest ${posts.length} post${posts.length === 1 ? "" : "s"}:\n`);

  posts.forEach((post) => {
    console.log(`* ${post.title}`);
    console.log(`  Description: ${truncateDescription(post.description)}`);
    console.log(`  URL: ${post.url}`);
    console.log(`  Published: ${getRelativeTime(post.publishedAt)}`);
    console.log(`  Feed: ${post.feedName}`);
    console.log();
  });
}
