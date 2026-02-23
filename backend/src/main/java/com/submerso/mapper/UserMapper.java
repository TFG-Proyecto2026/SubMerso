package com.submerso.mapper;

import com.submerso.dto.user.FollowDTO;
import com.submerso.dto.user.ProfileDTO;
import com.submerso.dto.user.UserDTO;
import com.submerso.dto.user.UserSummaryDTO;
import com.submerso.model.Profile;
import com.submerso.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UserMapper {
    
    @Mapping(target = "followersCount", expression = "java(user.getFollowers() != null ? user.getFollowers().size() : 0)")
    @Mapping(target = "followingCount", expression = "java(user.getFollowing() != null ? user.getFollowing().size() : 0)")
    UserDTO toUserDTO(User user);
    
    ProfileDTO toProfileDTO(Profile profile);
    
    Profile toProfile(ProfileDTO profileDTO);
    
    @Mapping(target = "avatar", source = "profile.avatar")
    @Mapping(target = "bio", source = "profile.bio")
    UserSummaryDTO toUserSummaryDTO(User user);
    
    @Mapping(target = "userId", source = "id")
    @Mapping(target = "avatar", source = "profile.avatar")
    @Mapping(target = "bio", source = "profile.bio")
    FollowDTO toFollowDTO(User user);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "email", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "roles", ignore = true)
    @Mapping(target = "followers", ignore = true)
    @Mapping(target = "following", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "enabled", ignore = true)
    @Mapping(target = "accountNonLocked", ignore = true)
    @Mapping(target = "refreshToken", ignore = true)
    void updateUserFromDTO(UserDTO userDTO, @MappingTarget User user);
}
