package com.graphql.api.security.jwt.utils;

import com.graphql.api.security.custom.models.User;
import com.graphql.api.security.jwt.models.Token;
import com.graphql.api.security.jwt.models.enumirates.State;
import com.graphql.api.security.jwt.services.TokenService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Slf4j
@Component
public class JwtUtils {
    private static Long count = -9223372036854775808L;
    private final SecretKey refreshKey;
    private final SecretKey accessKey;
    private final Duration lifeRefresh;
    private final Duration lifeAccess;
    private final TokenService tokenService;

    @Autowired
    public JwtUtils(
            @Value("${jwt.refresh.key}") String refreshKey,
            @Value("${jwt.access.key}") String accessKey,
            @Value("${jwt.refresh.timeLife.days}") Integer dayForRefresh,
            @Value("${jwt.refresh.timeLife.minutes}") Integer minutesForRefresh,
            @Value("${jwt.access.timeLife.days}") Integer dayForAccess,
            @Value("${jwt.access.timeLife.minutes}") Integer minutesForAccess,
            TokenService tokenService
    ) {
        this.refreshKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(refreshKey));
        this.accessKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(accessKey));
        this.tokenService = tokenService;
        this.lifeRefresh = Duration.ofMinutes(minutesForRefresh).plus(Duration.ofDays(dayForRefresh));
        this.lifeAccess = Duration.ofMinutes(minutesForAccess).plus(Duration.ofDays(dayForAccess));
    }

    public String generateAccessToken(@NotNull User user) {
        count++;
        return Jwts
                .builder()
                .setSubject(user.getUsername())
                .setExpiration(Date
                        .from(LocalDateTime.now().plusSeconds(lifeAccess.getSeconds())
                                .atZone(ZoneId.systemDefault())
                                .toInstant()))
                .signWith(accessKey)
                .claim("roles", user.getRoles())
                .claim("email", user.getEmail())
                .claim(String.valueOf(count), count)
                .compact();
    }

    public String generateRefreshToken(@NotNull User user) {
        count++;
        return Jwts
                .builder()
                .setSubject(user.getUsername())
                .setExpiration(Date
                        .from(LocalDateTime.now().plusSeconds(lifeRefresh.getSeconds())
                                .atZone(ZoneId.systemDefault())
                                .toInstant()))
                .signWith(refreshKey)
                .claim(String.valueOf(count), count)
                .compact();
    }

    private boolean validateToken(String token, Key secret) {
        Token Ttoken = tokenService.findByValue(token);
        if (Ttoken == null) {
            log.error("Token not found: {}", token);
            return false;
        } else if (Ttoken.getStateToken().getName().equals(State.DISABLE.toString())) {
            log.error("Token is disable: {}", token);
            return false;
        }
        try {
            Jwts.parserBuilder()
                    .setSigningKey(secret)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException expiredJwtException) {
            tokenService.disableToken(Ttoken);
            log.error("Token expired", expiredJwtException);
        } catch (UnsupportedJwtException unsupportedJwtException) {
            log.error("Unsupported jwt", unsupportedJwtException);
        } catch (MalformedJwtException malformedJwtException) {
            log.error("Malformed jwt", malformedJwtException);
        } catch (Exception exception) {
            log.error("invalid token", exception);
        }
        return false;
    }

    public boolean validateAccessToken(String accessToken) {
        return validateToken(accessToken, accessKey);
    }

    public boolean validateRefreshToken(String refreshToken) {
        return validateToken(refreshToken, refreshKey);
    }

    private Claims getClaims(String token, Key secret) {
        return Jwts
                .parserBuilder()
                .setSigningKey(secret)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public Claims getClaimsRefreshToken(String refreshToken) {
        return getClaims(refreshToken, refreshKey);
    }

    public Claims getClaimsAccessToken(String accessToken) {
        return getClaims(accessToken, accessKey);
    }
}
