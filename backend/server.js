import app from "./src/app.js";
import { config } from "./src/config/config.js";
import { connectDb } from "./src/config/db.js";

const PORT = config.port || 3000;

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
  connectDb()
});
