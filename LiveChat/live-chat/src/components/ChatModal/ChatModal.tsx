import { FunctionComponent } from 'react';
import Message from '../Message';
import { Props } from './types';

const ChatModal: FunctionComponent<Props> = ({ chatHistory }) => {
  return (
    <div>
      {chatHistory.map((message) => (
        <Message key={Date.now() * Math.random()} chatMessage={message} />
      ))}
    </div>
  );
};

export default ChatModal;
