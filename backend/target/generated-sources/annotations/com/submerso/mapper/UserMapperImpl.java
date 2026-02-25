package com.submerso.mapper;

import com.submerso.dto.user.FollowDTO;
import com.submerso.dto.user.ProfileDTO;
import com.submerso.dto.user.UserDTO;
import com.submerso.dto.user.UserSummaryDTO;
import com.submerso.model.Profile;
import com.submerso.model.User;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-02-25T09:43:06+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 25.0.2 (Eclipse Adoptium)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDTO toUserDTO(User user) {
        if ( user == null ) {
            return null;
        }

        UserDTO.UserDTOBuilder userDTO = UserDTO.builder();

        userDTO.id( user.getId() );
        userDTO.email( user.getEmail() );
        userDTO.username( user.getUsername() );
        userDTO.firstName( user.getFirstName() );
        userDTO.lastName( user.getLastName() );
        userDTO.profile( toProfileDTO( user.getProfile() ) );
        Set<String> set = user.getRoles();
        if ( set != null ) {
            userDTO.roles( new LinkedHashSet<String>( set ) );
        }
        userDTO.createdAt( user.getCreatedAt() );

        userDTO.followersCount( user.getFollowers() != null ? user.getFollowers().size() : 0 );
        userDTO.followingCount( user.getFollowing() != null ? user.getFollowing().size() : 0 );

        return userDTO.build();
    }

    @Override
    public ProfileDTO toProfileDTO(Profile profile) {
        if ( profile == null ) {
            return null;
        }

        ProfileDTO.ProfileDTOBuilder profileDTO = ProfileDTO.builder();

        profileDTO.bio( profile.getBio() );
        profileDTO.avatar( profile.getAvatar() );
        profileDTO.location( profile.getLocation() );
        List<String> list = profile.getCertifications();
        if ( list != null ) {
            profileDTO.certifications( new ArrayList<String>( list ) );
        }
        profileDTO.totalDives( profile.getTotalDives() );
        List<String> list1 = profile.getBadges();
        if ( list1 != null ) {
            profileDTO.badges( new ArrayList<String>( list1 ) );
        }
        profileDTO.website( profile.getWebsite() );
        profileDTO.phoneNumber( profile.getPhoneNumber() );

        return profileDTO.build();
    }

    @Override
    public Profile toProfile(ProfileDTO profileDTO) {
        if ( profileDTO == null ) {
            return null;
        }

        Profile.ProfileBuilder profile = Profile.builder();

        profile.bio( profileDTO.getBio() );
        profile.avatar( profileDTO.getAvatar() );
        profile.location( profileDTO.getLocation() );
        List<String> list = profileDTO.getCertifications();
        if ( list != null ) {
            profile.certifications( new ArrayList<String>( list ) );
        }
        profile.totalDives( profileDTO.getTotalDives() );
        List<String> list1 = profileDTO.getBadges();
        if ( list1 != null ) {
            profile.badges( new ArrayList<String>( list1 ) );
        }
        profile.website( profileDTO.getWebsite() );
        profile.phoneNumber( profileDTO.getPhoneNumber() );

        return profile.build();
    }

    @Override
    public UserSummaryDTO toUserSummaryDTO(User user) {
        if ( user == null ) {
            return null;
        }

        UserSummaryDTO.UserSummaryDTOBuilder userSummaryDTO = UserSummaryDTO.builder();

        userSummaryDTO.avatar( userProfileAvatar( user ) );
        userSummaryDTO.bio( userProfileBio( user ) );
        userSummaryDTO.id( user.getId() );
        userSummaryDTO.username( user.getUsername() );
        userSummaryDTO.firstName( user.getFirstName() );
        userSummaryDTO.lastName( user.getLastName() );

        return userSummaryDTO.build();
    }

    @Override
    public FollowDTO toFollowDTO(User user) {
        if ( user == null ) {
            return null;
        }

        FollowDTO.FollowDTOBuilder followDTO = FollowDTO.builder();

        followDTO.userId( user.getId() );
        followDTO.avatar( userProfileAvatar( user ) );
        followDTO.bio( userProfileBio( user ) );
        followDTO.username( user.getUsername() );

        return followDTO.build();
    }

    @Override
    public void updateUserFromDTO(UserDTO userDTO, User user) {
        if ( userDTO == null ) {
            return;
        }

        if ( userDTO.getUsername() != null ) {
            user.setUsername( userDTO.getUsername() );
        }
        if ( userDTO.getFirstName() != null ) {
            user.setFirstName( userDTO.getFirstName() );
        }
        if ( userDTO.getLastName() != null ) {
            user.setLastName( userDTO.getLastName() );
        }
        if ( userDTO.getProfile() != null ) {
            user.setProfile( toProfile( userDTO.getProfile() ) );
        }
    }

    private String userProfileAvatar(User user) {
        if ( user == null ) {
            return null;
        }
        Profile profile = user.getProfile();
        if ( profile == null ) {
            return null;
        }
        String avatar = profile.getAvatar();
        if ( avatar == null ) {
            return null;
        }
        return avatar;
    }

    private String userProfileBio(User user) {
        if ( user == null ) {
            return null;
        }
        Profile profile = user.getProfile();
        if ( profile == null ) {
            return null;
        }
        String bio = profile.getBio();
        if ( bio == null ) {
            return null;
        }
        return bio;
    }
}
