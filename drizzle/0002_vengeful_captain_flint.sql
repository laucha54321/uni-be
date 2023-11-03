ALTER TABLE `personas` MODIFY COLUMN `nombres` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `personas` MODIFY COLUMN `dni` varchar(8) NOT NULL;--> statement-breakpoint
ALTER TABLE `personas` MODIFY COLUMN `hash` varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE `personas` MODIFY COLUMN `email` varchar(256) NOT NULL;