using Newtonsoft.Json;

namespace Pickle.Tests.Common.Helpers
{
    public static class ObjectEqualsExtension
    {
        public static bool JsonEquals<T>(this T result, T expected)
        {
            return JsonConvert.SerializeObject(result) == JsonConvert.SerializeObject(expected);
        }
    }
}
