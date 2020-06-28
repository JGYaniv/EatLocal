CREATE TABLE "public"."LocationType"(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE "public"."Location"(
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    content TEXT,
    published BOOLEAN NOT NULL DEFAULT false,
    "locationTypeId" INTEGER NOT NULL,
    FOREIGN KEY ("locationTypeId") REFERENCES "public"."LocationType"(id)
);