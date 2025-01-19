export type friendType = {
  user_id: number;
  username: string;
};

export type messageType = {
  sender_id?: number;
  receiver_id?: number;
  message: string;
  created_at?: string;
};
