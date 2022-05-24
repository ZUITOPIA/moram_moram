package com.bojisa.moram.repository.board;

import com.bojisa.moram.entity.board.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {

    @Override
    Optional<Board> findById(Long id);

    @Query("SELECT b FROM Board b")
    List<Board> selectAllDiaries();
}
