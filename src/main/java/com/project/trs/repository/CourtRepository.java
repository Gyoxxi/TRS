package com.project.trs.repository;

import com.project.trs.model.court.Court;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface CourtRepository extends JpaRepository<Court, Integer> {
    long count();

    @Query("SELECT COUNT(c) FROM Court c WHERE c.courtType.id = :courtId")
    long countCourtsByCourtTypeId(@Param("courtId") int courtId);

    @Query("SELECT c FROM Court c WHERE c.courtTypeId = :typeId AND NOT EXISTS " +
            "(SELECT r FROM Reservation r WHERE r.court = c " +
            "AND r.startTime <= :endTime AND r.endTime >= :startTime)")
    List<Court> findAvailableCourtsByType(@Param("typeId") int typeId, @Param("startTime") Timestamp startTime,
                                               @Param("endTime") Timestamp endTime);
}
