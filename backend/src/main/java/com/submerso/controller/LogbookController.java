package com.submerso.controller;

import com.submerso.dto.common.ApiResponse;
import com.submerso.dto.logbook.DiveDTO;
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
    public ResponseEntity<ApiResponse<List<DiveDTO>>> getDives() {
        return ResponseEntity.ok(ApiResponse.success(logbookService.getDives(null)));
    }
    
    @PostMapping("/dives")
    public ResponseEntity<ApiResponse<DiveDTO>> createDive(@RequestBody DiveDTO diveDTO) {
        return ResponseEntity.ok(ApiResponse.success(logbookService.createDive(diveDTO)));
    }
    
    @GetMapping("/dives/{diveId}")
    public ResponseEntity<ApiResponse<DiveDTO>> getDive(@PathVariable String diveId) {
        return ResponseEntity.ok(ApiResponse.success(logbookService.getDive(diveId)));
    }
    
    @PutMapping("/dives/{diveId}")
    public ResponseEntity<ApiResponse<DiveDTO>> updateDive(
            @PathVariable String diveId,
            @RequestBody DiveDTO diveDTO
    ) {
        return ResponseEntity.ok(ApiResponse.success(logbookService.updateDive(diveId, diveDTO)));
    }
    
    @DeleteMapping("/dives/{diveId}")
    public ResponseEntity<ApiResponse<Void>> deleteDive(@PathVariable String diveId) {
        logbookService.deleteDive(diveId);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
