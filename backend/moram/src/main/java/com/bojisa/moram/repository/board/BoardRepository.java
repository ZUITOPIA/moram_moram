package com.bojisa.moram.repository.board;

import com.bojisa.moram.entity.board.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {

    @Override
    Optional<Board> findById(Long id);
}
