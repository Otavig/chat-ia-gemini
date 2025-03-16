package com.ia.chat.service;

import com.ia.chat.model.MsgModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

@Service
public class ChatService {

    @Autowired
    private WebClient webClient;

    private static final String API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOU-KEY"; 

    public String sendToApi(MsgModel msgModel) {
        try {
            return webClient.post()
                    .uri(API_URL)
                    .header("Content-Type", "application/json")
                    .bodyValue(msgModel) 
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();  
        } catch (WebClientResponseException e) {
            return "Error to send message: " + e.getResponseBodyAsString(); 
        }
    }
}
