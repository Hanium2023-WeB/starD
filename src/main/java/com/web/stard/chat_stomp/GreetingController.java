package com.web.stard.chat_stomp;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequiredArgsConstructor
public class GreetingController {

    private final Logger logger = LoggerFactory.getLogger(GreetingController.class); // 로그를 위한 Logger 생성

    @MessageMapping("/enter/{studyId}")
    @SendTo("/topic/greetings/{studyId}")
    public Greeting enter(ChatMessage message) {
        System.out.println("/enter 진입");
        System.out.println("type, sender, id" + message.getType() +" " +  message.getSender() + " " + message.getStudyId());
        return new Greeting(HtmlUtils.htmlEscape(message.getSender()+"님이 입장하였습니다."));
    }

    @MessageMapping("/exit/{studyId}")
    @SendTo("/topic/greetings/{studyId}")
    public Greeting exit(ChatMessage message) throws Exception {
        System.out.println("/exit 진입");
        return new Greeting(HtmlUtils.htmlEscape(message.getSender() + "님이 퇴장하였습니다."));
    }

    @MessageMapping("/chat/{studyId}")
    @SendTo("/topic/greetings/{studyId}")
    public Greeting chat(ChatMessage message) throws Exception {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");

        Date now = new Date();

        String currentTime = format.format(now);

        System.out.println("/chat 진입");
        return new Greeting(HtmlUtils.htmlEscape( message.getSender() + ": " + message.getMessage() + "  ["+currentTime+"]"));
    }

}