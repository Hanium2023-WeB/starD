import React, { Component } from 'react';
import axios from 'axios';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomId: '',
            room: {},
            sender: '',
            message: '',
            messages: [],
        };
        this.sock = new SockJS('/ws/chat');
        this.stompClient = Stomp.over(this.sock);
        this.reconnect = 0;
    }

    componentDidMount() {
        this.setState({
            roomId: localStorage.getItem('wschat.roomId'),
            sender: localStorage.getItem('wschat.sender'),
        });
        this.findRoom();
        this.connect();
    }

    findRoom = () => {
        axios.get(`/chat/room/${this.state.roomId}`)
            .then(response => {
                this.setState({ room: response.data });
            })
            .catch(error => {
                console.error('Error fetching chat room:', error);
            });
    };

    sendMessage = () => {
        this.stompClient.send(
            '/app/chat/message',
            {},
            JSON.stringify({
                type: 'TALK',
                roomId: this.state.roomId,
                sender: this.state.sender,
                message: this.state.message,
            })
        );
        this.setState({ message: '' });
    };

    recvMessage = (recv) => {
        this.setState((prevState) => ({
            messages: [
                {
                    type: recv.type,
                    sender: recv.type === 'ENTER' ? '[알림]' : recv.sender,
                    message: recv.message,
                },
                ...prevState.messages,
            ],
        }));
    };

    connect = () => {
        this.stompClient.connect(
            {},
            (frame) => {
                this.stompClient.subscribe(`/topic/chat/room/${this.state.roomId}`, (message) => {
                    const recv = JSON.parse(message.body);
                    this.recvMessage(recv);
                });

                this.stompClient.send(
                    '/app/chat/message',
                    {},
                    JSON.stringify({
                        type: 'ENTER',
                        roomId: this.state.roomId,
                        sender: this.state.sender,
                    })
                );
            },
            (error) => {
                if (this.reconnect++ <= 5) {
                    setTimeout(() => {
                        console.log('Connection reconnect');
                        this.sock = new SockJS('/ws/chat');
                        this.stompClient = Stomp.over(this.sock);
                        this.connect();
                    }, 10 * 1000);
                }
            }
        );
    };

    render() {
        return (
            <div className="container" id="app">
                <div>
                    <h2>{this.state.room.name}</h2>
                </div>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <label className="input-group-text">내용</label>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.message}
                        onChange={(e) => this.setState({ message: e.target.value })}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                this.sendMessage();
                            }
                        }}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button" onClick={this.sendMessage}>보내기</button>
                    </div>
                </div>
                <ul className="list-group">
                    {this.state.messages.map((message, index) => (
                        <li className="list-group-item" key={index}>
                            {message.sender} - {message.message}
                        </li>
                    ))}
                </ul>
                <div></div>
            </div>
        );
    }
}

export default ChatRoom;
