public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // Dans la méthode ConfigureServices de Startup.cs
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddCors(options =>
    {
        options.AddPolicy("AllowAll",
            builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyHeader()
                       .AllowAnyMethod();
            });
    });

        // Autres configurations...
    }

    // Dans la méthode Configure de Startup.cs
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        else
        {
            app.UseExceptionHandler("/Home/Error");
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseCors("AllowAll"); // Placez ceci avant app.UseMvc

        app.UseMvc(routes =>
        {
            routes.MapRoute(
                name: "default",
                template: "{controller=Home}/{action=Index}/{id?}");
        });
    }
}
