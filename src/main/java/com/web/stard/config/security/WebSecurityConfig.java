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

    private static final String[] PERMIT_URL_ARRAY = {

            /* swagger v2 */
            "/v2/api-docs",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",

            /* swagger v3 */
//            "/v3/api-docs/**",
//            "/swagger-ui/**"

            "/api/v2/members/sign-up",
            "/api/v2/members/login",
            "/api/v2/members/authority",
            "/api/v2/members/reissue",
            "/api/v2/members/logout",
            "/api/v2/members/check",
            "/api/v2/members/check2",
            "/api/v2/members/accessToken-expiration",

            "/api/v2/studies/**",    // TODO URL 수정

            "/checkDuplicateNickname",
            "/checkDuplicateID",
            "/signup",
            "/signup/option-data",

            "/imageTest",

            "/user/mypage/profile",

            // 전체 스터디 게시글 조회 허용 O
            "/api/v2/studies/all",
            "/api/v2/studies/all-count",

    };

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()

                .authorizeRequests()
                .antMatchers(PERMIT_URL_ARRAY).permitAll()
                .antMatchers("/api/v1/users/userTest").hasRole("USER")
                .antMatchers("/api/v1/users/adminTest").hasRole("ADMIN")
                .anyRequest().authenticated()

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
