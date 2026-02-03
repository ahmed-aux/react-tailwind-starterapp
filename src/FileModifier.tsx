export default async function modifyFile() {
  console.log("Modifying file...");

  try {
    // In StackBlitz, fetch the file from the public dev server
    const response = await fetch('/src/text.txt');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.status}`);
    }
    
    const currentContent = await response.text();
    console.log("Current content:", currentContent);

    // Make a hardcoded change
    const newContent = currentContent.replace("Hello, I am here to say Hello World", "Hello StackBlitz! File modified successfully!");

    console.log("New content:", newContent);

    // In StackBlitz WebContainer environment, we need to use the WebContainer API
    // to actually write to the file system
    const { WebContainer } = await import('@webcontainer/api');
    const webcontainer = await WebContainer.boot();
    
    // Write to the actual file location
    await webcontainer.fs.writeFile('/src/text.txt', newContent);
    
    console.log("File modified successfully!");

    return newContent;
  } catch (error) {
    console.error("Error modifying file:", error);
    throw error;
  }
}
