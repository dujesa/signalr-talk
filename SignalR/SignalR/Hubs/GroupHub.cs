using Microsoft.AspNetCore.SignalR;
using SignalR.Data;

namespace SignalR.Hubs
{
    public interface IGroupInterface
    {
        Task GroupHook(ReservationMessage data);
    }

    public class GroupHub : Hub<IGroupInterface>
    {
        public static List<Position> Positions = new()
        {
            new Position { Company = string.Empty, Place = "Ispred akvarija" },
            new Position { Company = string.Empty, Place = "Ispred A100" },
            new Position { Company = string.Empty, Place = "Ispred A101" },
            new Position { Company = string.Empty, Place = "Ispred refererade" },
            new Position { Company = string.Empty, Place = "U sredini atrija" },
            new Position { Company = string.Empty, Place = "Kraj domara" },
        };

        public Task Join() => Groups.AddToGroupAsync(Context.ConnectionId, "group_name");
        public Task Leave() => Groups.RemoveFromGroupAsync(Context.ConnectionId, "group_name");

        public Task GroupMessage(Position positionRequest)
        {
            var position = Positions
                .FirstOrDefault(p => p.Place == positionRequest?.Place);

            if (position is null)
                return Task.CompletedTask;

            position.Company = positionRequest.Company;

            var availablePositions = Positions
                .Where(p => string.IsNullOrWhiteSpace(p.Company))
                .Select(p => p.Place)
                .ToList();
            var takenPositions = Positions
                .Where(p => !string.IsNullOrWhiteSpace(p.Company))
                .Select(p => $"{p.Place}: {p.Company}")
                .ToList();
            var reservationMessage = new ReservationMessage(69, $"Successfuly took position {positionRequest.Company} => {positionRequest.Place}", availablePositions, takenPositions);
            Clients.Group("group_name")
                .GroupHook(reservationMessage);

            return Task.CompletedTask;
        }
    }

    public class Position
    {
        public string Company { get; set; } = string.Empty;
        public string Place { get; set; } = string.Empty;
    }

    public record ReservationMessage(int Id, string Payload, List<string> availablePositions, List<string> takenPositions);
}
