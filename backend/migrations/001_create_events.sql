CREATE TABLE events (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(200)  NOT NULL,
    description TEXT,
    location    VARCHAR(200)  NOT NULL,
    date        TIMESTAMP     NOT NULL,
    capacity    INTEGER       NOT NULL CHECK (capacity > 0),
    created_at  TIMESTAMP     NOT NULL DEFAULT NOW()
);
