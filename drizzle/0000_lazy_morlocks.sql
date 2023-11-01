CREATE TABLE `cursoPersona` (
	`id` varchar(36) NOT NULL,
	`id_curso` varchar(36) NOT NULL,
	`id_persona` varchar(36) NOT NULL,
	`categoria` varchar(3),
	CONSTRAINT `cursoPersona_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `curso` (
	`id` varchar(36) NOT NULL,
	`nombre` varchar(100),
	`descripcion` text,
	CONSTRAINT `curso_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notas` (
	`id` varchar(36) NOT NULL,
	`id_persona` varchar(36) NOT NULL,
	`id_curso` varchar(36) NOT NULL,
	CONSTRAINT `notas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `personas` (
	`id` varchar(36) NOT NULL,
	`nombres` varchar(100),
	`dni` varchar(8),
	`hash` varchar(256),
	CONSTRAINT `personas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `cursoPersona` ADD CONSTRAINT `cursoPersona_id_curso_curso_id_fk` FOREIGN KEY (`id_curso`) REFERENCES `curso`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `cursoPersona` ADD CONSTRAINT `cursoPersona_id_persona_personas_id_fk` FOREIGN KEY (`id_persona`) REFERENCES `personas`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notas` ADD CONSTRAINT `notas_id_persona_personas_id_fk` FOREIGN KEY (`id_persona`) REFERENCES `personas`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notas` ADD CONSTRAINT `notas_id_curso_curso_id_fk` FOREIGN KEY (`id_curso`) REFERENCES `curso`(`id`) ON DELETE no action ON UPDATE no action;