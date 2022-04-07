import { FunctionComponent } from 'react';
import { Props } from './types';

const Message: FunctionComponent<Props> = ({ chatMessage }) => {
  return (
    <div
      style={{
        background: '#00deda',
        borderRadius: '5px',
        padding: '0 10px',
      }}>
      <p>
        <strong>{chatMessage.user}</strong> says:
      </p>
      <p>{chatMessage.content}</p>
    </div>
  );
};

export default Message;
