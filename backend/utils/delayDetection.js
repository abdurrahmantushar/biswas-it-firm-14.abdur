const checkOrderDelays = (order) => {
  const now = new Date();

  let orderDelayed = false;

  order.stages.forEach((stage) => {
    const deadline = new Date(stage.deadline);

    if (
      stage.status !== "completed" &&
      deadline < now
    ) {
      stage.status = "delayed";
    }

    if (stage.status === "delayed") {
      orderDelayed = true;
    }
  });

  order.isDelayed = orderDelayed;

  return order;
};

export default checkOrderDelays;