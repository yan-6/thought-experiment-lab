Table 'employees' schema in database 'remote_preset'.
---
CREATE TABLE `employees` (
  `department` text COLLATE utf8mb4_unicode_ci,
  `department_en` text COLLATE utf8mb4_unicode_ci,
  `hire_date` text COLLATE utf8mb4_unicode_ci,
  `id` bigint DEFAULT NULL,
  `name` text COLLATE utf8mb4_unicode_ci,
  `name_en` text COLLATE utf8mb4_unicode_ci,
  `position` text COLLATE utf8mb4_unicode_ci,
  `salary` double DEFAULT NULL,
  `status` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci