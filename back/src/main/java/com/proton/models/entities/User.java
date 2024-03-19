package com.proton.models.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="USERS")
@Data
public class User {

  @Id
  private String username;

  private String password;

  private String role;

}
