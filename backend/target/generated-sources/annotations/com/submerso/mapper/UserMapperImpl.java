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
    date = "2026-03-04T16:13:26+0100",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.7 (Eclipse Adoptium)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDTO toUserDTO(User user) {
        if ( user == null ) {
            return null;
        }

        UserDTO.UserDTOBuilder userDTO = UserDTO.builder();

        userDTO.createdAt( user.getCreatedAt() );
        userDTO.email( user.getEmail() );
        userDTO.firstName( user.getFirstName() );
        userDTO.id( user.getId() );
        userDTO.lastName( user.getLastName() );
        userDTO.profile( toProfileDTO( user.getProfile() ) );
        Set<String> set = user.getRoles();
        if ( set != null ) {
            userDTO.roles( new LinkedHashSet<String>( set ) );
        }
        userDTO.username( user.getUsername() );

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

        profileDTO.avatar( profile.getAvatar() );
        List<String> list = profile.getBadges();
        if ( list != null ) {
            profileDTO.badges( new ArrayList<String>( list ) );
        }
        profileDTO.bio( profile.getBio() );
        List<String> list1 = profile.getCertifications();
        if ( list1 != null ) {
            profileDTO.certifications( new ArrayList<String>( list1 ) );
        }
        profileDTO.location( profile.getLocation() );
        profileDTO.phoneNumber( profile.getPhoneNumber() );
        profileDTO.totalDives( profile.getTotalDives() );
        profileDTO.website( profile.getWebsite() );

        return profileDTO.build();
    }

    @Override
    public Profile toProfile(ProfileDTO profileDTO) {
        if ( profileDTO == null ) {
            return null;
        }

        Profile.ProfileBuilder profile = Profile.builder();

        profile.avatar( profileDTO.getAvatar() );
        List<String> list = profileDTO.getBadges();
        if ( list != null ) {
            profile.badges( new ArrayList<String>( list ) );
        }
        profile.bio( profileDTO.getBio() );
        List<String> list1 = profileDTO.getCertifications();
        if ( list1 != null ) {
            profile.certifications( new ArrayList<String>( list1 ) );
        }
        profile.location( profileDTO.getLocation() );
        profile.phoneNumber( profileDTO.getPhoneNumber() );
        profile.totalDives( profileDTO.getTotalDives() );
        profile.website( profileDTO.getWebsite() );

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
        userSummaryDTO.firstName( user.getFirstName() );
        userSummaryDTO.id( user.getId() );
        userSummaryDTO.lastName( user.getLastName() );
        userSummaryDTO.username( user.getUsername() );

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

        if ( userDTO.getFirstName() != null ) {
            user.setFirstName( userDTO.getFirstName() );
        }
        if ( userDTO.getLastName() != null ) {
            user.setLastName( userDTO.getLastName() );
        }
        if ( userDTO.getProfile() != null ) {
            user.setProfile( toProfile( userDTO.getProfile() ) );
        }
        if ( userDTO.getUsername() != null ) {
            user.setUsername( userDTO.getUsername() );
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
