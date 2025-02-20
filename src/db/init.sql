DROP TABLE IF EXISTS skills, rto_courses, courses, rtos CASCADE;

CREATE TABLE rtos (
    id SERIAL PRIMARY KEY,
    tga_code VARCHAR(10) UNIQUE,
    name VARCHAR(255) NOT NULL,
    location TEXT,
    phone VARCHAR(50),
    email VARCHAR(255),
    registration_status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    tga_code VARCHAR(50) UNIQUE,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50),
    level VARCHAR(50),
    duration VARCHAR(100),
    cost_range VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rto_courses (
    rto_id INTEGER REFERENCES rtos(id),
    course_id INTEGER REFERENCES courses(id),
    start_date DATE,
    price DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (rto_id, course_id)
);

CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    average_salary INTEGER,
    qualification_time VARCHAR(100),
    course_cost VARCHAR(100),
    demand_level VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);