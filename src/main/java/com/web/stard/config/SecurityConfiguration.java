package com.web.stard.config;

import com.web.stard.service.MemberUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private MemberUserDetailsService memberUserDetailsService;

    @Autowired
    private CsrfConfig csrfConfig;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf()
                .csrfTokenRepository(csrfConfig.csrfTokenRepository()) // CSRF 토큰 설정
                .and()
                .authorizeRequests()
                .antMatchers("/**", "/signup").permitAll();   // 모든 사용자에게 허용

                // "/signup/**"은 아래 하위 경로까지 포함
                // .antMatchers("/admin").hasRole("ADMIN")  // /admin 페이지는 ADMIN 권한이 있는 사용자만 허용

                /*.anyRequest().authenticated()   // 그 외의 모든 요청은 인증된 사용자에게만 허용
                .and()
                .formLogin()
                .loginPage("/login").permitAll()    // 로그인 페이지는 모든 사용자에게 허용(실제 로그인 페이지를 표시하는 컨트롤러로 매핑)
                .loginProcessingUrl("/signup")   // 로그인 폼을 제출할 때 사용되는 URL을 지정
                .defaultSuccessUrl("/signup") // 로그인 성공 후 기본적으로 리다이렉트할 URL
                .failureUrl("/signup")    // 로그인 실패 후 기본적으로 리다이렉트할 URL
                // .failureHandler(new CustomAuthenticationFailureHandler("/login"))    // 인증 실패 후 별도의 처리가 필요한경우 커스텀 핸들러를 생성하여 등록
                .and()
                .logout().permitAll(); // 로그아웃은 모든 사용자에게 허용
*/
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(memberUserDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // custom security configuration에서 사용할 password encoder를 BCryptPasswordEncoder로 정의
        return new BCryptPasswordEncoder();
    }
}
