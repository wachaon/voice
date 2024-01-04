using System.Media;

class Program
{
    static void Main(string[] args)
    {
        SoundPlayer player = new SoundPlayer(args[0]);
        player.PlaySync();
    }
}