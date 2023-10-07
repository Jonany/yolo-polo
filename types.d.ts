declare namespace JSX {
  interface HtmlTag {
    _?: string;
  }

  interface HtmlVideoTag {
    ///This enumerated attribute is intended to provide a hint to the browser about what the author thinks will lead to the best user experience regarding what content is loaded before the video is played.
    preload: "none" | "metadata" | "auto" | undefined;
  }
}
