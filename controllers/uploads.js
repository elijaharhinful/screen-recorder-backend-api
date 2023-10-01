import fs from "fs";
import path from "path";
import Video from "../models/Video.js"; // Import your video model

const __dirname = path.dirname(import.meta.url);

export const uploadVideo = async (req, res, next) => {
  try {
    const uniqueFilename = `video-${Date.now()}.mp4`; // Generate a unique filename
    const fileStream = fs.createWriteStream(uniqueFilename, { flags: "a" });

    req.pipe(fileStream);

    fileStream.on("finish", () => {
      console.log("Chunk saved to disk");
      const filePath = path.join(__dirname, uniqueFilename);
      console.log("dirname: ", __dirname);
      console.log('Location of the output file: ', filePath);

      // Get the server's base URL
      const serverBaseUrl = req.protocol + '://' + req.get('host');

      // Get the URL of the file
      const fileUrl = serverBaseUrl + '/videos/' + uniqueFilename;

      console.log('URL of the output file: ', fileUrl);

      // Save the URL to the stored video in a database here
      res.status(200).send("Chunk saved to disk");
    });

    fileStream.on("error", (error) => {
      console.error("Error saving chunk to disk", error);
      next(error); // Pass the error to the error handler middleware
    });
  } catch (error) {
    console.error("Error handling request", error);
    next(error); // Pass the error to the error handler middleware
  }
};
