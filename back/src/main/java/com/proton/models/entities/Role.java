package com.proton.models.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "ROLES")
public class Role {
    
    @Id
    private String roleName;

    public Role(String roleName) {
        this.roleName = roleName;
    }
}

