import "dotenv/config"
import { app } from "./app.js";
import startDelayScheduler from "./utils/delayScheduler.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      startDelayScheduler();
})