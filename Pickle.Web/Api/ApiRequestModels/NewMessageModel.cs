using System.ComponentModel.DataAnnotations;

namespace Pickle.Api.ApiRequestModels
{
    public class NewMessageModel
    {        
        [Required]
        [StringLength(3000, MinimumLength = 1)]
        public string Message { get; set; }
    }
}
