namespace ZinOS.Data.Entities
{
    public class ZinOSApp
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int Version { get; set; }

        public bool Available { get; set; }

        public string CajoledModule { get; set; }

        public User Owner { get; set; }

        public ZinOSAppUserInterfaceConfiguration UserInterfaceConfiguration { get; set; }
    }

    public class ZinOSAppUserInterfaceConfiguration
    {
        public int? DefaultWidth { get; set; }

        public int? DefaultHeight { get; set; }

        public bool? Resizable { get; set; }

        public string Icon { get; set; }

        public bool HasValue
        {
            get { return DefaultWidth.HasValue || DefaultHeight.HasValue || Resizable.HasValue || Icon != null; }
        }
    }
}
