import { useState, useRef, useEffect } from "react";
import { WebContainer } from "@webcontainer/api";
import { files } from "./files.ts";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";

/** @type {import('@webcontainer/api').WebContainer}  */
let webcontainerInstance: WebContainer;
let isBooting = false;

function App() {
  const [code, setCode] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminal = useRef<Terminal | null>(null);
  const fitAddon = useRef<FitAddon | null>(null);

  useEffect(() => {
    async function init() {
      // Prevent multiple boots
      if (isBooting || webcontainerInstance) {
        return;
      }
      isBooting = true;

      // Initialize terminal and open it in the DOM element
      if (!terminal.current) {
        terminal.current = new Terminal({ convertEol: true });
        fitAddon.current = new FitAddon();
        terminal.current.loadAddon(fitAddon.current);

        if (terminalRef.current) {
          terminal.current.open(terminalRef.current);
          // Fit the terminal to its container
          fitAddon.current.fit();
        }
      }

      // Call only once
      if (!webcontainerInstance) {
        webcontainerInstance = await WebContainer.boot();
        await webcontainerInstance.mount(files);

        const exitCode = await installDependencies();
        if (exitCode !== 0) {
          throw new Error("Installation failed");
        }

        // Start dev server AFTER dependencies are installed
        await startDevServer();
      }

      // Load the initial App.tsx content into the textarea
      const appTsxContent = files.src.directory["App.tsx"].file.contents;
      setCode(appTsxContent);
      if (textareaRef.current) {
        textareaRef.current.value = appTsxContent;
      }

      isBooting = false;
    }

    init();
  }, []);

  // Handle terminal resize
  useEffect(() => {
    const handleResize = () => {
      if (fitAddon.current) {
        try {
          fitAddon.current.fit();
        } catch (err) {
          // Ignore resize errors
        }
      }
    };

    window.addEventListener("resize", handleResize);
    // Also fit after a short delay to ensure container is rendered
    const timer = setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  async function installDependencies() {
    // Install dependencies
    const installProcess = await webcontainerInstance.spawn("npm", ["install"]);
    installProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          console.log(data);
          if (terminal.current) {
            terminal.current.write(data);
          }
        },
      })
    );
    // Wait for install command to exit
    return installProcess.exit;
  }

  async function startDevServer() {
    // Run `npm run start` to start the Vite dev server
    const serverProcess = await webcontainerInstance.spawn("npm", [
      "run",
      "start",
    ]);

    serverProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          console.log(data);
          if (terminal.current) {
            terminal.current.write(data);
          }
        },
      })
    );

    // Wait for `server-ready` event
    webcontainerInstance.on("server-ready", (_port, url) => {
      if (iframeRef.current) {
        iframeRef.current.src = url;
      }
    });
  }

  async function writeAppTSX(content: string) {
    if (!webcontainerInstance) {
      console.log("WebContainer not initialized yet");
      return;
    }
    try {
      await webcontainerInstance.fs.writeFile("/src/App.tsx", content);
      console.log("Successfully wrote to /src/App.tsx");
    } catch (error) {
      console.error("Failed to write file:", error);
    }
  }

  // Debounce the file write to avoid too many writes
  useEffect(() => {
    if (!code || code === "") return;

    const timer = setTimeout(() => {
      console.log("Writing code to file...");
      writeAppTSX(code);
    }, 500); // Write after 500ms of no typing

    return () => clearTimeout(timer);
  }, [code]);

  return (
    <div className="flex flex-col h-screen gap-4 p-4">
      {/* Top Row: Editor and Preview side by side */}
      <div className="flex flex-1 gap-4 min-h-0">
        <div className="editor flex-1 flex flex-col">
          <div className="mb-2 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono">
            src/App.tsx
          </div>
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full p-4 border rounded font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Loading App.tsx..."
            spellCheck={false}
          />
        </div>
        <div className="preview flex-1 flex flex-col">
          <div className="mb-2 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono">
            Preview (Hot Module Replacement enabled)
          </div>
          <iframe
            ref={iframeRef}
            src="src/loading.html"
            className="flex-1 w-full border rounded bg-white"
          />
        </div>
      </div>

      {/* Bottom Row: Terminal spanning full width */}
      <div className="terminal flex flex-col h-48">
        <div className="mb-2 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono">
          Terminal
        </div>
        <div
          ref={terminalRef}
          className="flex-1 border rounded bg-black overflow-hidden p-2"
        />
      </div>
    </div>
  );
}

export default App;
