CREATE TYPE difficulty_opt AS ENUM ('Easy', 'Medium', 'Hard');

CREATE TABLE problems (
    id TEXT PRIMARY KEY DEFAULT UPPER(REPLACE(uuid_generate_v4()::TEXT, '-', '')),
    type_id TEXT NOT NULL,
    problem_cd INTEGER NOT NULL UNIQUE,
    problem_title TEXT NOT NULL,
    problem_desc TEXT NOT NULL,
    input_format TEXT,
    output_format TEXT,
    constraints TEXT[],
    other_info TEXT[],
    difficulty difficulty_opt,
    approved BOOLEAN DEFAULT FALSE,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100) DEFAULT 'SYSTEM',
    modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_by VARCHAR(100) DEFAULT 'SYSTEM',
    version INT DEFAULT 1,
    is_deleted BOOLEAN DEFAULT FALSE,
    FOREIGN key (type_id) REFERENCES problem_type(id) ON DELETE CASCADE
);
