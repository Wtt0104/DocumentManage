using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace C.BLL
{
    public class DbContext
    {
        public static string connectionString = "server=101.132.125.41;database=document_manage;uid=root;pwd=root;SslMode=None";

        public static DbType Type = DbType.MySql;

        public DbContext()
        {
            Db = SugarBase.GetInstance(connectionString, Type);
        }

        //用来处理事务多表查询和复杂的操作
        public SqlSugarClient Db;

        //用来处理doc_user表的常用操作
        public DbSet<C.Model.doc_user> UserDb { get { return new DbSet<C.Model.doc_user>(Db); } }

        //用来处理doc_company表的常用操作
        public DbSet<C.Model.doc_company> CompanyDb { get { return new DbSet<C.Model.doc_company>(Db); } }

        //用来处理doc_usercompany表的常用操作
        public DbSet<C.Model.doc_usercompany> UserCompanyDb { get { return new DbSet<C.Model.doc_usercompany>(Db); } }

        //用来处理doc_template_table表的常用操作
        public DbSet<C.Model.doc_template_table> TableDb { get { return new DbSet<C.Model.doc_template_table>(Db); } }

        //用来处理doc_template_field表的常用操作
        public DbSet<C.Model.doc_template_field> FieldDb { get { return new DbSet<C.Model.doc_template_field>(Db); } }

        //用来处理doc_datatype表的常用操作
        public DbSet<C.Model.doc_datatype> DatatypeDb { get { return new DbSet<C.Model.doc_datatype>(Db); } }

        //用来处理template_file表的常用操作
        public DbSet<C.Model.template_file> FileDb { get { return new DbSet<C.Model.template_file>(Db); } }

        //用来处理template_category表的常用操作
        public DbSet<C.Model.template_category> CategoryDb { get { return new DbSet<C.Model.template_category>(Db); } }

        //用来处理template_category表的常用操作
        public DbSet<C.Model.template_filecategory> FileCategoryDb { get { return new DbSet<C.Model.template_filecategory>(Db); } }
    }

    internal static class SugarBase
    {
        public static SqlSugarClient GetInstance(string connectionString, DbType dbType)
        {
            SqlSugarClient db = new SqlSugarClient(new ConnectionConfig() { ConnectionString = connectionString, DbType = dbType, IsAutoCloseConnection = true });
            db.Ado.IsEnableLogEvent = true;
            db.Ado.LogEventStarting = (sql, pars) =>
            {
                Console.WriteLine(sql + "\r\n" + db.Utilities.SerializeObject(pars.ToDictionary(it => it.ParameterName, it => it.Value)));

                Console.WriteLine();
            };
            return db;
        }
    }
}