package com.submerso.controller;

import com.submerso.dto.common.ApiResponse;
import com.submerso.dto.user.AdminUserDTO;
import com.submerso.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<AdminUserDTO>>> listAllUsers() {
        List<AdminUserDTO> users = userService.findAllForAdmin();
        return ResponseEntity.ok(ApiResponse.success(users));
    }
}
