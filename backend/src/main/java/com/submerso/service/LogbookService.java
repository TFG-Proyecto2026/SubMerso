package com.submerso.service;

import com.submerso.dto.logbook.DiveDTO;
import com.submerso.model.Dive;
import com.submerso.repository.DiveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LogbookService {

    private static final DateTimeFormatter TIME_FORMAT = DateTimeFormatter.ISO_LOCAL_TIME;

    private final DiveRepository diveRepository;

    public List<DiveDTO> getDives(String userId) {
        if (userId == null) return List.of();
        return diveRepository.findByUserIdOrderByDiveDateDesc(userId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public DiveDTO createDive(String userId, DiveDTO dto) {
        if (userId == null) throw new IllegalArgumentException("Usuario no autenticado");
        Dive dive = toEntity(dto);
        dive.setUserId(userId);
        dive.setCreatedAt(LocalDateTime.now());
        dive.setVerified(Boolean.FALSE);
        Dive saved = diveRepository.save(dive);
        return toDTO(saved);
    }

    public DiveDTO getDive(String diveId) {
        return diveRepository.findById(diveId).map(this::toDTO).orElse(null);
    }

    public DiveDTO updateDive(String userId, String diveId, DiveDTO dto) {
        Dive existing = diveRepository.findById(diveId).orElse(null);
        if (existing == null || !existing.getUserId().equals(userId)) return null;
        Dive updated = toEntity(dto);
        updated.setId(diveId);
        updated.setUserId(userId);
        updated.setCreatedAt(existing.getCreatedAt());
        return toDTO(diveRepository.save(updated));
    }

    public void deleteDive(String userId, String diveId) {
        Dive d = diveRepository.findById(diveId).orElse(null);
        if (d != null && d.getUserId().equals(userId)) diveRepository.deleteById(diveId);
    }

    private Dive toEntity(DiveDTO dto) {
        return Dive.builder()
                .id(dto.getId())
                .userId(dto.getUserId())
                .diveNumber(dto.getDiveNumber())
                .diveDate(dto.getDiveDate())
                .location(dto.getLocation())
                .depthMax(dto.getDepthMax())
                .durationMinutes(dto.getDurationMinutes())
                .rnt(dto.getRnt())
                .abt(dto.getAbt())
                .tbt(dto.getTbt())
                .visibility(dto.getVisibility())
                .visibilityUnit(dto.getVisibilityUnit())
                .tempAir(dto.getTempAir())
                .tempSurface(dto.getTempSurface())
                .tempBottom(dto.getTempBottom())
                .weight(dto.getWeight())
                .weightUnit(dto.getWeightUnit())
                .exposureProtection(dto.getExposureProtection())
                .conditions(dto.getConditions())
                .diveType(dto.getDiveType())
                .pressureStart(dto.getPressureStart())
                .pressureEnd(dto.getPressureEnd())
                .timeIn(parseTime(dto.getTimeIn()))
                .timeOut(parseTime(dto.getTimeOut()))
                .gasMixPercent(dto.getGasMixPercent())
                .comments(dto.getComments())
                .bottomTimeToDate(dto.getBottomTimeToDate())
                .bottomTimeThisDive(dto.getBottomTimeThisDive())
                .cumulativeTime(dto.getCumulativeTime())
                .verified(dto.getVerified() != null ? dto.getVerified() : false)
                .verificationSignature(dto.getVerificationSignature())
                .certificationNo(dto.getCertificationNo())
                .createdAt(dto.getCreatedAt())
                .build();
    }

    private static LocalTime parseTime(String s) {
        if (s == null || s.isBlank()) return null;
        try {
            if (s.length() <= 5) return LocalTime.parse(s.length() == 5 ? s : "0" + s, DateTimeFormatter.ISO_LOCAL_TIME);
            return LocalTime.parse(s.substring(0, 5), DateTimeFormatter.ISO_LOCAL_TIME);
        } catch (Exception e) {
            return null;
        }
    }

    private DiveDTO toDTO(Dive d) {
        return DiveDTO.builder()
                .id(d.getId())
                .userId(d.getUserId())
                .diveNumber(d.getDiveNumber())
                .diveDate(d.getDiveDate())
                .location(d.getLocation())
                .depthMax(d.getDepthMax())
                .durationMinutes(d.getDurationMinutes())
                .rnt(d.getRnt())
                .abt(d.getAbt())
                .tbt(d.getTbt())
                .visibility(d.getVisibility())
                .visibilityUnit(d.getVisibilityUnit())
                .tempAir(d.getTempAir())
                .tempSurface(d.getTempSurface())
                .tempBottom(d.getTempBottom())
                .weight(d.getWeight())
                .weightUnit(d.getWeightUnit())
                .exposureProtection(d.getExposureProtection())
                .conditions(d.getConditions())
                .diveType(d.getDiveType())
                .pressureStart(d.getPressureStart())
                .pressureEnd(d.getPressureEnd())
                .timeIn(d.getTimeIn() != null ? d.getTimeIn().format(TIME_FORMAT) : null)
                .timeOut(d.getTimeOut() != null ? d.getTimeOut().format(TIME_FORMAT) : null)
                .gasMixPercent(d.getGasMixPercent())
                .comments(d.getComments())
                .bottomTimeToDate(d.getBottomTimeToDate())
                .bottomTimeThisDive(d.getBottomTimeThisDive())
                .cumulativeTime(d.getCumulativeTime())
                .verified(d.getVerified())
                .verificationSignature(d.getVerificationSignature())
                .certificationNo(d.getCertificationNo())
                .createdAt(d.getCreatedAt())
                .build();
    }
}
