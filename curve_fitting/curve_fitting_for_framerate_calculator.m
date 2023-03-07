%% Get a list of csv filenames 
% filename = 'C:\Users\dxu\Documents\GitHub\FramerateCalculator\csv\BFS-U3-50S5C';
directory = 'C:\Users\dxu\OneDrive - Teledyne Technologies Inc\Hackathon_Framerate_Calculator_2023_03\csv\';
listing = dir(directory);
num_of_files = size(listing,1)-2;
filenames = strings(num_of_files, 1);
for ind = 1:num_of_files  % Exclude '.' and '..' in the directory list
    filenames([ind]) = listing(ind+2).name;
end
% filenames

% % Define a database table file name
% output_table_filename = convertStringsToChars('./output/table.csv');
% fid = fopen('./output/table.csv','w');
% % fwrite(fid, B,'double'); 
% header = ["Model" "PixelFormat" "WIDTH" "HEIGHT" "ISP" "ADC" "BINX" "BINY" "P1" "P2" "P3"] %,"P4",P5,P6,P7,P8,P9,P10,P11,P12,P13,P14,P15,P16,P17';
% % dlmwrite(output_table_filename,header,'delimiter',',');
% dlmwrite(output_table_filename, B,  'precision','%.15f', 'delimiter',',','-append');
% save(output_table_filename, 'B', '-ascii', '-double', '-append')


%% Loop over all csv files
for file_ind = 1:length(filenames)
    %% Read data -- 1 csv, which contains 1 camera data with various settings
    % filename = 'C:\Users\dxu\OneDrive - Teledyne Technologies Inc\Hackathon_Framerate_Calculator_2023_03\csv\BFS-U3-50S5C';
    filename = directory + filenames([file_ind])
    M = readtable(filename);
    
    number_of_rows_in_1_setting = determine_number_of_rows_in_1_setting(M)
    total_rows = height(M);
    num_of_settings = total_rows/number_of_rows_in_1_setting; 
    % Iterate through all settings in a csv file
    for setting_ind = 1:num_of_settings
        start_row = 1; 
        % Curve fit 1 setting
        curve_fit_for_1_setting(M, start_row+(setting_ind-1)*number_of_rows_in_1_setting, setting_ind*number_of_rows_in_1_setting)
    end
end

function number_of_rows_in_1_setting = determine_number_of_rows_in_1_setting(M)
    max_height = M{height(M), 'HEIGHT'}; % height of last row in the csv
    min_height = M{1, 'HEIGHT'};         % height of first row in the csv
    height_increment = M{2, 'HEIGHT'}-M{1, 'HEIGHT'};  
    number_of_rows_in_1_setting = (max_height-min_height)/height_increment+1;
end

function curve_fit_for_1_setting(M, start_row, end_row)
    % Define filename
    model_temp = split(string(M{start_row, 'Model'}));
    model = model_temp(end,1);
    ADC_temp = split(string(M{start_row, 'ADC'}));
    ADC = ADC_temp(1,1);
    camera_config_name = model +"_"+string(M{start_row, 'PixelFormat'})+"_"+string(M{start_row, 'ISP'})+"_"+ADC;

    % Read data for 1 setting 
    X_temp = M{start_row:end_row, 'HEIGHT'}; % Extract input list
    Y_temp = M{start_row:end_row, 'FPS'};    % Extract output list (framerate readout)     
    start_ind = disgardClippedData(Y_temp);  % Only curve fit rows from start_ind, by disgarding the flat section (framerate saturated at 1000 fps) of the curve
    X = M{start_row+start_ind-1:end_row, 'HEIGHT'}; % Extract input list
    Y = M{start_row+start_ind-1:end_row, 'FPS'};    % Extract output list (framerate readout)    

    % figure()
    % plot(X, Y, '.b')
    % figure()
    % loglog(X, Y, '.c') % plot in logX-logY scale. If fits exponential function well, result should be a straight line

    %% Objective function
    % func = @(b,x) b(1).*exp(-b(2).*x);            % exponential function: f(x) = a^(-bx)    % y = @(b,x) b(1).*exp(-b(2).*x);  
    % func = @(b,x)b(1)./x+b(2);                    % inverse function: f(x) =  a/x + b;
    % func = @(b,x)(b(1)+b(2).*x+b(3).*x.^2+b(4).*x.^3 + b(5).*x.^4);                    % polynomial regression
    func = @(b,x) b(1).*x.^b(2);                    % power function: f(x) = ax^b    % y = @(b,x) b(1).*exp(-b(2).*x); 
    % func = @(b,x) 

    % %% Curve Fit - Custom function
    % B = lsq_curve_fit(X, Y, func);
    % % % Parse the parameters -- For inverse function f(x) = a/x+b
    % % a = B(1)
    % % b = B(2)
    % 
    % % Evaluate fit error 
    % % % Evaluate fit error at one or a few points 
    % % input_index = 1:5%length(X)  % index of the point, can be a range
    % % 
    % % y_eval = func(B, X(input_index));
    % % y_index = Y(input_index);
    % % diff_i = abs(y_index-y_eval)
    % 
    % 
    % % Evaluate and plot fit error for entire curve
    % plot_fit_error(X, Y, func, B)

    %% Polyfit - Fit polynomial to data
    degree = 16;   % This was chosen to have very small fitting error, less than 1 fps error on average
    B = polyfit(X,Y,degree);
    Y_eval = polyval(B, X);

    % Plot data and fitted curve
    figure(1)
    plot(X, Y, '.b')
    hold on
    plot(X, Y_eval, '-r')
    hold off
    grid
    title(['Curve Fitting with polyfit of degree ' int2str(degree)])
    legend('readout FPS','fitted curve')
    RMS = sqrt((1/length(X))*sum((Y_eval-Y).^2))
    annotation('textbox', [0.65, 0.7, 0.2, 0.06], 'String', "RMS = " + num2str(RMS))
    % f = polyval(B,X);
    % plot(X,Y,'.',X,f,'-')
    % legend('data','poly fit')

    figure(2)
    plot(X, abs(Y_eval-Y), '.g')
    grid
    title(['Absolute Fit Error with polyfit of degree ' int2str(degree)])
    annotation('textbox', [0.65, 0.7, 0.2, 0.06], 'String', "RMS = " + num2str(RMS))

    % save polynomial coefficients in double float precision 
    coef_filename = "./output/" + camera_config_name + ".dat";
    coef_filename_in_chars = convertStringsToChars(coef_filename) % Convert string to chars to be used as filename in save function
    % save coef_filename B -ascii -double
    save(coef_filename_in_chars, 'B', '-ascii', '-double')
    
    % Append camera setting and coefficients to one file, acted as a
    % database table

end

%% identify index of rows if FPS is 1000
function start_ind = disgardClippedData(Y)
    start_ind = 1;
    while(Y(start_ind)==1000)
        start_ind = start_ind+1;
    end
end

%% Curve fit function
function B = lsq_curve_fit(x, y, func)     
% Input x: input variable
%       func: f(x)
%       y: observed data value for input x  
% Output B: a list of values that define func

    OLS = @(b) sum((func(b,x) - y).^2);          % Ordinary Least Squares cost function
    %RNCF = @(b) norm(y - func(b,x));            % Residual Norm Cost Function
    opts = optimset('MaxFunEvals',50000, 'MaxIter',10000);
    [B, CostVal, EXITFLAG] = fminsearch(OLS, rand(2,1), opts)       % Use ‘fminsearch’ to minimise the ‘OLS’ function
    RMS = sqrt((1/length(x))*CostVal)
    
    % Plot data and fitted curve
    figure(1)
    plot(x, y, '.b')
    hold on
    plot(x, func(B,x), '-r')
    hold off
    grid
    title(['Curve Fitting with y=' func2str(func)])
    legend('readout FPS','fitted curve')
    annotation('textbox', [0.65, 0.7, 0.2, 0.06], 'String', "RMS = " + num2str(RMS))
end

%% Evaluate and plot fit error
function plot_fit_error(X, Y, func, B)
    Y_eval = func(B, X);
    figure(2)
    plot(X, abs(Y_eval-Y), '.g')
    grid
    title(['Absolute Fit Error with y=' func2str(func)])
    RMS = sqrt((1/length(X))*sum((Y_eval-Y).^2))
    annotation('textbox', [0.65, 0.7, 0.2, 0.06], 'String', "RMS = " + num2str(RMS))
end
