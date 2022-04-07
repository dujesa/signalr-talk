using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SignalR.Pages
{
    public class GroupsModel : PageModel
    {
        private readonly ILogger<GroupsModel> _logger;

        public GroupsModel(ILogger<GroupsModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}
