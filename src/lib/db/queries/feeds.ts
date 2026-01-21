import { asc, eq, sql } from "drizzle-orm";
import { db } from "..";
import { feeds, users } from "../schema";
import { Feed } from "src/types";
import { fetchFeed, parseRSSDate } from "../rss";
import { createPost } from "./posts";

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

export async function markFeedFetched(feedId: string): Promise<void> {
  const [result] = await db
    .update(feeds)
    .set({
      lastFetchedAt: new Date(),
    })
    .where(eq(feeds.id, feedId));
}

export async function getNextFeedToFetch(): Promise<Feed> {
  const [result] = await db
    .select()
    .from(feeds)
    .orderBy(sql`${feeds.lastFetchedAt} ASC NULLS FIRST`)
    .limit(1);

  return result;
}

async function scrapeFeed({ url, id }: Feed): Promise<void> {
  await markFeedFetched(id);

  const feed = await fetchFeed(url);

  for (const item of feed.channel.item) {
    try {
      const publishedAt = parseRSSDate(item.pubDate);
      await createPost({
        title: item.title,
        url: item.link,
        description: item.description,
        publishedAt,
        feedId: id,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.warn(
          `Warning: Failed to save post '${item.title}': ${error.message}`,
        );
      }
    }
  }
}

export async function scrapeFeeds(): Promise<void> {
  const nextFeed = await getNextFeedToFetch();

  console.log(`Scraping '${nextFeed.name}' at '${nextFeed.url}'`);
  scrapeFeed(nextFeed);
}
