package com.submerso.controller;

import com.submerso.dto.common.ApiResponse;
import com.submerso.dto.common.PagedResponse;
import com.submerso.dto.marketplace.BookingDTO;
import com.submerso.dto.marketplace.OfferSummaryDTO;
import com.submerso.service.MarketplaceService;
import com.submerso.service.OfferService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/marketplace")
@RequiredArgsConstructor
public class MarketplaceController {

    private final MarketplaceService marketplaceService;
    private final OfferService offerService;

    @GetMapping("/offers")
    public ResponseEntity<ApiResponse<PagedResponse<OfferSummaryDTO>>> searchOffers(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Double minRating,
            @RequestParam(required = false) Boolean verifiedOnly,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "newest") String sort) {

        size = Math.min(size, 50);
        return ResponseEntity.ok(ApiResponse.success(
                offerService.searchOffers(q, category, city, maxPrice, minRating, verifiedOnly, page, size, sort)
        ));
    }
    
    @GetMapping("/bookings")
    public ResponseEntity<ApiResponse<List<BookingDTO>>> getBookings() {
        return ResponseEntity.ok(ApiResponse.success(marketplaceService.getBookings(null)));
    }
    
    @PostMapping("/bookings")
    public ResponseEntity<ApiResponse<BookingDTO>> createBooking(@RequestBody BookingDTO bookingDTO) {
        return ResponseEntity.ok(ApiResponse.success(marketplaceService.createBooking(bookingDTO)));
    }
    
    @GetMapping("/bookings/{bookingId}")
    public ResponseEntity<ApiResponse<BookingDTO>> getBooking(@PathVariable String bookingId) {
        return ResponseEntity.ok(ApiResponse.success(marketplaceService.getBooking(bookingId)));
    }
    
    @DeleteMapping("/bookings/{bookingId}")
    public ResponseEntity<ApiResponse<Void>> cancelBooking(@PathVariable String bookingId) {
        marketplaceService.cancelBooking(bookingId);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
