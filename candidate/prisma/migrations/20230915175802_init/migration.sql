-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('BACKEND', 'FRONTEND', 'FULLSTACK', 'MOBILE_DEVELOPER', 'ANDROID_DEVELOPER', 'IOS_DEVELOPER', 'TEACH_LEAD', 'PRODUCT_MANAGER', 'ARCHITECT', 'QA', 'TESTER', 'DEVOPS', 'CLOUD_ARCHITECT', 'BUSSIENSS_ANALYST', 'DATA_ANALYST', 'IOT', 'DATA_SCIENTIST', 'AI_PROGRAMMER', 'BLOCKCHAIN_DEVELOPER', 'SCRUM_MASTER', 'SECURITY_ANALYST', 'CYBERSECURITY_ENGINEER', 'SOFTWARE_ENGINEER', 'PEN_TESTER', 'UX_UI_DESIGNER', 'GRAPHIC_DESIGNER');

-- CreateEnum
CREATE TYPE "TEST" AS ENUM ('TECHNICAL', 'PSYCHOLOGICAL');

-- CreateEnum
CREATE TYPE "EMPLOYMENT" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'SELF_EMPLOYED', 'FREELANCE', 'APPRENTICESHIP', 'SEASONAL');

-- CreateEnum
CREATE TYPE "SIZE" AS ENUM ('SMALL_BUSINESS', 'MEDIUM', 'BIG', 'STARTUP');

-- CreateEnum
CREATE TYPE "GRADE" AS ENUM ('COLLEGE', 'BACHELOR', 'MASTER', 'PHD');

-- CreateEnum
CREATE TYPE "LOCATION" AS ENUM ('REMOTE', 'ONSITE', 'HYBRID');

-- CreateEnum
CREATE TYPE "DIFFICULTY" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateTable
CREATE TABLE "Education" (
    "id" SERIAL NOT NULL,
    "school" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "fieldOfStudy" TEXT NOT NULL,
    "startData" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endData" TIMESTAMP(3),
    "grade" "GRADE" NOT NULL,
    "academicalDataId" INTEGER,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Result" (
    "id" SERIAL NOT NULL,
    "technicalScore" INTEGER NOT NULL,
    "psychologicalScore" INTEGER NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certification" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "issuingOrganization" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "credentialID" TEXT NOT NULL,
    "credentialURL" TEXT NOT NULL,
    "academicalDataId" INTEGER,

    CONSTRAINT "Certification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademicalData" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "AcademicalData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "statement" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "wrongAnswer" TEXT[],
    "difficulty" "DIFFICULTY" NOT NULL,
    "points" INTEGER NOT NULL,
    "testId" INTEGER,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "employmentType" "EMPLOYMENT" NOT NULL,
    "companyName" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,
    "locationType" "LOCATION" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "role" "ROLE" NOT NULL,
    "activities" TEXT[],
    "workDataId" INTEGER,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkProject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "workDataId" INTEGER,

    CONSTRAINT "WorkProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkData" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "WorkData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnicalData" (
    "id" SERIAL NOT NULL,
    "techSkills" TEXT[],
    "progammingLenguages" TEXT[],
    "roles" "ROLE"[],
    "yearOfExperience" INTEGER NOT NULL,

    CONSTRAINT "TechnicalData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "size" "SIZE" NOT NULL,
    "prefferedLenguage" TEXT NOT NULL,
    "bussinesSegments" TEXT[],
    "mainContactId" INTEGER NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER,
    "price" BIGINT NOT NULL,
    "budget" BIGINT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "registeredWorkHours" DOUBLE PRECISION NOT NULL,
    "stakeholders" TEXT[],
    "technicalDataId" INTEGER NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "addressId" INTEGER NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "preferredLenguage" TEXT NOT NULL,
    "isAdministrator" BOOLEAN NOT NULL,
    "testId" INTEGER,
    "projectId" INTEGER,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Candidate" (
    "personId" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "lenguages" TEXT[],
    "academicalDataId" INTEGER,
    "technicalDataId" INTEGER,
    "workDataId" INTEGER,
    "isAvailable" BOOLEAN NOT NULL,
    "softSkills" TEXT[],
    "interviewId" INTEGER,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("personId")
);

-- CreateTable
CREATE TABLE "Interview" (
    "id" SERIAL NOT NULL,
    "scheduledDate" TIMESTAMP(3) NOT NULL,
    "resultId" INTEGER NOT NULL,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Test" (
    "id" SERIAL NOT NULL,
    "type" "TEST" NOT NULL,
    "resultId" INTEGER NOT NULL,
    "isIndividualTest" BOOLEAN NOT NULL,
    "isFinished" BOOLEAN NOT NULL,
    "wasSupplanted" BOOLEAN NOT NULL,
    "minutesDuration" INTEGER NOT NULL,
    "interviewId" INTEGER NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AddressToCompany" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_interviewId_key" ON "Candidate"("interviewId");

-- CreateIndex
CREATE UNIQUE INDEX "Test_interviewId_key" ON "Test"("interviewId");

-- CreateIndex
CREATE UNIQUE INDEX "_AddressToCompany_AB_unique" ON "_AddressToCompany"("A", "B");

-- CreateIndex
CREATE INDEX "_AddressToCompany_B_index" ON "_AddressToCompany"("B");

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_academicalDataId_fkey" FOREIGN KEY ("academicalDataId") REFERENCES "AcademicalData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_academicalDataId_fkey" FOREIGN KEY ("academicalDataId") REFERENCES "AcademicalData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_workDataId_fkey" FOREIGN KEY ("workDataId") REFERENCES "WorkData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkProject" ADD CONSTRAINT "WorkProject_workDataId_fkey" FOREIGN KEY ("workDataId") REFERENCES "WorkData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_mainContactId_fkey" FOREIGN KEY ("mainContactId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_technicalDataId_fkey" FOREIGN KEY ("technicalDataId") REFERENCES "TechnicalData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_academicalDataId_fkey" FOREIGN KEY ("academicalDataId") REFERENCES "AcademicalData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_technicalDataId_fkey" FOREIGN KEY ("technicalDataId") REFERENCES "TechnicalData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_workDataId_fkey" FOREIGN KEY ("workDataId") REFERENCES "WorkData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToCompany" ADD CONSTRAINT "_AddressToCompany_A_fkey" FOREIGN KEY ("A") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToCompany" ADD CONSTRAINT "_AddressToCompany_B_fkey" FOREIGN KEY ("B") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
