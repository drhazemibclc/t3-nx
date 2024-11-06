-- CreateTable
CREATE TABLE `User` (
    `username` VARCHAR(191) NOT NULL,
    `password` TEXT NOT NULL,

    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Patient` (
    `id` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `birthDate` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,
    `nutritionalStatus` ENUM('NORMAL', 'WASTING', 'STUNTING', 'UNDERWEIGHT', 'OBESE') NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `mobileNumber` VARCHAR(191) NOT NULL,
    `telephoneNumber` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FamilyHistory` (
    `patientId` VARCHAR(191) NOT NULL,
    `heartDisease` BOOLEAN NOT NULL,
    `geniticDisorder` BOOLEAN NOT NULL,
    `diabetes` BOOLEAN NOT NULL,
    `allergiesAndAsthma` BOOLEAN NOT NULL,
    `cancerHistory` BOOLEAN NOT NULL,
    `siblingsConditions` BOOLEAN NOT NULL,
    `developmentalDisorders` BOOLEAN NOT NULL,
    `gastricCondition` BOOLEAN NOT NULL,
    `pastMedicalTreatments` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`patientId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MedicalChart` (
    `patientId` VARCHAR(191) NOT NULL,
    `birthComplications` VARCHAR(191) NOT NULL,
    `hospitalAdmissions` VARCHAR(191) NOT NULL,
    `immunizationRecords` VARCHAR(191) NOT NULL,
    `allergies` VARCHAR(191) NOT NULL,
    `operations` VARCHAR(191) NOT NULL,
    `growthDevelopmentIssues` VARCHAR(191) NOT NULL,
    `congenitalDisorders` BOOLEAN NOT NULL,
    `respiratoryConditions` BOOLEAN NOT NULL,
    `cardiacConditions` BOOLEAN NOT NULL,
    `neurologicalIssues` BOOLEAN NOT NULL,
    `gastrointestinalIssues` BOOLEAN NOT NULL,
    `skinConditions` BOOLEAN NOT NULL,
    `headache` BOOLEAN NOT NULL,
    `fever` BOOLEAN NOT NULL,
    `currentMedications` VARCHAR(191) NOT NULL,
    `breastfeeding` BOOLEAN NOT NULL,
    `behaviorconcerns` BOOLEAN NOT NULL,
    `parentConcernOfAny` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`patientId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Treatment` (
    `id` VARCHAR(191) NOT NULL,
    `patientId` VARCHAR(191) NOT NULL,
    `service` VARCHAR(191) NOT NULL,
    `serviceDate` VARCHAR(191) NOT NULL,
    `prescription` TEXT NOT NULL,

    INDEX `Treatment_patientId_idx`(`patientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
