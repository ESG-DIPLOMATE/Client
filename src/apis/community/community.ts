import instance from "../instance";
import type { CommunityPopularResponse } from "./community.type";

export const getPopularPosts = () => {
  return instance.get<CommunityPopularResponse>("/api/v1/community/");
};
