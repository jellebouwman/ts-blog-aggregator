import { eq } from "drizzle-orm";
import { db } from "..";
import { feedFollows, feeds, users } from "../schema";
import { getUser } from "./users";
import { User } from "src/types";

export async function createFeedFollow(userId: string, feedId: string) {
  const [result] = await db
    .insert(feedFollows)
    .values({ feedId, userId })
    .onConflictDoNothing()
    .returning();

  if (result === undefined) {
    throw new Error(
      `Feedfollow with userId '${userId}' and feedId '${feedId}' already exists`,
    );
  }

  const [feedFollowWithNames] = await db
    .select({
      id: feedFollows.id,
      feedId: feedFollows.feedId,
      feedName: feeds.name,
      userId: feedFollows.userId,
      userName: users.name,
    })
    .from(feedFollows)
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .where(eq(feedFollows.id, result.id))
    .limit(1);

  if (feedFollowWithNames === undefined) {
    throw new Error(`Feed follow does not exist`);
  }

  return feedFollowWithNames;
}

export async function getFeedFollowsByUser(user: User) {
  const feedFollowWithNames = await db
    .select({
      id: feedFollows.id,
      feedId: feedFollows.feedId,
      feedName: feeds.name,
      userId: feedFollows.userId,
      userName: users.name,
    })
    .from(feedFollows)
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .where(eq(feedFollows.userId, user.id));

  return feedFollowWithNames;
}

export async function deleteFeedFollow(feedId: string, userId: string) {
  const [deletedFeedFollowId] = await db
    .delete(feedFollows)
    .where(eq(feedFollows.feedId, feedId) && eq(feedFollows.userId, userId))
    .returning({ deletedId: feedFollows.id });

  if (deletedFeedFollowId === undefined) {
    throw new Error(
      `Could not delete feedFollow record with feedId '${feedId}' userId '${userId}'`,
    );
  }
}
