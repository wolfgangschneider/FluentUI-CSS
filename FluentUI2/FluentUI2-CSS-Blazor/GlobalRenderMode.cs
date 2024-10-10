using System.Data;

namespace FluentUI2_CSS_Blazor
{
    public class GlobalRenderMode
    {
        public static bool IsInteractive { get; set; } 

        public static void  DataSet(bool isInteractive)
        {
            IsInteractive = isInteractive;
            EventHandler<bool> handler = DataChanged;
            if (handler != null)
            {
                handler(null, IsInteractive);
            }
         
        }
        public static event EventHandler<bool> DataChanged;
    }
}
