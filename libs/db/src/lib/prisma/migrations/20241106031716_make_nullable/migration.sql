-- AlterTable
ALTER TABLE `MedicalChart` MODIFY `hospitalAdmissions` VARCHAR(191) NULL,
    MODIFY `immunizationRecords` VARCHAR(191) NULL,
    MODIFY `allergies` VARCHAR(191) NULL,
    MODIFY `operations` VARCHAR(191) NULL,
    MODIFY `growthDevelopmentIssues` VARCHAR(191) NULL,
    MODIFY `currentMedications` VARCHAR(191) NULL,
    MODIFY `parentConcernOfAny` VARCHAR(191) NULL;
