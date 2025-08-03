CREATE TYPE gender_opt AS ENUM ('M', 'F', 'O');
CREATE TYPE login_type_opt AS ENUM ('EMAIL_PASSWORD', 'GOOGLE');

CREATE TABLE users (
    id TEXT PRIMARY KEY DEFAULT UPPER(REPLACE(uuid_generate_v4()::TEXT, '-', '')),
    role_id TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT,
    username TEXT NOT NULL UNIQUE,
    email_id TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    gender gender_opt,
    dob DATE,
    contact_number VARCHAR(10),
    bio TEXT,
    profile_img_uri TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP,
    login_count INT DEFAULT 0,
    login_type login_type_opt,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100) DEFAULT 'SYSTEM',
    modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_by VARCHAR(100) DEFAULT 'SYSTEM',
    version INT DEFAULT 1,
    is_deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (role_id) REFERENCES user_role(id) ON DELETE CASCADE
);
