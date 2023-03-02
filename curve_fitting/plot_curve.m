x = linspace (0,10,100);
plot(1./x)
figure
plot_inverse(x, 1, 1)

function plot_inverse(x, a, b)
    plot(a./x+b)
end