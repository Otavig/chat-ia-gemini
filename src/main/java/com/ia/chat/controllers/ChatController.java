package com.ia.chat.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ia.chat.model.MsgModel;
import com.ia.chat.service.ChatService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    @Autowired
    private ChatService chatService;
    
    @PostMapping("/msg")
    public String sendMsg(@RequestBody MsgModel msgModel) {
        return chatService.sendToApi(msgModel);
    }
}
