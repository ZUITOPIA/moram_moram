package com.bojisa.moram.repository.board;

import com.bojisa.moram.entity.board.Board;
import com.bojisa.moram.entity.board.Hashtag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HashtagRepository extends JpaRepository<Hashtag, Long> {

    @Query("SELECT h.tag FROM Hashtag h WHERE h.board = :board")
    List<String> findHashtagsByBoard(@Param("board") Board board);
}
