using SqlSugar;

namespace C.BLL
{
    public class DbSet<T> : SimpleClient<T> where T : class, new()
    {
        public DbSet(SqlSugarClient context) : base(context)
        {
        }
    }
}