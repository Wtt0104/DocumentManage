using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using C.Model.Request;

namespace C.BLL
{
    public class Company : DbContext
    {
        /// <summary>
        /// 根据企业ID获取企业信息
        /// </summary>
        /// <param name="companyId"></param>
        /// <returns></returns>
        public Model.doc_company GetCompanyInfo(int companyId)
        {
            return CompanyDb.GetById(companyId);
        }

        /// <summary>
        /// 添加公司并在后台生成对应的名下表
        /// </summary>
        /// <param name="rCompany"></param>
        /// <returns></returns>
        public bool AddCompany(Model.Request.Company rCompany)
        {
            string code = GeneratingRandomCode();
            Model.doc_company company = new Model.doc_company
            {
                Name = rCompany.Name,
                Code = code
            };
            if (CompanyDb.Insert(company))
            {
                return new GenerationTable().CreateTable(code);
            }
            return false;
        }

        /// <summary>
        /// 删除公司并删除后台表
        /// </summary>
        /// <param name="companyId"></param>
        /// <returns></returns>
        public bool DeleteCompany(int companyId)
        {
            string code = CompanyDb.GetById(companyId).Code;
            if (Db.DbMaintenance.DropTable(code + "_doc_file") &&
            Db.DbMaintenance.DropTable(code + "_doc_category") &&
            Db.DbMaintenance.DropTable(code + "_doc_filecategory"))
            {
                return CompanyDb.DeleteById(companyId);
            }
            else
            {
                throw new Exception("删除失败");
            }
        }

        /// <summary>
        /// 获取后台所有的分类
        /// </summary>
        /// <returns></returns>
        public List<Model.doc_company> GetCompanyList()
        {
            return CompanyDb.GetList();
        }

        /// <summary>
        /// 生成随机码
        /// </summary>
        /// <returns></returns>
        private string GeneratingRandomCode()
        {
            string str = "0123456789abcdefghijklmnopqrstuvwxyz";
            StringBuilder Code = new StringBuilder();
            Random rd = new Random();
            for (int i = 0; i < 5; i++)
            {
                Code.Append(str.Substring(rd.Next(0, str.Length), 1));
            }
            return Code.ToString() + DateTime.Now.Month.ToString();
        }
    }
}