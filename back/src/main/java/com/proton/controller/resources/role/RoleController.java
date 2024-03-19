package com.proton.controller.resources.role;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proton.models.entities.Role;

@RestController
@RequestMapping("/roles")
public class RoleController {

    @Autowired
    private com.proton.services.role.RoleService roleService;

    @PostMapping
    public Role createRole(@RequestBody Role role) {
        return roleService.saveRole(role);
    }

    @GetMapping("/{roleName}")
    public Role getRole(@PathVariable String roleName) {
        return roleService.getRole(roleName);
    }
}
