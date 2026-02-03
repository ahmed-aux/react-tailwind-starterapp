import { WebContainer } from "@webcontainer/api";

export default async function modifyFile() {
  console.log("Modifying file...");

  // Boot WebContainer

  const webcontainer = await WebContainer.boot();

  // First, create the file if it doesn't exist

  await webcontainer.fs.writeFile("text.txt", "Hello World");

  console.log("File created!");

  // Read existing file

  const currentContent = await webcontainer.fs.readFile("text.txt", "utf-8");

  console.log("Current content:", currentContent);

  // Make a hardcoded change

  const newContent = currentContent.replace("Hello World", "Hello StackBlitz!");

  // Write the modified content back

  await webcontainer.fs.writeFile("text.txt", newContent);

  console.log("File modified!");

  return newContent;
}
