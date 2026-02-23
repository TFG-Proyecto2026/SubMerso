package com.submerso.controller;

import com.submerso.dto.common.ApiResponse;
import com.submerso.dto.user.*;
import com.submerso.security.CurrentUser;
import com.submerso.security.UserPrincipal;
import com.submerso.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDTO>> getUserById(@PathVariable String id) {
        UserDTO user = userService.getUserById(id);
        return ResponseEntity.ok(ApiResponse.success(user));
    }
    
    @GetMapping("/username/{username}")
    public ResponseEntity<ApiResponse<UserDTO>> getUserByUsername(@PathVariable String username) {
        UserDTO user = userService.getUserByUsername(username);
        return ResponseEntity.ok(ApiResponse.success(user));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDTO>> updateUser(
            @PathVariable String id,
            @Valid @RequestBody UpdateUserRequest request,
            @CurrentUser UserPrincipal currentUser
    ) {
        UserDTO user = userService.updateUser(id, request, currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", user));
    }
    
    @GetMapping("/{id}/followers")
    public ResponseEntity<ApiResponse<List<FollowDTO>>> getFollowers(@PathVariable String id) {
        List<FollowDTO> followers = userService.getFollowers(id);
        return ResponseEntity.ok(ApiResponse.success(followers));
    }
    
    @GetMapping("/{id}/following")
    public ResponseEntity<ApiResponse<List<FollowDTO>>> getFollowing(@PathVariable String id) {
        List<FollowDTO> following = userService.getFollowing(id);
        return ResponseEntity.ok(ApiResponse.success(following));
    }
    
    @PostMapping("/{id}/follow")
    public ResponseEntity<ApiResponse<Void>> followUser(
            @PathVariable String id,
            @CurrentUser UserPrincipal currentUser
    ) {
        userService.followUser(id, currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success("User followed successfully", null));
    }
    
    @DeleteMapping("/{id}/unfollow")
    public ResponseEntity<ApiResponse<Void>> unfollowUser(
            @PathVariable String id,
            @CurrentUser UserPrincipal currentUser
    ) {
        userService.unfollowUser(id, currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success("User unfollowed successfully", null));
    }
    
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<UserSummaryDTO>>> searchUsers(
            @RequestParam String query
    ) {
        List<UserSummaryDTO> users = userService.searchUsers(query);
        return ResponseEntity.ok(ApiResponse.success(users));
    }
    
    @GetMapping("/{id}/is-following/{targetId}")
    public ResponseEntity<ApiResponse<Boolean>> isFollowing(
            @PathVariable String id,
            @PathVariable String targetId
    ) {
        boolean isFollowing = userService.isFollowing(id, targetId);
        return ResponseEntity.ok(ApiResponse.success(isFollowing));
    }
    
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDTO>> getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        UserDTO user = userService.getUserById(currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success(user));
    }
}
