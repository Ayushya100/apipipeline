CREATE TYPE category_type_opt AS ENUM ('toggle', 'text', 'multiselect', 'singleselect');

CREATE TABLE dashboard_setup (
    id TEXT PRIMARY KEY DEFAULT UPPER(REPLACE(uuid_generate_v4()::TEXT, '-', '')),
    header_id TEXT NOT NULL,
    category_cd VARCHAR(50) NOT NULL UNIQUE,
    category_name TEXT NOT NULL,
    user_applicable BOOLEAN DEFAULT TRUE,
    category_type category_type_opt NOT NULL,
    options TEXT[],
    value TEXT NOT NULL,
    core BOOLEAN DEFAULT FALSE,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100) DEFAULT 'SYSTEM',
    modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_by VARCHAR(100) DEFAULT 'SYSTEM',
    version INT DEFAULT 1,
    is_deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (header_id) REFERENCES dashboard_setup_header(id) ON DELETE CASCADE
);
