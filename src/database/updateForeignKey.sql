
UPDATE fixed_asset fa
SET fa.department_code = 'D0008', fa.department_name = 'Phòng thư ký'
WHERE fa.department_id = '11452b0c-768e-5ff7-0d63-eeb1d8ed8cef';

UPDATE fixed_asset fa
SET fa.department_code = 'D0007', fa.department_name = 'Phòng nghiên cứu'
WHERE fa.department_id = '142cb08f-7c31-21fa-8e90-67245e8b283e';

UPDATE fixed_asset fa
SET fa.department_code = 'D0003', fa.department_name = 'Phòng nhân sự - điều hành'
WHERE fa.department_id = '17120d02-6ab5-3e43-18cb-66948daf6128';

UPDATE fixed_asset fa
SET fa.department_code = 'D0002', fa.department_name = 'Phòng customize'
WHERE fa.department_id = '4577565a-7e3e-493a-74dd-867949feb8b5';

UPDATE fixed_asset fa
SET fa.department_code = 'D0004', fa.department_name = 'Phòng quản trị kinh doanh'
WHERE fa.department_id = '469b3ece-744a-45d5-957d-e8c757976496';

UPDATE fixed_asset fa
SET fa.department_code = 'D0005', fa.department_name = 'Phòng kế toán'
WHERE fa.department_id = '4e272fc4-7875-78d6-7d32-6a1673ffca7c';

UPDATE fixed_asset fa
SET fa.department_code = 'D0001', fa.department_name = 'Phòng doanh nghiệp'
WHERE fa.department_id = '7686595d-16d5-33b3-0080-e8e2a817c80e';

UPDATE fixed_asset fa
SET fa.department_code = 'D0009', fa.department_name = 'Phòng giáo dục'
WHERE fa.department_id = '768f8e64-7d10-20c9-967d-e8c757976496';

DELIMITER $$


UPDATE fixed_asset fa
SET fa.fixed_asset_category_code = 'LTS0006', fa.fixed_asset_category_name = 'Máy vi tính xách tay'
WHERE fa.fixed_asset_category_id = '148ed882-32b8-218e-9c20-39c2f00615e8';

UPDATE fixed_asset fa
SET fa.fixed_asset_category_code = 'LTS0007', fa.fixed_asset_category_name = 'Đồ dùng văn phòng'
WHERE fa.fixed_asset_category_id = '1b691e79-236d-5b5a-9d20-39c2f00615e8';

UPDATE fixed_asset fa
SET fa.fixed_asset_category_code = 'LTS0004', fa.fixed_asset_category_name = 'Máy tủ lạnh'
WHERE fa.fixed_asset_category_id = '25c6c36e-1668-7d10-6e09-bf1378b8dc91';

UPDATE fixed_asset fa
SET fa.fixed_asset_category_code = 'LTS0003', fa.fixed_asset_category_name = 'Quạt'
WHERE fa.fixed_asset_category_id = '354f1b13-17bf-1b52-87d5-ba100c6f7bce';

UPDATE fixed_asset fa
SET fa.fixed_asset_category_code = 'LTS0008', fa.fixed_asset_category_name = 'Đèn điện'
WHERE fa.fixed_asset_category_id = '3700cc49-55b5-69ea-4929-a2925c0f334d';

UPDATE fixed_asset fa
SET fa.fixed_asset_category_code = 'LTS0002', fa.fixed_asset_category_name = 'Máy chiếu'
WHERE fa.fixed_asset_category_id = '37dd9bb0-4c53-4134-31de-23e177779933';

UPDATE fixed_asset fa
SET fa.fixed_asset_category_code = 'LTS0005', fa.fixed_asset_category_name = 'Máy điều hoà'
WHERE fa.fixed_asset_category_id = '3b86d2ed-446c-5fce-56be-406293204378';

UPDATE fixed_asset fa
SET fa.fixed_asset_category_code = 'LTS0001', fa.fixed_asset_category_name = 'Máy lọc nước'
WHERE fa.fixed_asset_category_id = '6b47b37f-3123-3ce7-14cf-9712082ff6cb';

DELIMITER $$