package com.proton.controller.resources.user;

import lombok.Data;

@Data
public class PasswordCheckRequest {
    private String username;
    private String password;    
}

