CREATE TYPE status_opt AS ENUM ('PENDING', 'RUNNING', 'COMPLETED', 'ERROR');

CREATE TABLE code_execution_job (
    id TEXT PRIMARY KEY DEFAULT UPPER(REPLACE(uuid_generate_v4()::TEXT, '-', '')),
    user_id TEXT NOT NULL,
    problem_id TEXT NOT NULL,
    submission_id TEXT NOT NULL,
    status status_opt,
    runtime_logs TEXT,
    error_logs TEXT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100) DEFAULT 'SYSTEM',
    modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_by VARCHAR(100) DEFAULT 'SYSTEM',
    version INT DEFAULT 1,
    is_deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (problem_id) REFERENCES problems(id) ON DELETE CASCADE,
    FOREIGN KEY (submission_id) REFERENCES user_submission_dtl(id) ON DELETE CASCADE
);
