import { Options, PythonShell } from "python-shell";
import internal from "stream";

export function pythonShellWrapper(
  scriptPath: string,
  pyParam: string,
  options?: Options | undefined,
  stdoutSplitter?: internal.Transform | undefined,
  stderrSplitter?: internal.Transform | undefined
) {
  return new Promise((resolve, reject) => {
    const shell = new PythonShell(
      scriptPath,
      options,
      stdoutSplitter,
      stderrSplitter
    );

    shell.on("error", (error) => {
      reject(error);
    });

    shell.on("message", (message) => {
      // データを表示
      resolve(message);
    });

    shell.send(JSON.stringify(pyParam));
  });
}
