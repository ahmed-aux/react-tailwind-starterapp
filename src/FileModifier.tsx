import { WebContainer } from '@webcontainer/api';

export default async function modifyFile() {
  // Boot WebContainer
  const webcontainer = await WebContainer.boot();
  
  // Read existing file
  const currentContent = await webcontainer.fs.readFile('@/src/text.txt', 'utf-8');
  console.log(currentContent)
  return currentContent
  // Make a hardcoded change
  const newContent = currentContent.replace(
    'Hello World',
    'Hello StackBlitz!'
  );
  
  // Write the modified content back
  await webcontainer.fs.writeFile('text.txt', newContent);
  
  console.log('File modified!');
}

