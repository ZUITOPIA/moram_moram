package com.bojisa.moram.repository.board;

import com.bojisa.moram.entity.board.Board;
import com.bojisa.moram.entity.board.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {

    Optional<Image> findImageByFilename(String filename);

    @Query("SELECT i.filename FROM Image i WHERE i.board = :board")
    List<String> findImagesByBoard(@Param("board") Board board);
}
