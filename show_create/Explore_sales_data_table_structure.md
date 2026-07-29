Table 'sales_data' schema in database 'remote_preset'.
---
CREATE TABLE `sales_data` (
  `transaction_id` text COLLATE utf8mb4_unicode_ci,
  `customer_id` text COLLATE utf8mb4_unicode_ci,
  `product_category` text COLLATE utf8mb4_unicode_ci,
  `product_name` text COLLATE utf8mb4_unicode_ci,
  `quantity` text COLLATE utf8mb4_unicode_ci,
  `unit_price` text COLLATE utf8mb4_unicode_ci,
  `discount_percent` text COLLATE utf8mb4_unicode_ci,
  `payment_method` text COLLATE utf8mb4_unicode_ci,
  `customer_age` text COLLATE utf8mb4_unicode_ci,
  `customer_gender` text COLLATE utf8mb4_unicode_ci,
  `region` text COLLATE utf8mb4_unicode_ci,
  `store_type` text COLLATE utf8mb4_unicode_ci,
  `season` text COLLATE utf8mb4_unicode_ci,
  `total_price` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci