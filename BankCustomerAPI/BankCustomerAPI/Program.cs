using BankCustomerAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ✅ Use TrainingContext
builder.Services.AddDbContext<TrainingContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();
app.MapGet("/", () => "BankCustomerAPI1 is running...");
app.Run();
