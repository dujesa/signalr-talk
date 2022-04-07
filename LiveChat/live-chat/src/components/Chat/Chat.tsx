import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';
import { useRef } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FunctionComponent } from 'react';

import ChatInput from '../ChatInput';
import ChatModal from '../ChatModal';
import { Message } from '../Message/types';

const Chat: FunctionComponent = () => {
  const [connection, setConnection] = useState<HubConnection | undefined>();
  const [chatHistory, setChatHistory] = useState<Array<Message>>([]);
  const latestChat = useRef<Array<Message>>([]);

  latestChat.current = chatHistory;

  const hookMessageReceiver = useCallback(async () => {
    if (!connection) {
      return;
    }

    try {
      await connection?.start();

      connection?.on('ReceiveMessage', (message) => {
        setChatHistory((prev) => [...prev, message]);
      });
    } catch (error: any) {
      alert(`Connection to hub failed: ${error}`);
    }
  }, [connection]);

  const sendMessage = async (message: Message) => {
    if (connection?.state !== HubConnectionState.Connected) {
      alert('No connection to server is established yet!!!');

      return;
    }

    try {
      await connection.send('SendMessage', message);
    } catch (error: any) {
      alert(`Error occured while sending message: ${error}`);
    }
  };

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7177/hubs/chat')
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    hookMessageReceiver();
  }, [hookMessageReceiver]);

  return (
    <div>
      <ChatInput sendMessage={sendMessage} />
      <hr />
      <ChatModal chatHistory={chatHistory} />
    </div>
  );
};

export default Chat;
