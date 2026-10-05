import {
  syncChannelProfile
} from "../../integrations/telegram/channel.service.js";

import {
  ChannelProfile
} from "../../database/index.js";

export async function initializeChannel() {
  return syncChannelProfile();
}

export async function getActiveChannel() {
  return ChannelProfile.findOne({
    order: [["createdAt", "ASC"]]
  });
}