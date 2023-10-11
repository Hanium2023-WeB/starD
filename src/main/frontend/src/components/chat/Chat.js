import React, { Component } from 'react';
import { Client } from '@stomp/stompjs';
import axios from 'axios';

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            connected: false,
            message: '',
            greetings: [],
            userNickname: '', // 사용자 닉네임 상태 변수 추가
        };

        this.stompClient = new Client({
            brokerURL: 'ws://localhost:8080/gs-guide-websocket',
        });

        this.stompClient.onConnect = this.onConnect;
        this.stompClient.onWebSocketError = this.onWebSocketError;
        this.stompClient.onStompError = this.onStompError;
    }

    componentDidMount() {
        this.setConnected(false);
        this.fetchUserNickname(); // 사용자 닉네임 가져오기
    }

    // 사용자 닉네임 가져오는 함수
    fetchUserNickname = () => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            axios
                .get('http://localhost:8080/member/find-nickname', {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then((response) => {
                    const member = response.data;
                    this.setState({
                        userNickname: member.nickname,
                    });
                })
                .catch((error) => {
                    console.error('서버에서 닉네임을 가져오는 중 에러 발생:', error);
                });
        }
    };

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
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
            };

            this.stompClient.activate({ headers });
        } else {
            console.error('Access token not found.');
        }
    };

    disconnect = () => {
        this.stompClient.deactivate();
        this.setConnected(false);
        console.log('Disconnected');
    };

    sendName = () => {
        const { message, userNickname } = this.state;
        const messageWithNickname = `${userNickname}:  ${message}`;

        this.stompClient.publish({
            destination: '/app/hello',
            body: JSON.stringify({ 'name': messageWithNickname }),
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
                    <button onClick={this.connect} disabled={this.state.connected}>
                        Connect
                    </button>
                    <button onClick={this.disconnect} disabled={!this.state.connected}>
                        Disconnect
                    </button>
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
