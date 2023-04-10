package com.graphql.api.security.jwt.configs;

import com.graphql.api.security.jwt.models.StateToken;
import com.graphql.api.security.jwt.models.enumirates.State;
import com.graphql.api.security.jwt.models.enumirates.Type;
import com.graphql.api.security.jwt.models.TypeToken;
import com.graphql.api.security.jwt.services.StateTokenService;
import com.graphql.api.security.jwt.services.TypeTokenService;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Configuration
public class JwtConfig {
    private final Duration lifeRefresh;
    private final Duration lifeAccess;
    private final StateTokenService stateTokenService;
    private final TypeTokenService typeTokenService;

    public JwtConfig(
            @Value("${jwt.refresh.timeLife.days}") Integer dayForRefresh,
            @Value("${jwt.refresh.timeLife.minutes}") Integer minutesForRefresh,
            @Value("${jwt.access.timeLife.days}") Integer dayForAccess,
            @Value("${jwt.access.timeLife.minutes}") Integer minutesForAccess,
            StateTokenService stateTokenService,
            TypeTokenService typeTokenService
    ) {
        this.lifeRefresh = Duration.ofMinutes(minutesForRefresh).plus(Duration.ofDays(dayForRefresh));
        this.lifeAccess = Duration.ofMinutes(minutesForAccess).plus(Duration.ofDays(dayForAccess));
        this.stateTokenService = stateTokenService;
        this.typeTokenService = typeTokenService;
    }

    @PostConstruct
    public void initialization() {
        List<TypeToken> typeTokens = typeTokenService.saveAllTypeTokens(new ArrayList<>() {{
            add(new TypeToken(Type.REFRESH.toString(), lifeRefresh));
            add(new TypeToken(Type.ACCESS.toString(), lifeAccess));
        }});
        List<StateToken> stateTokens = stateTokenService.saveAllStateTokens(new ArrayList<>() {{
            add(new StateToken(State.ACTIVE.toString()));
            add(new StateToken(State.DISABLE.toString()));
        }});

        log.info("stateTokens: {}, typeTokens: {}", stateTokens, typeTokens);
    }
}
