package com.web.stard.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Table
@ToString
@NoArgsConstructor(force = true)
@AllArgsConstructor
@Getter @Setter @Builder @EqualsAndHashCode
@IdClass(AssigneeId.class)
public class Assignee {
    @Id @ManyToOne
    @JoinColumn(name = "to_do_id")
    private ToDo toDo; // TO DO

    @Id @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member; // 담당자

    @Column(name = "to_do_status")
    private boolean toDoStatus; // TO DO 상태 (false 미완료, true 완료)
}
