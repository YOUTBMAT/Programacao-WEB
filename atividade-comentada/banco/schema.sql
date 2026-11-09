-- ============================================================
-- schema.sql  —  banco de dados da atividade (Mural da Turma)
-- Rode este script no MySQL ANTES de abrir o site.
-- ============================================================

CREATE DATABASE IF NOT EXISTS mural CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mural;

CREATE TABLE IF NOT EXISTS recados (
    id        INT AUTO_INCREMENT PRIMARY KEY,   -- identificador único de cada recado
    autor     VARCHAR(80)  NOT NULL,            -- quem escreveu
    mensagem  VARCHAR(255) NOT NULL,            -- o recado em si
    ativo     TINYINT      NOT NULL DEFAULT 1,  -- 1 = visível, 0 = "excluído" (soft delete)
    criado_em TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- Alguns registros de exemplo, para a tela não começar vazia:
INSERT INTO recados (autor, mensagem) VALUES
    ('Professor', 'Bem-vindos ao mural da turma!'),
    ('Ana', 'Bom dia, pessoal.');
