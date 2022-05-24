package com.bojisa.moram.entity.board.requestResponseDto;

import com.bojisa.moram.entity.board.Board;
import com.bojisa.moram.entity.board.Image;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class DiaryRequestDto {

    private String date;

    private String contents;


    private List<String> fileNames;

    private List<String> hashTags;

    public Board toBoardEntity() {
        return Board.builder()
                .date(date)
                .contents(contents)
                .build();
    }

}

