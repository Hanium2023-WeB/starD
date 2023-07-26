package com.web.stard.config.security;

import com.web.stard.domain.Member;
import com.web.stard.handler.LoginSuccessHandler;
import com.web.stard.repository.MemberRepository;
import com.web.stard.service.MemberService;
import lombok.AllArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final MemberService memberService;

    // 정적 자원에 대해서는 Security 설정을 적용하지 않음.
    // static 디렉터리의 하위 파일 목록은 인증 무시 ( = 항상통과 ) ex) css, img
    @Override
    public void configure(WebSecurity web) {
        web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.authorizeRequests()
                // 해당 url 요청에 대해서는 로그인 요구 X
                .antMatchers("/", "/hello", "/login", "/join").permitAll()
                // admin 요청에 대해서는 ROLE_ADMIN 역할을 가지고 있어야 함
                .antMatchers("/admin").hasRole("ADMIN")
                // 나머지 요청에 대해서는 로그인 요구 O
                .anyRequest().authenticated()

                .and()
                .formLogin()
//                .loginPage("/login")
                .successHandler(successHandler())
                .failureForwardUrl("/login")
                .permitAll()

                .and()
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/");

    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(memberService).passwordEncoder(bCryptPasswordEncoder());
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationSuccessHandler successHandler() {
        return new LoginSuccessHandler("/");
    }

}
