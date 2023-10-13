package com.web.stard.chat_stomp;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatRoomController {
    private final ChatService chatService;

    /*// 채팅 리스트 화면
    @GetMapping("/room")
    public String rooms(Model model) {
        return "/chat/room";
    }*/

    // 채팅방 생성
    @PostMapping("/room")
    public ChatRoom createRoom(@RequestBody Map<String, Object> requestPayload) {
        System.out.println("!! 채팅방 생성~~~~~~~~~");
        String id = (String) requestPayload.get("studyId");

        Integer intId = Integer.parseInt(id);
        Long studyId = intId.longValue();
        return chatService.createRoom(studyId);
    }
    /*// 채팅방 입장 화면
    @GetMapping("/room/enter/{roomId}")
    public String roomDetail(Model model, @PathVariable String roomId) {
        model.addAttribute("roomId", roomId);
        return "/chat/roomdetail";
    }
    // 특정 채팅방 조회
    @GetMapping("/room/{roomId}")
    @ResponseBody
    public ChatRoom roomInfo(@PathVariable String roomId) {
        return chatService.findById(roomId);
    }*/
}