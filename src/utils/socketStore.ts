// utils/socketStore.ts
const onlineUsers = new Map<string, string>();

export const addUserSocket = (userId: string, socketId: string) => {
  onlineUsers.set(userId, socketId);
};

export const removeUserSocket = (userId: string) => {
  onlineUsers.delete(userId);
};

export const getUserSocket = (userId: string): string | undefined => {
  return onlineUsers.get(userId);
};

// Debug: check current map
export const logOnlineUsers = () => {
  console.log('🟢 Online users:', Object.fromEntries(onlineUsers));
};
