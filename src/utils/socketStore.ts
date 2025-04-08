// utils/socketStore.ts
const onlineUsers = new Map<string, string>();

export const addUserSocket = (userId: string, socketId: string) => {
  console.log('userId: ', userId, 'socketId: ', socketId);
  onlineUsers.set(userId, socketId);
};

export const removeUserSocket = (userId: string) => {
  onlineUsers.delete(userId);
};

export const getUserSocket = (userId: string): string | undefined => {
  const socketId = onlineUsers.get(userId);
  console.log(`🔍 Fetching socket ID for ${userId}: ${socketId}`);
  return socketId;
};

// Debug: check current map
export const logOnlineUsers = () => {
  console.log('🟢 Online users:', Object.fromEntries(onlineUsers));
};
