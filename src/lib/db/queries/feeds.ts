import { eq } from "drizzle-orm";
import { db } from "..";
import { feeds, users } from "../schema";

export async function createFeed(name: string, url: string, userId: string) {
  const [result] = await db
    .insert(feeds)
    .values({ name, url, userId })
    .onConflictDoNothing()
    .returning();

  if (result === undefined) {
    throw new Error(`Feed with url '${url}' already exists`);
  }

  return result;
}

export async function getFeedByUrl(url: string) {
  const [result] = await db
    .select()
    .from(feeds)
    .where(eq(feeds.url, url))
    .limit(1);

  if (result === undefined) {
    throw new Error(`Feed with url '${url}' does not exist`);
  }

  return result;
}

export async function getFeeds() {
  const allFeeds = await db
    .select({
      id: feeds.id,
      name: feeds.name,
      url: feeds.url,
      userId: feeds.userId,
      username: users.name,
    })
    .from(feeds)
    .leftJoin(users, eq(feeds.userId, users.id));
  return allFeeds;
}
