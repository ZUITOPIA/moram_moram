package com.bojisa.moram.entity.board.requestResponseDto;

import com.bojisa.moram.entity.board.Board;
import lombok.Getter;

@Getter
public class BoardResponseDto {

    private final Long boardId;

    private final String date;

    private final String contents;

    private BoardResponseDto(Board entity) {
        this.boardId = entity.getId();
        this.date = entity.getDate();
        this.contents = entity.getContents();
    }

    public static BoardResponseDto of(Board board) {
        return new BoardResponseDto(board);
    }
}
