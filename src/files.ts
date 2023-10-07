import { BunFile } from "bun";
import { readdir } from "node:fs/promises";
import { join } from "node:path";

export const GetFilePaths = async (
  folderPath: string,
  servePath: string
): Promise<string[]> => {
  const fileNames = await readdir(folderPath, { withFileTypes: true });

  if (fileNames) {
    return fileNames
      .filter((entry) => entry.isFile() && entry.name.endsWith(".mp4"))
      .map((entry) => join(servePath, entry.name));
  }

  return [];
};

export const GetFile = (fileName: string, folderPath: string): BunFile =>
  Bun.file(join(folderPath, fileName));
