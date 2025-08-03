CREATE TYPE protocol_opt as ENUM ('HTTP', 'HTTPS');

CREATE TABLE svc_config (
    id TEXT PRIMARY KEY DEFAULT UPPER(REPLACE(uuid_generate_v4()::TEXT, '-', '')),
    microservice VARCHAR(255) NOT NULL,
    environment VARCHAR(6) NOT NULL,
    protocol protocol_opt DEFAULT 'HTTP',
    port VARCHAR(6) NOT NULL,
    core BOOLEAN DEFAULT FALSE,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100) DEFAULT 'SYSTEM',
    modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_by VARCHAR(100) DEFAULT 'SYSTEM',
    version INT DEFAULT 1,
    is_deleted BOOLEAN DEFAULT FALSE
);
