
\set ON_ERROR_STOP on

-- --------------------------------------------------------------
-- import from BFS-U3-27S5C

-- clean the temp_table
DELETE FROM temp_table;

COPY temp_table (model, pixel_format, width, height, isp, adc, bin_x, bin_y, frame_rate) 
FROM :'filename'
WITH (FORMAT csv, HEADER true);

-- Insert from temp_table to camera_settings
INSERT INTO camera_settings (model, pixel_format, width, height, isp, adc, bin_x, bin_y, frame_rate)
SELECT model, pixel_format, width, height, isp, adc, bin_x, bin_y, frame_rate FROM temp_table;

select count(1) from camera_settings;

