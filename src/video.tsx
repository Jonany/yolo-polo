import * as elements from "typed-html";

export function Video({ path }: { path: string }) {
  return (
    <div class="grid grid-flow-row auto-rows-max bg-base-100 shadow-inner">
      <video controls="" preload="none" class="p-2 pb-0 w-[640px] h-[432px]">
        <source src={path} type="video/mp4" />
      </video>
      <p class="p-2">Nick: 10/7 @ 8:32 AM</p>
    </div>
  );
}

export function VideoList({ paths }: { paths: string[] }) {
  return (
    <div class="grid grid-cols-1 content-around gap-1 mx-20 my-10">
      {paths.map((path) => (
        <Video {...{ path: path }}></Video>
      ))}
    </div>
  );
}
