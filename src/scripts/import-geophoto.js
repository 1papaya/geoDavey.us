const program = require("commander");
const winston = require("winston");
const prompt = require("prompt");
const Jimp = require("jimp");
const slugify = require("slugify");
const { spawn } = require("child_process");
const cloudinary = require("cloudinary").v2;
const piexif = require("piexifjs");

//
// config
//

const options = {
  imageViewerCommand: "display",
  maxWH: 1024,
  cloudinaryFolder: "geophotos",
};

const log = winston.createLogger({
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()],
});

//
// script
//

let importGeophoto = (geophotoPath) => {
  log.info("processing %s", geophotoPath);

  // pop up window with photo preview
  let imageViewer = spawn(options.imageViewerCommand, [geophotoPath]);

  // read photo
  Jimp.read(geophotoPath, (err, geophoto) => {
    //
    // Prompt user for tags
    //

    prompt.start();

    prompt.get(["name", "desc", "tags", "gpsc"], (err, result) => {
      // close viewer window
      imageViewer.kill("SIGINT");

      // parse metadata from user input
      let slug = slugify(result.name).toLowerCase();
      let tagsArr = result.tags.split(";").concat(["geophoto"]); // include geophoto tag
      let gpscArr = result.gpsc.split(",").map((a, b) => {
        return parseFloat(a.trim());
      });

      // scale photo the smallest side to options.maxWH and keep aspect ratio
      // to use less storage on Cloudinary
      if (geophoto.bitmap.width > geophoto.bitmap.height)
        geophoto.resize(Jimp.AUTO, options.maxWH);
      else geophoto.resize(options.maxWH, Jimp.AUTO);

      //
      // Upload image
      //

      geophoto.getBase64(Jimp.MIME_JPEG, (error, geophotoBase64) => {
        // insert exif data into base64
        var exifStr = piexif.dump({
          "0th": {
            [piexif.ImageIFD.DocumentName]: result.name,
            [piexif.ImageIFD.ImageDescription]: result.desc,
          },
          GPS: {
            [piexif.GPSIFD.GPSLongitude]: piexif.GPSHelper.degToDmsRational(
              Math.abs(gpscArr[1])
            ),
            [piexif.GPSIFD.GPSLongitudeRef]: gpscArr[1] < 0 ? "W" : "E",

            [piexif.GPSIFD.GPSLatitude]: piexif.GPSHelper.degToDmsRational(
              Math.abs(gpscArr[0])
            ),
            [piexif.GPSIFD.GPSLatitudeRef]: gpscArr[0] < 0 ? "S" : "N",
          },
        });

        geophotoBase64Exif = piexif.insert(exifStr, geophotoBase64);

        // upload to cloudinary
        log.info("%s: uploading...", slug);

        cloudinary.uploader.upload(
          geophotoBase64Exif,
          {
            public_id: slug,
            folder: options.cloudinaryFolder,
            tags: tagsArr,
            timeout: 8675309,
            context: {
              alt: result.name,
              caption: result.desc,
              latlon: gpscArr.join(","),
            },
          },
          (err, result) => {
            if (err) log.error("%s %s", err.name, err.message);
            else log.info("%s: done: %s", slug, result.secure_url);
          }
        );
      });
    });
  });
};

program
  .arguments("<geophoto_path>")
  .option(
    "-e, --env <env_path>",
    "Path to .env file with Cloudinary credentials",
    "../../.env"
  )
  .action((geophotoPath, cmdObj) => {
    require("dotenv").config({ path: cmdObj.env });

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    importGeophoto(geophotoPath);
  })
  .parse(process.argv);
