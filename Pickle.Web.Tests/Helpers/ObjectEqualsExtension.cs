using Newtonsoft.Json;

namespace Pickle.Web.Tests.Helpers
{
    public static class ObjectEqualsExtension
    {
        public static bool JsonEquals<T>(this T result, T expected)
        {
            return JsonConvert.SerializeObject(result) == JsonConvert.SerializeObject(expected);
        }
    }
}
