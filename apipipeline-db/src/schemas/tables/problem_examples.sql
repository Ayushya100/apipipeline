CREATE TYPE type_opt AS ENUM ('string', 'json', 'array');

CREATE TABLE problem_examples (
    id TEXT PRIMARY KEY DEFAULT UPPER(REPLACE(uuid_generate_v4()::TEXT, '-', '')),
    problem_id TEXT NOT NULL,
    input_type type_opt DEFAULT 'string',
    output_type type_opt DEFAULT 'string',
    input TEXT NOT NULL,
    output TEXT NOT NULL,
    explanation TEXT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100) DEFAULT 'SYSTEM',
    modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_by VARCHAR(100) DEFAULT 'SYSTEM',
    version INT DEFAULT 1,
    is_deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (problem_id) REFERENCES problems(id) ON DELETE CASCADE
);
