import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import * as elements from "typed-html";

import { BaseHtml } from "./basehtml";
import { VideoList } from "./video";
import { GetFile, GetFilePaths } from "./files";

const videoServePath = "/videos";
const videoDir = "/Users/SarahJoachim/source/yolo-polo/static/video";
const imageDir = "/Users/SarahJoachim/source/yolo-polo/static/images";

const app = new Elysia()
  .use(html())
  .get("/", ({ html }) =>
    html(
      <BaseHtml>
        <body hx-get="/videos" hx-swap="innerHTML" hx-trigger="load" />
      </BaseHtml>
    )
  )
  .get("/videos", async () => {
    let fileNames: string[] = await GetFilePaths(videoDir, videoServePath);

    return <VideoList {...{ paths: fileNames }}></VideoList>;
  })
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
