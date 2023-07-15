use APIbiblioteca;

DELIMITER $$
CREATE TRIGGER emprestimos_BeforeInsert BEFORE INSERT ON emprestimos
FOR EACH ROW 
BEGIN
	DECLARE quant int;
    -- Verifica a quantidade de livros
		SELECT quant_livros INTO quant FROM biblioteca_livros BT
		WHERE new.id_livro = BT.id_livro AND new.id_biblioteca = BT.id_biblioteca;
        
    -- Se possuir livros suficientes faz o emprestimo de um deles    
    IF quant > 0 then
		UPDATE biblioteca_livros
		SET quant_livros = quant_livros -1
		WHERE new.id_livro = id_livro AND new.id_biblioteca = id_biblioteca;
        
    -- Se não possuir livros suficientes retorna um erro e não inseri   		
	ELSE 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Livro não disponivel';
         
    END IF;
END $$
DELIMITER ;


DELIMITER $$
CREATE TRIGGER emprestimo_AfterDelete AFTER DELETE ON emprestimos
FOR EACH ROW 
BEGIN
	-- Após deletar um emprestimo devolve o livro emprestado para Biblioteca
	UPDATE biblioteca_livros
    SET quant_livros = quant_livros + 1
    WHERE old.id_livro = id_livro and old.id_biblioteca = id_biblioteca;
    
END $$
DELIMITER ;
