package com.graphql.api.security.httpTypes;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class JwtRefreshRequest {
    String refreshToken;
}
