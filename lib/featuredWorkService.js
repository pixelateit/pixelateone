// lib/featuredWorkService.js
import FeaturedWork from "@/models/FeaturedWork";
import dbConnect from "@/lib/dbConnect";

export async function getFeaturedById(id, populate = false) {
  await dbConnect();
  let query = FeaturedWork.findById(id);
  if (populate) query = query.populate("workId");
  return await query;
}

export async function getFeaturedByWorkId(workId, populate = false) {
  await dbConnect();
  let query = FeaturedWork.findOne({ workId });
  if (populate) query = query.populate("workId");
  return await query;
}

export async function updateFeaturedById(id, data) {
  await dbConnect();
  return FeaturedWork.findByIdAndUpdate(id, data, { new: true });
}

export async function updateFeaturedByWorkId(workId, data) {
  await dbConnect();
  return FeaturedWork.findOneAndUpdate({ workId }, data, { new: true });
}

export async function deleteFeaturedById(id) {
  await dbConnect();
  return FeaturedWork.findByIdAndDelete(id);
}

export async function deleteFeaturedByWorkId(workId) {
  await dbConnect();
  return FeaturedWork.findOneAndDelete({ workId });
}

export async function createFeaturedForWork(workId, data) {
  await dbConnect();
  return FeaturedWork.create({ ...data, workId });
}
