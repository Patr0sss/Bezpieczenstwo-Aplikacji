export type friendType = {
  id: number;
  name: string;
  email: string;
  status: "online" | "offline";
  sex?: "male" | "female";
};

export type messageType = {
  id: number;
  message: string;
  senderId: number;
  receiverId: number;
};
