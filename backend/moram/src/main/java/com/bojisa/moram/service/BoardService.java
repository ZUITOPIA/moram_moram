package com.bojisa.moram.service;

import com.bojisa.moram.entity.board.Board;
import com.bojisa.moram.entity.board.Image;
import com.bojisa.moram.entity.board.requestResponseDto.BoardRequestDto;
import com.bojisa.moram.entity.board.requestResponseDto.BoardResponseDto;
import com.bojisa.moram.entity.board.requestResponseDto.DiaryRequestDto;
import com.bojisa.moram.repository.board.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    @Transactional
    public void makeBoard(DiaryRequestDto diaryRequestDto) {
        Board board = diaryRequestDto.toBoardEntity();
        boardRepository.save(board);
        Image image = diaryRequestDto.toImageEntity(board);
        System.out.println(image.getBoard().getId());
        System.out.println(image.getBoard().getContents());
//
//        return BoardResponseDto.of(boardRepository.save(board));
    }
}
