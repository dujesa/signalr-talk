export type Props = {
  chatMessage: Message;
};

export interface Message {
  user?: string;
  content?: string;
}
