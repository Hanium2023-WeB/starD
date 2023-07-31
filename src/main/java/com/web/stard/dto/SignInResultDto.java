package com.web.stard.dto;

import lombok.*;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SignInResultDto {

    private String token;

    private boolean success;

    private int code;

    private String msg;

    @Builder
    public SignInResultDto(boolean success, int code, String msg, String token) {
        this.success = success;
        this.code = code;
        this.msg = msg;
        this.token = token;
    }

}
