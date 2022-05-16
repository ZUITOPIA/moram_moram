package com.bojisa.moram.entity.board.requestResponseDto;

import com.bojisa.moram.entity.board.Board;
import com.bojisa.moram.entity.board.Image;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class DiaryRequestDto {

    private String date;

    private String contents;

    private String uri;

    public Board toBoardEntity() {
        return Board.builder()
                .date(date)
                .contents(contents)
                .build();
    }

    public Image toImageEntity(Board board) {
        return Image.builder()
                .uri(uri)
                .board(board)
                .build();
    }
}

