import * as elements from "typed-html";

type Video = {
  src: string;
  poster: string;
  sentOn: Date;
  sender: string;
  conversation: string;
};

export function VideoItem({
  src,
  poster,
  sentOn,
  sender,
  conversation,
}: Video) {
  const fileName = src.split("/")[2].replace(".mp4", "");
  return (
    <div class="grid grid-flow-row auto-rows-max bg-base-100 shadow-inner">
      <video
        controls=""
        preload="none"
        poster={poster}
        class="p-2 pb-0 w-[320px] h-[320px]"
      >
        <source src={src} type="video/mp4" />
      </video>
      <p class="p-2">
        From: {sender}, On: {sentOn.toLocaleString()}
      </p>
    </div>
  );
}

export function VideoList({ paths }: { paths: string[] }) {
  return (
    <div class="grid grid-cols-4 content-around gap-2 mx-20 my-10">
      {paths.map((path) => {
        // need to figure out how to parse file date properly
        const fileDate = path.split("/")[2].replace(".mp4", "");
        const sentOn: Date = new Date();
        const video: Video = {
          src: path,
          poster: "/video-poster.png",
          sentOn: sentOn,
          sender: "A Friend",
          conversation: "You & A Friend",
        };
        return <VideoItem {...video}></VideoItem>;
      })}
    </div>
  );
}
