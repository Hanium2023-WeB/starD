import React, { Component } from 'react';
import { Client } from '@stomp/stompjs';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            connected: false,
            message: '',
            greetings: [],
            userNickname: '',
            studyId: null,
        };

        this.stompClient = new Client({
            brokerURL: 'ws://localhost:8080/gs-guide-websocket',
        });

        this.stompClient.onConnect = this.onConnect;
        this.stompClient.onWebSocketError = this.onWebSocketError;
        this.stompClient.onStompError = this.onStompError;
    }

    state = {
        connected: false,
        message: '',
        greetings: [],
        userNickname: '',
        newMessage: '',
        studyId: null,
    };

    componentDidMount() {
        this.setConnected(false);
        this.fetchUserNickname();

        const searchParams = new URLSearchParams(window.location.search);
        const studyId = searchParams.get('studyId');
        if (studyId) {
            this.setState({ studyId });

            this.connect()
                .then(() => {
                    if (this.stompClient.connected) {
                        this.subscribeToChatRoom(studyId);
                    }
                })
                .catch((error) => {
                    console.error('Failed to connect:', error);
                });
        }
    }

    componentWillUnmount() {
        // 컴포넌트가 마운트 해제될 때 웹소켓 연결을 끊음
        this.disconnect();
    }

    subscribeToChatRoom(studyId) {
        // 스터디 ID를 기반으로 해당 채팅방을 구독
        this.stompClient.subscribe(`/chat/room/${studyId}`, (greeting) => {
            this.showGreeting(JSON.parse(greeting.body).content);
        });
    }

    findRoom = () => {
        const { studyId } = this.state;
        axios.get(`http://localhost:8080/chat/room/${studyId}`)
            .then(response => {
                this.setState({ room: response.data });
            })
            .catch(error => {
                console.error('Error fetching chat room:', error);
            });
    };

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

            return new Promise((resolve, reject) => {
                this.stompClient.activate({ headers })
                    .then(() => {
                        resolve(); // 연결에 성공하면 프로미스를 해결합니다.
                    })
                    .catch((error) => {
                        reject(error); // 연결 실패 시 프로미스를 거부합니다.
                    });
            });
        } else {
            console.error('Access token not found.');
            return Promise.reject(new Error('Access token not found.'));
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

        // 메시지 전송 후 입력창 비우기
        this.setState({
            message: '',
        });
    };

    // 엔터 치면 메시지 전송
    onKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.sendName();
        }
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
                    <h2>{this.state.studyId} 팀의 채팅방</h2><br/><br/>
                </div>
                <div>
                    <label>채팅 보내기</label>
                    <input
                        type="text"
                        value={this.state.message}
                        onChange={(e) => this.setState({ message: e.target.value })}
                        onKeyDown={this.onKeyDown} // onKeyDown 핸들러 추가
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