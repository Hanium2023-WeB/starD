package com.web.stard.chat_stomp;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.util.HtmlUtils;

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

}