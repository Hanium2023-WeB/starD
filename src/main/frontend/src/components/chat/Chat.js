import React, {Component} from 'react';
import {Client} from '@stomp/stompjs';
import axios from 'axios';

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            connected: false,
            message: '',
            greetings: [],
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
        newMessage: '',
        studyId: null,
    };

    componentDidMount() {
        this.setConnected(false);

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
        //this.disconnect();
        this.sendExitMessage();
    }

    // 스터디 ID를 기반으로 해당 채팅방을 구독
    subscribeToChatRoom(studyId) {
        this.stompClient.subscribe(`/topic/greetings/${studyId}`, (greeting) => {
            this.showGreeting(JSON.parse(greeting.body));
        });
    }
    
    // 이전 채팅 내역을 가져오기
    fetchChatHistory = () => {
        const accessToken = localStorage.getItem('accessToken');
        const { studyId } = this.state;
        if (accessToken) {
            axios.get(`http://localhost:8080/chat/history/${studyId}`,{
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then(response => {
                    // 가져온 채팅 내역 저장
                    this.setState({greetings: response.data});
                    console.log("####: ", response.data);
                    this.sendEnterMessage();
                })
                .catch(error => {
                    console.error('Error fetching chat history:', error);
                });
        }
    };

    onConnect = (frame) => {
        const { studyId } = this.state;
        this.setConnected(true);
        console.log('Connected: ' + frame);
        this.stompClient.subscribe(`/topic/greetings/${studyId}`, (greeting) => {
            this.showGreeting(JSON.parse(greeting.body));
        });

        // 이전 채팅 내역 가져오기
        this.fetchChatHistory();
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
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
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
        //this.sendExitMessage();
    };

    // 입장 메시지
    sendEnterMessage = () => {
        const accessToken = localStorage.getItem('accessToken');
        const { studyId } = this.state;

        if (accessToken) {
            const headers = {
                Authorization: `${accessToken}`,
            };
            this.stompClient.publish({
                destination: `/app/enter/${studyId}`,
                body: JSON.stringify({ type: 'GREETING', studyId: studyId }),
                headers: headers,
            });
        } else {
            console.error('Access token not found.');
        }
    };

    // 퇴장 메시지
    sendExitMessage = () => {
        const accessToken = localStorage.getItem('accessToken');
        const { studyId } = this.state;

        if (this.stompClient.connected && accessToken) {
            const headers = {
                Authorization: `${accessToken}`,
            };
            this.stompClient.publish({
                destination: `/app/exit/${studyId}`,
                body: JSON.stringify({ type: 'GREETING', studyId: studyId }),
                headers: headers,
            });
        } else {
            console.error('Access token not found.');
        }
        this.disconnect();
    };

    sendMessage = () => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            const headers = {
                Authorization: `${accessToken}`,
            };
            const { message, studyId } = this.state;

            this.stompClient.publish({
                destination: `/app/chat/${studyId}`,
                body: JSON.stringify({ type: 'TALK', studyId: studyId, message: `${message}` }),
                headers: headers,
            });

            // 메시지 전송 후 입력창 비우기
            this.setState({
                message: '',
            });
        } else {
            console.error('Access token not found.');
        }
    };

    // 엔터 치면 메시지 전송
    onKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.sendMessage();
        }
    };

    showGreeting = (message) => {
        this.setState((prevState) => ({
            greetings: [...prevState.greetings, message],
        }));
    };

    // 날짜, 시간 포맷팅("yyyy-MM-dd HH:mm" 형식)
    formatDatetime = (datetime) => {
        const date = new Date(datetime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}`;
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
                        onKeyDown={this.onKeyDown}
                        placeholder="내용을 입력하세요"
                    />
                    <button onClick={this.sendMessage}>Send</button>
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
                                <td>
                                    {greeting.type === "GREETING" ? (
                                        greeting.message
                                    ) : (
                                        <span>
                                            {greeting.member ? greeting.member.nickname : 'Unknown'}: {greeting.message} [{this.formatDatetime(greeting.createdAt)}]
                                        </span>
                                    )}
                                </td>
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