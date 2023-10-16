package com.web.stard.chat_stomp;

import com.web.stard.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
    public enum MessageType {
        ENTER, EXIT, TALK
    }

    private MessageType type;
    //채팅방의 스터디 ID
    private Long studyId;
    //보내는 사람
    private String sender;
    //private Member sender;
    //내용
    private String message;
}