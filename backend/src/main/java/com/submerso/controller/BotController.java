package com.submerso.controller;

import com.submerso.dto.common.ApiResponse;
import com.submerso.service.BotService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bot")
@RequiredArgsConstructor
public class BotController {
    
    private final BotService botService;
    
    @PostMapping("/message")
    public ResponseEntity<ApiResponse<String>> sendMessage(@RequestBody String message) {
        return ResponseEntity.ok(ApiResponse.success(botService.processMessage(null, message)));
    }
    
    @DeleteMapping("/conversation")
    public ResponseEntity<ApiResponse<Void>> clearConversation() {
        botService.clearConversation(null);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
