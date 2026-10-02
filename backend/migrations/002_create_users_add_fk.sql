CREATE TABLE users (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(100)  NOT NULL,
    email      VARCHAR(200)  NOT NULL UNIQUE,
    created_at TIMESTAMP     NOT NULL DEFAULT NOW()
);

ALTER TABLE events
    ADD COLUMN organizer_id INTEGER NOT NULL DEFAULT 1 REFERENCES users(id);
