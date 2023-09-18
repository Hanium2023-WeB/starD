package com.web.stard.chat;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class WebSocketController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final MessageService messageService;
    private static final Logger logger = LoggerFactory.getLogger(WebSocketController.class);

    @MessageMapping("/chat")
    public void sendMessage(ChatDto chatDto, SimpMessageHeaderAccessor accessor) {
        // 메시지 저장
        Message message = new Message();
        message.setContent(chatDto.getChat());
        //message.setAuthor("admin");
        message = messageService.saveMessage(message);

        // 저장된 메시지를 채팅방에 브로드캐스트
        simpMessagingTemplate.convertAndSend("/sub/chat/" + chatDto.getChannelId(), chatDto);

        // 저장된 모든 메시지를 가져와서 브로드캐스트 (예: 최근 10개 메시지)
        List<Message> recentMessages = messageService.getMessages();
        simpMessagingTemplate.convertAndSend("/sub/chat/" + chatDto.getChannelId() + "/recent", recentMessages);
    }
}