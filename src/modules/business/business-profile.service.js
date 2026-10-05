import {
  BusinessProfile
} from "../../database/index.js";

export async function getProfile() {
  return BusinessProfile.findOne({
    where: {
      active: true
    },

    order: [["createdAt", "ASC"]]
  });
}

export async function createProfile(data) {
  const existing = await getProfile();

  if (existing) {
    await existing.update(data);

    return existing;
  }

  return BusinessProfile.create(data);
}

export async function updateProfile(data) {
  const existing = await getProfile();

  if (!existing) {
    return BusinessProfile.create(data);
  }

  await existing.update(data);

  return existing;
}