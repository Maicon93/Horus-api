-- Inserindo registros na tabela person
INSERT INTO person (name, email, password, cpf_cnpj, phone, adress, city, state, active)
VALUES
('João Silva', 'joao.silva@example.com', 'senha123', '12345678901', '11987654321', 'Rua das Flores, 123', 'São Paulo', 'SP', TRUE),
('Maria Oliveira', 'maria.oliveira@example.com', 'senha456', '98765432100', '21987654321', 'Avenida Central, 456', 'Rio de Janeiro', 'RJ', TRUE),
('Carlos Pereira', 'carlos.pereira@example.com', 'senha789', '11122233344', '31987654321', 'Rua das Acácias, 789', 'Belo Horizonte', 'MG', TRUE),
('Ana Souza', 'ana.souza@example.com', 'senha101', '55566677788', '11912345678', 'Praça da Liberdade, 101', 'Salvador', 'BA', TRUE),
('Beatriz Santos', 'beatriz.santos@example.com', 'senha202', '99988877766', '71987654321', 'Avenida Atlântica, 202', 'Florianópolis', 'SC', TRUE);

-- Inserindo registros na tabela course
INSERT INTO course (name, id_coordinator)
VALUES
('Direito', 3),
('Ciências Contábeis', 4),
('Sistemas da Informação', 5);

-- Inserindo registros na tabela notices
INSERT INTO notices (title, subtitle, text, image_name, id_course, highlighted)
VALUES
('Seminário de Direito Civil', 'Vagas Limitadas', 'Inscreva-se para o nosso seminário de Direito Civil que acontecerá no próximo mês.', 'https://example.com/image3.jpg', 1, FALSE),
('Workshop de Contabilidade', 'Curso Rápido', 'Um workshop prático sobre as novas regras de contabilidade.', 'https://example.com/image4.jpg', 2, FALSE),
('Hackathon de Sistemas da Informação', 'Competição de 24 horas', 'Junte-se ao nosso hackathon e mostre suas habilidades em desenvolvimento de sistemas.', 'https://example.com/image5.jpg', 3, TRUE),
('Palestra sobre Inteligência Artificial', 'Evento Gratuito', 'Participe da nossa palestra sobre IA com especialistas da área.', 'https://example.com/image6.jpg', 2, FALSE),
('Nova Turma de Sistemas da Informação', 'Início em 2025', 'Estamos abrindo uma nova turma de Sistemas da Informação para o próximo ano.', 'https://example.com/image7.jpg', 3, TRUE);


