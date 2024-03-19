package com.proton.controller.resources.user;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proton.models.entities.User;
import com.proton.models.repositories.UserRepository;

@RestController
@RequestMapping(value = "/check")
@CrossOrigin(origins = "http://localhost:3000")
public class Autenticacao {
    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<Void> check(@RequestBody User obj){
        System.out.println("\n\n" + obj.getUsername() + " - " + obj.getPassword() + "\n\n");
        Optional<User> userOptional = userRepository.findByUsername(obj.getUsername());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if (passwordEncoder.matches(obj.getPassword(), user.getPassword())) {
                System.out.println("\n\n" + obj.getPassword() + " - " + user.getPassword() + "\n\n");
                return ResponseEntity.ok().build();
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping(value = "/{username}")
public ResponseEntity<String> getSenha(@PathVariable String username, @RequestParam String password) {
        Optional<User> userOptional = userRepository.findByUsername(username);        
        if (userOptional.isPresent()) {
            System.out.println("\n\nRepositorio Ok\n\n");
            User user = userOptional.get();
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if (passwordEncoder.matches(password, user.getPassword())) {
                System.out.println("\n\nVálido: " + password + " - " + user.getPassword() + "\n\n");
                return ResponseEntity.ok("Senha válida");
            } else {
                System.out.println("\n\nInválido: " + password + " - " + user.getPassword() + "\n\n");
                return ResponseEntity.ok("");
            }
        }
        return ResponseEntity.notFound().build();
    }


}
