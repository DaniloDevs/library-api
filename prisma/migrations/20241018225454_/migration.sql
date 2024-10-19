-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "classRoom" TEXT NOT NULL,
    "wallet" INTEGER NOT NULL,
    "favoriteBooksId" TEXT,
    "registration" TEXT NOT NULL,
    "usersId" TEXT NOT NULL,
    CONSTRAINT "student_favoriteBooksId_fkey" FOREIGN KEY ("favoriteBooksId") REFERENCES "favorite_book" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "student_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_student" ("classRoom", "favoriteBooksId", "id", "registration", "usersId", "wallet") SELECT "classRoom", "favoriteBooksId", "id", "registration", "usersId", "wallet" FROM "student";
DROP TABLE "student";
ALTER TABLE "new_student" RENAME TO "student";
CREATE UNIQUE INDEX "student_registration_key" ON "student"("registration");
CREATE TABLE "new_teacher" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teacherType" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "usersId" TEXT NOT NULL,
    CONSTRAINT "teacher_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_teacher" ("cpf", "id", "teacherType", "usersId") SELECT "cpf", "id", "teacherType", "usersId" FROM "teacher";
DROP TABLE "teacher";
ALTER TABLE "new_teacher" RENAME TO "teacher";
CREATE UNIQUE INDEX "teacher_cpf_key" ON "teacher"("cpf");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
