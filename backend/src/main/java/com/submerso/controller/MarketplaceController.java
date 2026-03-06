package com.submerso.controller;

import com.submerso.dto.common.ApiResponse;
import com.submerso.dto.common.PagedResponse;
import com.submerso.dto.marketplace.BookingDTO;
import com.submerso.dto.marketplace.OfferDetailDTO;
import com.submerso.dto.marketplace.OfferSummaryDTO;
import com.submerso.security.CurrentUser;
import com.submerso.security.UserPrincipal;
import com.submerso.service.MarketplaceService;
import com.submerso.service.OfferService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @GetMapping("/offers/{id}")
    public ResponseEntity<ApiResponse<OfferDetailDTO>> getOffer(@PathVariable String id) {
        Optional<OfferDetailDTO> result = offerService.getOfferById(id);
        if (result.isEmpty()) {
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.ok(ApiResponse.success(result.get()));
    }

    @GetMapping("/bookings")
    public ResponseEntity<ApiResponse<List<BookingDTO>>> getBookings(@CurrentUser UserPrincipal currentUser) {
        String userId = currentUser != null ? currentUser.getId() : null;
        return ResponseEntity.ok(ApiResponse.success(marketplaceService.getBookings(userId)));
    }

    @PostMapping("/bookings")
    public ResponseEntity<ApiResponse<BookingDTO>> createBooking(
            @RequestBody BookingDTO bookingDTO,
            @CurrentUser UserPrincipal currentUser) {
        if (currentUser != null) {
            bookingDTO.setUserId(currentUser.getId());
        }
        return ResponseEntity.ok(ApiResponse.success(marketplaceService.createBooking(bookingDTO)));
    }

    @GetMapping("/bookings/{bookingId}")
    public ResponseEntity<ApiResponse<BookingDTO>> getBooking(@PathVariable String bookingId) {
        BookingDTO dto = marketplaceService.getBooking(bookingId);
        if (dto == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(ApiResponse.success(dto));
    }

    @DeleteMapping("/bookings/{bookingId}")
    public ResponseEntity<ApiResponse<Void>> cancelBooking(@PathVariable String bookingId) {
        marketplaceService.cancelBooking(bookingId);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
