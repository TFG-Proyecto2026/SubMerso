package com.submerso.service;

import com.submerso.dto.user.*;
import com.submerso.exception.CustomExceptions.BadRequestException;
import com.submerso.exception.CustomExceptions.ResourceAlreadyExistsException;
import com.submerso.exception.CustomExceptions.ResourceNotFoundException;
import com.submerso.mapper.UserMapper;
import com.submerso.model.Profile;
import com.submerso.model.User;
import com.submerso.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    
    public UserDTO getUserById(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        return userMapper.toUserDTO(user);
    }
    
    public UserDTO getUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
        return userMapper.toUserDTO(user);
    }
    
    @Transactional
    public UserDTO updateUser(String id, UpdateUserRequest request, String currentUserId) {
        if (!id.equals(currentUserId)) {
            throw new BadRequestException("You can only update your own profile");
        }
        
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        
        if (request.getUsername() != null && !request.getUsername().equals(user.getUsername())) {
            if (userRepository.existsByUsername(request.getUsername())) {
                throw new ResourceAlreadyExistsException("Username already taken");
            }
            user.setUsername(request.getUsername());
        }
        
        if (request.getFirstName() != null) {
            user.setFirstName(request.getFirstName());
        }
        
        if (request.getLastName() != null) {
            user.setLastName(request.getLastName());
        }
        
        if (request.getProfile() != null) {
            updateProfile(user, request.getProfile());
        }
        
        user = userRepository.save(user);
        return userMapper.toUserDTO(user);
    }
    
    private void updateProfile(User user, ProfileDTO profileDTO) {
        Profile profile = user.getProfile();
        if (profile == null) {
            profile = new Profile();
        }
        
        if (profileDTO.getBio() != null) {
            profile.setBio(profileDTO.getBio());
        }
        if (profileDTO.getAvatar() != null) {
            profile.setAvatar(profileDTO.getAvatar());
        }
        if (profileDTO.getLocation() != null) {
            profile.setLocation(profileDTO.getLocation());
        }
        if (profileDTO.getCertifications() != null) {
            profile.setCertifications(profileDTO.getCertifications());
        }
        if (profileDTO.getTotalDives() != null) {
            profile.setTotalDives(profileDTO.getTotalDives());
        }
        if (profileDTO.getBadges() != null) {
            profile.setBadges(profileDTO.getBadges());
        }
        if (profileDTO.getWebsite() != null) {
            profile.setWebsite(profileDTO.getWebsite());
        }
        if (profileDTO.getPhoneNumber() != null) {
            profile.setPhoneNumber(profileDTO.getPhoneNumber());
        }
        
        user.setProfile(profile);
    }
    
    public List<FollowDTO> getFollowers(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        
        List<User> followers = userRepository.findByIdIn(user.getFollowers());
        return followers.stream()
                .map(userMapper::toFollowDTO)
                .collect(Collectors.toList());
    }
    
    public List<FollowDTO> getFollowing(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        
        List<User> following = userRepository.findByIdIn(user.getFollowing());
        return following.stream()
                .map(userMapper::toFollowDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public void followUser(String userId, String currentUserId) {
        if (userId.equals(currentUserId)) {
            throw new BadRequestException("You cannot follow yourself");
        }
        
        User userToFollow = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        
        User currentUser = userRepository.findById(currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", currentUserId));
        
        if (currentUser.getFollowing().contains(userId)) {
            throw new BadRequestException("You are already following this user");
        }
        
        currentUser.getFollowing().add(userId);
        userToFollow.getFollowers().add(currentUserId);
        
        userRepository.save(currentUser);
        userRepository.save(userToFollow);
    }
    
    @Transactional
    public void unfollowUser(String userId, String currentUserId) {
        if (userId.equals(currentUserId)) {
            throw new BadRequestException("You cannot unfollow yourself");
        }
        
        User userToUnfollow = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        
        User currentUser = userRepository.findById(currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", currentUserId));
        
        if (!currentUser.getFollowing().contains(userId)) {
            throw new BadRequestException("You are not following this user");
        }
        
        currentUser.getFollowing().remove(userId);
        userToUnfollow.getFollowers().remove(currentUserId);
        
        userRepository.save(currentUser);
        userRepository.save(userToUnfollow);
    }
    
    public List<UserSummaryDTO> searchUsers(String query) {
        List<User> users = userRepository.searchUsers(query);
        return users.stream()
                .map(userMapper::toUserSummaryDTO)
                .collect(Collectors.toList());
    }
    
    public boolean isFollowing(String userId, String targetUserId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        return user.getFollowing().contains(targetUserId);
    }
}
