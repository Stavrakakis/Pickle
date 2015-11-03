namespace Pickle.Web.Middleware
{
    public class ApiMappingOptions
    {
        public string MapFromUri { get; set; }

        public string MapToUri { get; set; }

        public bool UseBearerTokenFromCookie { get; set; } = true;
    }
}