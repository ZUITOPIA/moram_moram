package com.bojisa.moram.entity.board.requestResponseDto;

import com.bojisa.moram.entity.board.Board;
import com.bojisa.moram.entity.board.Hashtag;
import com.bojisa.moram.entity.board.Image;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class DiaryResponseDto {

    private String date;

    private String contents;

    private List<String> fileNames;

    private List<String> hashTags;

    public DiaryResponseDto(Board board, List<String> images, List<String> hashtags) {
        this.date = board.getDate();
        this.contents = board.getContents();
        this.fileNames = images;
        this.hashTags = hashtags;
    }

}
