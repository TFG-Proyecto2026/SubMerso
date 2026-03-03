package com.submerso.dto.logbook;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiveDTO {
    private String id;
    private String userId;

    private Integer diveNumber;
    private LocalDate diveDate;
    private String location;

    private Integer depthMax;
    private Integer durationMinutes;
    private Integer rnt;
    private Integer abt;
    private Integer tbt;

    private Integer visibility;
    private String visibilityUnit;
    private Integer tempAir;
    private Integer tempSurface;
    private Integer tempBottom;
    private Integer weight;
    private String weightUnit;

    private List<String> exposureProtection;
    private List<String> conditions;
    private String diveType;

    private Integer pressureStart;
    private Integer pressureEnd;
    private String timeIn;
    private String timeOut;
    private String gasMixPercent;

    private String comments;
    private Integer bottomTimeToDate;
    private Integer bottomTimeThisDive;
    private Integer cumulativeTime;

    private Boolean verified;
    private String verificationSignature;
    private String certificationNo;

    private LocalDateTime createdAt;
}
