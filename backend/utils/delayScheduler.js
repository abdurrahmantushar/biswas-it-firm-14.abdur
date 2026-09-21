import Order from "../model/OrderModel.js";
import checkOrderDelays from "./delayDetection.js";

const runDelayDetection = async () => {
  try {
    const orders = await Order.find();

    for (const order of orders) {
      checkOrderDelays(order);
      await order.save();
    }

    console.log("Fulfillment delay detection completed");
  } catch (error) {
    console.error("Delay detection failed:", error.message);
  }
};

const startDelayScheduler = () => {
  runDelayDetection();

  setInterval(() => {
    runDelayDetection();
  }, 60 * 1000);
};

export default startDelayScheduler;