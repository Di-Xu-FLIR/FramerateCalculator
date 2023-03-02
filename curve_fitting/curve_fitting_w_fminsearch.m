p = [3; 5]*1E-1;                            % Create data
x  = linspace(1, 10);
yx = y(p,x) + 0.1*(rand(size(x))-0.5);

y = @(b,x)b(1)./x+b(2);                     % Objective function  -- exponential function: y = @(b,x) b(1).*exp(-b(2).*x);  
OLS = @(b) sum((y(b,x) - yx).^2);          % Ordinary Least Squares cost function
opts = optimset('MaxFunEvals',50000, 'MaxIter',10000);
B = fminsearch(OLS, rand(2,1), opts)       % Use ‘fminsearch’ to minimise the ‘OLS’ function
figure(1)
plot(x, yx, '*b')
hold on
plot(x, y(B,x), '-r')
hold off
grid

filename = 'C:\Users\dxu\Documents\GitHub\FramerateCalculator\csv\BFS-U3-50S5C.csv';
M = csvread(filename);
