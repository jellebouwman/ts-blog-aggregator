import { db } from "..";
import { posts, feeds, feedFollows } from "../schema";
import { desc, eq } from "drizzle-orm";

export async function createPost(newPost: typeof posts.$inferInsert) {
  const [result] = await db
    .insert(posts)
    .values(newPost)
    .onConflictDoNothing()
    .returning();

  return result;
}

export async function getPostsForUser(userId: string, limit: number = 2) {
  const result = await db
    .select({
      id: posts.id,
      title: posts.title,
      url: posts.url,
      description: posts.description,
      publishedAt: posts.publishedAt,
      feedName: feeds.name,
      feedUrl: feeds.url,
    })
    .from(posts)
    .innerJoin(feeds, eq(posts.feedId, feeds.id))
    .innerJoin(feedFollows, eq(feeds.id, feedFollows.feedId))
    .where(eq(feedFollows.userId, userId))
    .orderBy(desc(posts.publishedAt))
    .limit(limit);

  return result;
}
