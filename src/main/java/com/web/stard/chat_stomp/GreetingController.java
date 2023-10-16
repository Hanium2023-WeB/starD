package com.web.stard.chat_stomp;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.util.HtmlUtils;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class GreetingController {

    private final Logger logger = LoggerFactory.getLogger(GreetingController.class); // 로그를 위한 Logger 생성

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    @CrossOrigin(origins = "http://localhost:3000")
    public Greeting greeting(HelloMessage message) throws Exception {
        Thread.sleep(1000); // simulated delay
        String content = HtmlUtils.htmlEscape(message.getName());
        logger.info("Received a greeting message: {}", content);
        return new Greeting(content);
    }

    @MessageMapping("/enter")
    @SendTo("/topic/greetings")
    public Greeting enter(HelloMessage message) throws Exception {
        return new Greeting(HtmlUtils.htmlEscape("님께서 입장하셨습니다!"));
    }
    @MessageMapping("/exit")
    @SendTo("/topic/greetings")
    public Greeting exit(HelloMessage message, StompHeaderAccessor session) throws Exception {
        return new Greeting(HtmlUtils.htmlEscape(session.getSessionAttributes().get("name") + "님께서 퇴장하셨습니다!"));
    }
    @MessageMapping("/chat")
    @SendTo("/topic/greetings")
    public Greeting chat(HelloMessage message, StompHeaderAccessor session) throws Exception {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        Date now = new Date();

        String currentTime = format.format(now);

        System.out.println(currentTime);
        return new Greeting(HtmlUtils.htmlEscape(session.getSessionAttributes().get("name") + " : "+message.getName()+"["+currentTime+"]"));
    }
}