package com.web.stard.config.security;

import com.web.stard.config.jwt.JwtAuthenticationFilter;
import com.web.stard.config.jwt.JwtTokenProvider;
import com.web.stard.service.CustomMemberDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate redisTemplate;
    private final CustomMemberDetailsService customMemberDetailsService;

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()

                .authorizeRequests()
                .antMatchers("/api/v1/members/sign-up", "/api/v1/members/login", "/api/v1/members/authority", "/api/v1/members/reissue", "/api/v1/members/logout", "/api/v1/members/check", "/api/v1/members/check2", "/api/v1/members/isAccessTokenExpired").permitAll()
                .antMatchers("/api/v1/users/userTest").hasRole("USER")
                .antMatchers("/api/v1/users/adminTest").hasRole("ADMIN")

                // 해당 url 요청에 대해서는 로그인 요구 X
//                .antMatchers("/", "/signup", "/checkDuplicateID", "/checkDuplicateNickname", "/login", "/current-member").permitAll() //TODO 주석 제거
                // admin 요청에 대해서는 ROLE_ADMIN 역할을 가지고 있어야 함
//                .antMatchers("/admin").hasRole("ADMIN")
                // 나머지 요청에 대해서는 로그인 요구 O
//                .anyRequest().authenticated() //TODO 주석 제거

                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider, redisTemplate), UsernamePasswordAuthenticationFilter.class);

        // JwtAuthenticationFilter를 UsernamePasswordAuthentictaionFilter 전에 적용시킨다.
    }

    // 암호화에 필요한 PasswordEncoder Bean 등록
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.userDetailsService(customMemberDetailsService).passwordEncoder(passwordEncoder());
//    }
}
