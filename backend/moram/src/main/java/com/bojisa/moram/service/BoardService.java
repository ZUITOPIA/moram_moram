package com.bojisa.moram.service;

import com.bojisa.moram.entity.board.Board;
import com.bojisa.moram.entity.board.Hashtag;
import com.bojisa.moram.entity.board.Image;
import com.bojisa.moram.entity.board.requestResponseDto.*;
import com.bojisa.moram.repository.board.BoardRepository;
import com.bojisa.moram.repository.board.HashtagRepository;
import com.bojisa.moram.repository.board.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final ImageRepository imageRepository;

    private final HashtagRepository hashtagRepository;

    @Transactional
    public void saveDiary(DiaryRequestDto diaryRequestDto) {
        Board board = diaryRequestDto.toBoardEntity();
        boardRepository.save(board);
        System.out.println("board Id: " + board.getId());

        List<String> fileNames = diaryRequestDto.getFileNames();
        for (String name : fileNames) {
            ImageRequestDto imageRequestDto = new ImageRequestDto();
            Image image = imageRequestDto.toEntity(board, name);
            imageRepository.save(image);
        }

        List<String> hashTags = diaryRequestDto.getHashTags();
        for (String tag : hashTags) {
            HashtagRequestDto hashtagRequestDto = new HashtagRequestDto();
            Hashtag hashtag = hashtagRequestDto.toEntity(board, tag);
            hashtagRepository.save(hashtag);
        }
    }

    public List<DiaryResponseDto> getAllDiaries() {
        List<DiaryResponseDto> diaryResponseDtoList = new ArrayList<>();
        List<Board> boards = boardRepository.selectAllDiaries();
        for (Board board : boards) {
            List<String> imagesByBoard = imageRepository.findImagesByBoard(board);
            List<String> hashtagsByBoard = hashtagRepository.findHashtagsByBoard(board);
            DiaryResponseDto diaryResponseDto = new DiaryResponseDto(board, imagesByBoard, hashtagsByBoard);
            diaryResponseDtoList.add(diaryResponseDto);
        }
        return diaryResponseDtoList;
    }

    public List<BoardResponseDto> getContents() {
        List<BoardResponseDto> boardResponseDtoList = new ArrayList<>();
        List<Board> boards = boardRepository.selectAllDiaries();
        for (Board board : boards) {
            BoardResponseDto of = BoardResponseDto.of(board);
            boardResponseDtoList.add(of);
        }
        return boardResponseDtoList;
    }

}
