using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text.Json.Serialization;

[ApiController]
[Route("[controller]")]
public class GitHubAuthController : ControllerBase
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public GitHubAuthController(IConfiguration configuration)
    {
        _httpClient = new HttpClient();
        _configuration = configuration;
    }

    [HttpGet("callback")]
    public async Task<IActionResult> GitHubCallback([FromQuery] string code)
    {
        if (string.IsNullOrEmpty(code))
        {
            return BadRequest("No se recibió el código de autorización.");
        }

        // Obtener tus credenciales de la configuración (appsettings.json)
        var clientId = _configuration["GitHub:ClientId"];
        var clientSecret = _configuration["GitHub:ClientSecret"];

        // 1. Intercambiar el código temporal por un token de acceso
        var tokenUrl = "https://github.com/login/oauth/access_token";
        var tokenRequestContent = new FormUrlEncodedContent(new Dictionary<string, string>
        {
            {"client_id", clientId},
            {"client_secret", clientSecret},
            {"code", code},
        });

        _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        var tokenResponse = await _httpClient.PostAsync(tokenUrl, tokenRequestContent);

        tokenResponse.EnsureSuccessStatusCode();

        var tokenResponseBody = await tokenResponse.Content.ReadAsStringAsync();
        var tokenData = JsonSerializer.Deserialize<GitHubTokenResponse>(tokenResponseBody);

        if (string.IsNullOrEmpty(tokenData?.AccessToken))
        {
            return Unauthorized("Error al obtener el token de acceso.");
        }

        var accessToken = tokenData.AccessToken;

        // 2. Usar el token para obtener la información del usuario
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
        _httpClient.DefaultRequestHeaders.UserAgent.Add(new ProductInfoHeaderValue("YourAppName", "1.0")); // User-Agent es requerido por la API de GitHub

        var userUrl = "https://api.github.com/user";
        var userResponse = await _httpClient.GetAsync(userUrl);
        userResponse.EnsureSuccessStatusCode();

        var userResponseBody = await userResponse.Content.ReadAsStringAsync();
        var userData = JsonSerializer.Deserialize<GitHubUserResponse>(userResponseBody);

        // 3. Obtener los correos electrónicos (opcional pero recomendado)
        var emailsUrl = "https://api.github.com/user/emails";
        var emailsResponse = await _httpClient.GetAsync(emailsUrl);
        emailsResponse.EnsureSuccessStatusCode();

        var emailsResponseBody = await emailsResponse.Content.ReadAsStringAsync();
        var emailsData = JsonSerializer.Deserialize<List<GitHubEmailResponse>>(emailsResponseBody);

        var primaryEmail = emailsData?.FirstOrDefault(e => e.Primary && e.Verified)?.Email;

        // Aquí tienes todos los datos
        var userProfile = new
        {
            Id = userData?.Id,
            Login = userData?.Login,
            Name = userData?.Name,
            Email = primaryEmail,
            AvatarUrl = userData?.AvatarUrl,
            // Agrega más datos según necesites
        };

        // Ahora puedes guardar esta información en tu base de datos, crear una cookie de sesión, etc.
        // Y redirigir al usuario a la página de éxito en tu frontend
        return Redirect("/");
    }
}

// Clases para deserializar las respuestas de GitHub
public class GitHubTokenResponse
{
    [JsonPropertyName("access_token")]
    public string? AccessToken { get; set; }
}

public class GitHubUserResponse
{
    [JsonPropertyName("id")]
    public long Id { get; set; }

    [JsonPropertyName("login")]
    public string? Login { get; set; }

    [JsonPropertyName("name")]
    public string? Name { get; set; }

    [JsonPropertyName("avatar_url")]
    public string? AvatarUrl { get; set; }
}

public class GitHubEmailResponse
{
    [JsonPropertyName("email")]
    public string? Email { get; set; }

    [JsonPropertyName("primary")]
    public bool Primary { get; set; }

    [JsonPropertyName("verified")]
    public bool Verified { get; set; }
}