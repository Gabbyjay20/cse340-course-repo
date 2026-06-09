DROP TABLE IF EXISTS project_category;
DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS organization;

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date DATE NOT NULL,

    FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
);

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    PRIMARY KEY (project_id, category_id),

    FOREIGN KEY (project_id)
        REFERENCES project(project_id),

    FOREIGN KEY (category_id)
        REFERENCES category(category_id)
);

INSERT INTO organization (
    name,
    description,
    contact_email,
    logo_filename
)
VALUES
(
    'BrightFuture Builders',
    'Community construction nonprofit',
    'info@brightfuture.org',
    'brightfuture.png'
),
(
    'GreenHarvest Growers',
    'Urban farming organization',
    'contact@greenharvest.org',
    'greenharvest.png'
),
(
    'UnityServe Volunteers',
    'Volunteer coordination group',
    'hello@unityserve.org',
    'unityserve.png'
);

INSERT INTO project (
    organization_id,
    title,
    description,
    location,
    project_date
)
VALUES
(
    1,
    'Park Cleanup',
    'Cleaning local parks',
    'Boise',
    '2026-05-20'
),
(
    1,
    'Food Drive',
    'Collecting food donations',
    'Rexburg',
    '2026-05-25'
),
(
    2,
    'Community Garden',
    'Building a community garden',
    'Idaho Falls',
    '2026-06-01'
),
(
    2,
    'Tutoring Program',
    'Helping students after school',
    'Pocatello',
    '2026-06-10'
),
(
    3,
    'Health Fair',
    'Community wellness event',
    'Boise',
    '2026-06-15'
);

INSERT INTO category (name)
VALUES
('Environmental'),
('Educational'),
('Community Service'),
('Health and Wellness');

INSERT INTO project_category (
    project_id,
    category_id
)
VALUES
(1, 1),
(2, 3),
(3, 1),
(4, 2),
(5, 4);

CREATE TABLE IF NOT EXISTS app_user (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user'
);