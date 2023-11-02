ALTER TABLE `personas` ADD `email` varchar(256);--> statement-breakpoint
ALTER TABLE `personas` ADD CONSTRAINT `personas_dni_unique` UNIQUE(`dni`);