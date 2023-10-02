import fs from "fs";
import path from "path";
import Video from "../models/Video.js"; // Import your video model

export const uploadVideo = async (req, res, next) => {
  let chunks = [];
  try {
    const uniqueFilename = `video-${Date.now()}.mp4`; // Generate a unique filename

    // Ensure that the videos directory exists
    const videosDir = path.join(process.cwd(), "videos");
    if (!fs.existsSync(videosDir)) {
      fs.mkdirSync(videosDir, { recursive: true });
    }

    // Collect all the chunks of data
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });

    // Merge all the chunks of data into a single buffer when all data has been read
    req.on("end", async () => {
      const file = Buffer.concat(chunks);

      // Write the buffer to a file
      fs.writeFile(path.join(videosDir, uniqueFilename), file, async (err) => {
        if (err) throw err;

        console.log("File has been saved.");

        // Get the server's base URL
        const serverBaseUrl = req.protocol + "://" + req.get("host");

        // Get the URL of the file
        const fileUrl = serverBaseUrl + "/videos/" + uniqueFilename;

        console.log("URL of the output file: ", fileUrl);

        // Create a new video object
        const video = new Video({
          title: uniqueFilename, // Assuming you have a title field in your request body
          filePath: path.join(videosDir, uniqueFilename),
          fileUrl: fileUrl,
        });

        // Save the video object to the database
        try {
          const savedVideo = await video.save();
          console.log("video saved")
          res.status(201).json({status: "200", video: savedVideo });
        } catch (error) {
          res.status(400).json({ error });
        }
      });
    });

    req.on("error", (error) => {
      console.error("Error saving chunk to disk", error);
      next(error); // Pass the error to the error handler middleware
    });
  } catch (error) {
    console.error("Error handling request", error);
    next(error); // Pass the error to the error handler middleware
  }
};
