// INTERFACE DO ENDEREÇO QUE EXTENDE O JPA REPOSITORY PARA ACESSAR OS METODOS DO JPA REPOSITORY
// ESSA INTERFACE É USADA PARA ACESSAR OS DADOS DO BANCO DE DADOS

package com.proton.models.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proton.models.entities.Endereco;

public interface EnderecoRepository extends JpaRepository<Endereco, Integer> {
    
}
