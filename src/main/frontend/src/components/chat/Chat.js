import React, { Component } from 'react';
import { Client } from '@stomp/stompjs';

const stompClient = new Client({
  brokerURL: 'ws://localhost:8080/gs-guide-websocket',
});

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connected: false,
      message: '',
      greetings: [],
    };

    // 이미 생성한 stompClient 객체를 사용합니다.
    this.stompClient = new Client({
      brokerURL: 'ws://localhost:8080/gs-guide-websocket',
    });

    this.stompClient.onConnect = this.onConnect;
    this.stompClient.onWebSocketError = this.onWebSocketError;
    this.stompClient.onStompError = this.onStompError;
  }

  componentDidMount() {
    // React 컴포넌트가 마운트된 후 연결 버튼을 활성화
    this.setConnected(false);
  }

  onConnect = (frame) => {
    this.setConnected(true);
    console.log('Connected: ' + frame);
    this.stompClient.subscribe('/topic/greetings', (greeting) => {
      this.showGreeting(JSON.parse(greeting.body).content);
    });
  };

  onWebSocketError = (error) => {
    console.error('Error with websocket', error);
  };

  onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
  };

  setConnected = (connected) => {
    this.setState({
      connected: connected,
    });
  };

  connect = () => {
    this.stompClient.activate();
  };

  disconnect = () => {
    this.stompClient.deactivate();
    this.setConnected(false);
    console.log('Disconnected');
  };

  sendName = () => {
    this.stompClient.publish({
      destination: '/app/hello',
      body: JSON.stringify({ 'name': this.state.message }),
    });
  };

  showGreeting = (message) => {
    this.setState((prevState) => ({
      greetings: [...prevState.greetings, message],
    }));
  };

  render() {
    return (
        <div>
          <div>
            <label>WebSocket connection:</label>
            <button onClick={this.connect} disabled={this.state.connected}>Connect</button>
            <button onClick={this.disconnect} disabled={!this.state.connected}>Disconnect</button>
          </div>
          <div>
            <label>채팅 보내기</label>
            <input
                type="text"
                value={this.state.message}
                onChange={(e) => this.setState({ message: e.target.value })}
                placeholder="내용을 입력하세요"
            />
            <button onClick={this.sendName}>Send</button>
          </div>
          <div>
            <table>
              <thead>
              <tr>
                <th>Messages</th>
              </tr>
              </thead>
              <tbody>
              {this.state.greetings.map((greeting, index) => (
                  <tr key={index}>
                    <td>{greeting}</td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
    );
  }
}

export default Chat;
