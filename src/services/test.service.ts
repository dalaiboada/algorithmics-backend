export const getTestMessage = (): { message: string; timestamp: string } => {
  return {
    message: "Server online",
    timestamp: new Date().toISOString(),
  };
};
