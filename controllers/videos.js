import Video from "../models/Video.js";

export const getVideos = async (req, res, next) => {
  try {
    // Fetch all videos from the database
    const videos = await Video.find({});

    // Send the videos to the client
    res.status(200).json({ succes: true, data: videos });
  } catch (error) {
    console.error("Error handling request", error);
    next(error); // Pass the error to the error handler middleware
  }
};
