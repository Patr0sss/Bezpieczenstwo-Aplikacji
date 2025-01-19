export type friendType = {
  user_id: number;
  username: string;
};

export type messageType = {
  id: number;
  message: string;
  senderId?: number;
  receiverId?: number;
};
