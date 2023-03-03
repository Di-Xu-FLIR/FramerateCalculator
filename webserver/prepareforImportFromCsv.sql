
DROP TYPE IF EXISTS model_enum CASCADE;
-- CREATE TYPE model_enum AS ENUM ('Blackfly S BFS-U3-27S5C', 'Blackfly S BFS-U3-32S4C', 'Blackfly S BFS-U3-50S5C');
CREATE TYPE model_enum AS ENUM ('BFS-U3-27S5C', 'BFS-U3-32S4C', 'BFS-U3-50S5C', 'BFS-U3-161S7M',
'ORX-10G-89S6M', 'BFS-U3-200S6M', 'BFS-U3-31S4C', 'ORX-10G-123S6C', 'ORX-10G-123S6M', 'ORX-10G-310S9C', 
'ORX-10G-310S9M', 'ORX-10G-32S4M', 'ORX-10G-51S5C', 'ORX-10G-51S5M', 'ORX-10G-71S7C', 'ORX-10G-89S6C');

DROP TYPE IF EXISTS pixel_format_enum CASCADE;
CREATE TYPE pixel_format_enum AS ENUM ('Mono8', 'Mono16', 'RGB8Packed', 'BayerRG8', 'BayerRG16', 'Mono10Packed', 
'BayerRG10Packed', 'Mono12Packed', 'BayerRG12Packed', 'YUV411Packed', 'YUV422Packed', 
'YUV444Packed', 'Mono10p', 'BayerRG10p', 'Mono12p', 'BayerRG12p', 'YCbCr8', 'YCbCr422_8', 
'YCbCr411_8', 'BGR8', 'BGRa8', 'LLCBayerRG8');

DROP TYPE IF EXISTS isp_format_enum CASCADE;
CREATE TYPE isp_format_enum AS ENUM ('OFF', 'ON');

DROP TYPE IF EXISTS adc_enum CASCADE;
CREATE TYPE adc_enum AS ENUM ('8 Bit', '10 Bit', '12 Bit');

DROP TYPE IF EXISTS bin_selector_enum CASCADE;
CREATE TYPE bin_selector_enum AS ENUM ('sensor', 'isp');

DROP TYPE IF EXISTS bin_x_enum CASCADE;
CREATE TYPE bin_x_enum AS ENUM ('1', '2', '3', '4');

DROP TYPE IF EXISTS bin_y_enum CASCADE;
CREATE TYPE bin_y_enum AS ENUM ('1', '2', '3', '4');

DROP TYPE IF EXISTS bin_mode_x_enum CASCADE;
CREATE TYPE bin_mode_x_enum AS ENUM ('additive', 'average');

DROP TYPE IF EXISTS bin_mode_y_enum CASCADE;
CREATE TYPE bin_mode_y_enum AS ENUM ('additive', 'average');

-- --------------------------------------------------------------

DROP TABLE IF EXISTS camera_settings;
CREATE TABLE camera_settings (
  id SERIAL PRIMARY KEY,
  model model_enum NOT NULL,
  pixel_format pixel_format_enum NOT NULL,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  isp isp_format_enum DEFAULT 'OFF',
  adc adc_enum NOT NULL,
  bin_selector bin_selector_enum DEFAULT 'isp',
  bin_x bin_x_enum DEFAULT '1',
  bin_y bin_y_enum DEFAULT '1',
  bin_mode_x bin_mode_x_enum DEFAULT 'average',
  bin_mode_y bin_mode_y_enum DEFAULT 'average',
  frame_rate DOUBLE PRECISION NOT NULL
);

DROP TABLE IF EXISTS temp_table;
-- CREATE TEMPORARY TABLE temp_table (
CREATE TABLE temp_table (
  id SERIAL PRIMARY KEY,
  model model_enum NOT NULL,
  pixel_format pixel_format_enum NOT NULL,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  isp isp_format_enum NOT NULL,
  adc adc_enum NOT NULL,
  bin_x bin_x_enum NOT NULL,
  bin_y bin_y_enum NOT NULL,
  frame_rate DOUBLE PRECISION NOT NULL
);


DELETE FROM camera_settings;

