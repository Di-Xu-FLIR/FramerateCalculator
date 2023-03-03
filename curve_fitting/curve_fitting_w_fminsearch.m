% % Create data -- sample inverse data
% p = [3; 5]*1E-1;                            
% x  = linspace(1, 10);
% yx = y(p,x) + 0.1*(rand(size(x))-0.5);

%% Read data -- 1 curve 
filename = 'C:\Users\dxu\Documents\GitHub\FramerateCalculator\csv\BFS-U3-50S5C';
M = readtable(filename);
num_rows = 1022
start_row = 6  % cut off the 1000 flat area
X = M{start_row:num_rows, 'HEIGHT'}; % Extract input list
Y = M{start_row:num_rows, 'FPS'};    % Extract output list (framerate readout)     
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
degree = 9
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
