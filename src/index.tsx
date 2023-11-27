import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import * as elements from "typed-html";

import { BaseHtml } from "./basehtml";
import { SaveVideos, VideoList } from "./video";
import { GetFile, GetFilePaths } from "./files";
import { db } from "./db/index";
import { videos } from "./db/schema";

const videoServePath = "/videos";
const videoDir = "/Users/SarahJoachim/source/yolo-polo/static/video";
const imageDir = "/Users/SarahJoachim/source/yolo-polo/static/images";

const app = new Elysia()
  .use(html())
  .get("/", ({ html }) =>
    html(
      <BaseHtml>
        {/* <body hx-get="/videos" hx-swap="innerHTML" hx-trigger="load" /> */}
        <body class="p-8">
          <form hx-post="/videos" enctype="multipart/form-data">
            <input
              type="file"
              name="files"
              accept="video/mp4"
              multiple=""
              class="file-input file-input-bordered"
            />
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </body>
      </BaseHtml>
    )
  )
  .get("/videos", async () => {
    let fileNames: string[] = await GetFilePaths(videoDir, videoServePath);

    return <VideoList {...{ paths: fileNames }}></VideoList>;
  })
  .post(
    "/videos",
    async ({ body: { files } }) => {
      return <div>All files saved? {await SaveVideos(files)}</div>;
    },
    {
      body: t.Object({
        files: t.Files(),
      }),
    }
  )
  .get("/styles.css", () => Bun.file("./tailwind-gen/styles.css"))
  .get("/video-poster.png", () => Bun.file(imageDir + "/video_camera_icon.png"))
  .get("/videos/:name", ({ params }) => GetFile(params.name, videoDir), {
    params: t.Object({
      name: t.String({ minLength: 1 }),
    }),
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
