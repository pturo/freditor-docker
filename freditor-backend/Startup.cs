using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using FreditorBackend.Models.AppSettingsTool;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using FreditorBackend.Repository.AuthRepository;
using FreditorBackend.Models.UserModel;
using FreditorBackend.Models.HelperModel;
using FreditorBackend.Repository.TaskRepository;
using FreditorBackend.Repository.NoteRepository;
using Microsoft.OpenApi.Models;
using FreditorBackend.Repository.ArchiveRepository;

namespace FreditorBackend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("EnableCORS", builder =>
                {
                    builder.AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowAnyOrigin();
                });
            });
            services.AddControllers();

            // Add services to the DI container
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));

            // Add automapper
            services.AddAutoMapper(typeof(AutoMapperProfile));

            // Add scope for auth repo
            services.AddScoped<IAuthRepository, AuthRepository>();

            // Add scope for task repo
            services.AddScoped<ITaskRepository, TaskRepository>();

            // Add scope for note repo
            services.AddScoped<INoteRepository, NoteRepository>();

            // Add scope for archive repo
            services.AddScoped<IArchiveRepository, ArchiveRepository>();

            // Add mvc
            services.AddMvc(x => x.EnableEndpointRouting = false);

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,

                        ValidIssuer = "https://localhost:44335",
                        ValidAudience = "https://localhost:44335",
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("IHeardItThrough0")),
                        ClockSkew = System.TimeSpan.Zero
                    };
                });

            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "FreditorBackend API",
                    Version = "v1",
                    Description = "FreditorBackend API allows to run basic HTTP queries like GET, POST, PUT & DELETE."
                });

                var securitySchema = new OpenApiSecurityScheme
                {             
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "JSON Web Token based security.",
                };

                var securityReq = new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] {}
                    }
                };

                options.AddSecurityDefinition("Bearer", securitySchema);
                options.AddSecurityRequirement(securityReq);
           
            });

            services.AddDbContext<DatabaseContext>(options =>
            {
                //options.UseSqlServer(Configuration.GetConnectionString("DevConnection"), x => x.MigrationsAssembly("FreditorBackend"));
                options.UseSqlServer("Data Source=localhost,1433;Initial Catalog=FreditorDB;Persist Security Info=True;User ID=sa;Password=usertest@12;TrustServerCertificate=True", x => x.MigrationsAssembly("FreditorBackend"));
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DatabaseContext context)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(options =>
                {
                    options.SwaggerEndpoint("/swagger/v1/swagger.json", "FreditorBackend");
                    options.InjectStylesheet("/css/SwaggerDarkTheme.css");
                    options.RoutePrefix = string.Empty;
                });
            }
            else if (env.IsProduction())
            {
                app.UseSwagger();
                app.UseSwaggerUI(options =>
                {
                    options.SwaggerEndpoint("/swagger/v1/swagger.json", "FreditorBackend");
                    options.InjectStylesheet("/css/SwaggerDarkTheme.css");
                    options.RoutePrefix = string.Empty;
                });
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            // Database migration
            context.Database.Migrate();

            app.UseCors("EnableCORS");

            app.UseStatusCodePages();
            app.UseHttpsRedirection();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseCookiePolicy();

            app.UseHttpsRedirection();
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseMvc(routes => 
            {
                routes.MapRoute(name: "default", template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
