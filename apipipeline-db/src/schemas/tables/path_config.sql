CREATE TYPE method_opt AS ENUM ('GET', 'PUT', 'POST', 'DELETE');

CREATE TABLE path_config (
    id TEXT PRIMARY KEY DEFAULT UPPER(REPLACE(uuid_generate_v4()::TEXT, '-', '')),
    svc_id TEXT NOT NULL,
    path TEXT NOT NULL,
    method method_opt,
    validations TEXT[],
    metadata TEXT,
    core BOOLEAN DEFAULT FALSE,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100) DEFAULT 'SYSTEM',
    modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_by VARCHAR(100) DEFAULT 'SYSTEM',
    version INT DEFAULT 1,
    is_deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (svc_id) REFERENCES svc_config(id) ON DELETE CASCADE
);
