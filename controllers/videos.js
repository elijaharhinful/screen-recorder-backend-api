import formidable from "formidable";
import fs from "fs";
import Video from '../models/Video.js'; // Import your video model

export const createVideo = async (req, res, next) => {
  try {
    const form = new formidable.IncomingForm();
    const tempDir = `./temp`;
    let outputFilePath;

    form.on('fileBegin', (name, file) => {
      const fullTempPath = `${tempDir}/${file.name}`;
      outputFilePath = `./uploads/${file.name}`;
      file.path = fullTempPath;
    });

    form.on('file', (name, file) => {
      try {
        const data = fs.readFileSync(file.path);
        fs.appendFileSync(outputFilePath, data);
        fs.unlinkSync(file.path);
      } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Error processing video chunk" });
      }
    });

    form.on('end', async () => {
      try {
        console.log(outputFilePath);
        // Save video information to MongoDB
        const video = new Video({
          videoUrl: outputFilePath,
          // Here you can add any other fields you need
        });

        await video.save();

        res.status(201).json({
          success: true,
          videoUrl: video.videoUrl,
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Error saving video to database" });
      }
    });

    form.parse(req);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error receiving video chunks" });
  }
};
