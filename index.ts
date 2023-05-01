import app from "./shell/app";

// start server 'npx ts-node index.ts'
app.listen(process.env.PORT || 3030, () => {
  console.log("Start on port 3030.");
});
