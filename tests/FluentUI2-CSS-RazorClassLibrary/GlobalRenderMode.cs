using System.Data;

namespace FluentUI2_CSS_Blazor
{
    public class GlobalRenderMode
    {
        public static bool IsInteractive { get; set; } = true;
        public static bool IsCustomCollor { get; set; }
        public static CustomTheme CustomTheme { get; set; } = new CustomTheme { Color = "#0F6CBD" };

        public static void TriggerDataChanged()
        {
            OnDataChanged(new EventArgs());
        }
        public static event EventHandler DataChanged = null!;

        protected static void OnDataChanged(EventArgs e)
        {
            DataChanged?.Invoke(null, e);
        }
    }

    public class CustomTheme
    {
        public string Color { get; set; } = String.Empty;
        public int HueTorsion { get; set; }
        public int Vibrancy { get; set; }
    }
}
