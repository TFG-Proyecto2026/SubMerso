package com.submerso.service;

import com.submerso.dto.logbook.DiveDTO;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class LogbookService {
    
    public List<DiveDTO> getDives(String userId) {
        return Collections.emptyList();
    }
    
    public DiveDTO createDive(DiveDTO diveDTO) {
        return null;
    }
    
    public DiveDTO getDive(String diveId) {
        return null;
    }
    
    public DiveDTO updateDive(String diveId, DiveDTO diveDTO) {
        return null;
    }
    
    public void deleteDive(String diveId) {
    }
}
