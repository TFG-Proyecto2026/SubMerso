package com.submerso.controller;

import com.submerso.dto.common.ApiResponse;
import com.submerso.dto.logbook.DiveDTO;
import com.submerso.security.CurrentUser;
import com.submerso.security.UserPrincipal;
import com.submerso.service.LogbookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/logbook")
@RequiredArgsConstructor
public class LogbookController {

    private final LogbookService logbookService;

    @GetMapping("/dives")
    public ResponseEntity<ApiResponse<List<DiveDTO>>> getDives(@CurrentUser UserPrincipal currentUser) {
        if (currentUser == null) {
            return ResponseEntity.ok(ApiResponse.success(List.of()));
        }
        return ResponseEntity.ok(ApiResponse.success(logbookService.getDives(currentUser.getId())));
    }

    @PostMapping("/dives")
    public ResponseEntity<ApiResponse<DiveDTO>> createDive(
            @CurrentUser UserPrincipal currentUser,
            @RequestBody DiveDTO diveDTO
    ) {
        if (currentUser == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("Debes iniciar sesión para registrar una inmersión"));
        }
        return ResponseEntity.ok(ApiResponse.success(logbookService.createDive(currentUser.getId(), diveDTO)));
    }

    @GetMapping("/dives/{diveId}")
    public ResponseEntity<ApiResponse<DiveDTO>> getDive(@PathVariable String diveId) {
        DiveDTO dto = logbookService.getDive(diveId);
        if (dto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(ApiResponse.success(dto));
    }

    @PutMapping("/dives/{diveId}")
    public ResponseEntity<ApiResponse<DiveDTO>> updateDive(
            @CurrentUser UserPrincipal currentUser,
            @PathVariable String diveId,
            @RequestBody DiveDTO diveDTO
    ) {
        if (currentUser == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("No autorizado"));
        }
        DiveDTO updated = logbookService.updateDive(currentUser.getId(), diveId, diveDTO);
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(ApiResponse.success(updated));
    }

    @DeleteMapping("/dives/{diveId}")
    public ResponseEntity<ApiResponse<Void>> deleteDive(
            @CurrentUser UserPrincipal currentUser,
            @PathVariable String diveId
    ) {
        if (currentUser == null) {
            return ResponseEntity.status(401).build();
        }
        logbookService.deleteDive(currentUser.getId(), diveId);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
