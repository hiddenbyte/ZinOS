namespace ZinOS.Services.Definitions.GoogleCaja
{
    public interface ICajoleMessage
    {
        int Level { get; }
        string Name { get; }
        string Type { get; }
        string Content { get; }
    }
}