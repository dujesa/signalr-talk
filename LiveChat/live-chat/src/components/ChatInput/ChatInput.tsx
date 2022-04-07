import { FunctionComponent } from 'react';
import { ChangeEvent, FormEvent, useState } from 'react';

import { Props } from './types';

const ChatInput: FunctionComponent<Props> = ({ sendMessage }) => {
  const [user, setUser] = useState<string>('');
  const [messageContent, setMessageContent] = useState<string>('');

  const onSubmitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isUserProvided = !!user && user !== '';
    const isMessageProvided = !!messageContent && messageContent !== '';

    if (!isUserProvided || !isMessageProvided) {
      alert('Input for message is invalid...add user and message!!!');

      return;
    }

    sendMessage({ user, content: messageContent });
  };

  return (
    <form onSubmit={onSubmitMessage}>
      <label htmlFor='user'>User</label>
      <br />
      <input
        id='user'
        name='user'
        value={user}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setUser(event.target.value)
        }
      />
      <br />
      <label htmlFor='message'>Message</label>
      <br />
      <input
        id='message'
        name='message'
        value={messageContent}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setMessageContent(event.target.value)
        }
      />
      <br />
      <button>Submit</button>
    </form>
  );
};

export default ChatInput;
