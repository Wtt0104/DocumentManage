using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using C.Model.Return;

namespace C.BLL
{
    public class User : DbContext
    {
        /// <summary>
        /// 第一次登陆用户在数据库内添加用户数据然后返回对应企业号
        /// </summary>
        /// <param name="wxapi"></param>
        /// <returns></returns>
        public Tuple<List<ReturnEnterprise>, string> IsExistingUser(Model.doc_wxapi wxapi)
        {
            if (UserDb.IsAny(o => o.Openid == wxapi.openId))
            {
                Model.doc_user user = GetUserInfoByOpenId(wxapi.openId);
                return new Tuple<List<ReturnEnterprise>, string>(GetEnterpriseByOpenId(wxapi.openId), user.Token);
            }
            else
            {
                string token = AddUser(wxapi);
                if (SqlFunc.Length(token) > 0)
                {
                    return new Tuple<List<ReturnEnterprise>, string>(GetEnterpriseByOpenId(wxapi.openId), token);
                }
                return null;
            }
        }

        /// <summary>
        /// 添加用户返回token值
        /// </summary>
        /// <param name="wxapi"></param>
        /// <returns></returns>
        private string AddUser(Model.doc_wxapi wxapi)
        {
            string token = GetToken();
            Model.doc_user user = new Model.doc_user
            {
                Openid = wxapi.openId,
                Session_key = wxapi.session_key,
                Token = token
            };
            if (UserDb.Insert(user))
            {
                return token;
            }
            return "";
        }

        /// <summary>
        /// 通过openId将用户与企业绑定
        /// </summary>
        /// <param name="openId"></param>
        /// <param name="companyId"></param>
        /// <returns></returns>
        public bool AddUserCompany(string openId, int companyId)
        {
            Model.doc_usercompany usercompany = new Model.doc_usercompany
            {
                UserId = GetUserInfoByOpenId(openId).Id,
                CompanyId = companyId
            };
            return UserCompanyDb.Insert(usercompany);
        }

        /// <summary>
        /// 判断传入的企业ID与用户是否已经建立关联，如果否则建立关联关系,并返回企业信息
        /// </summary>
        /// <param name="user"></param>
        /// <param name="companyId"></param>
        /// <returns></returns>
        public List<ReturnEnterprise> IsUserCompany(string openId, int companyId)
        {
            Model.doc_user user = GetUserInfoByOpenId(openId);
            List<int> companyIds = UserCompanyDb.GetList(o => o.UserId == user.Id).Select(o => o.CompanyId).ToList();
            if (!companyIds.Exists(o => o == companyId))
            {
                Model.doc_usercompany usercompany = new Model.doc_usercompany
                {
                    UserId = user.Id,
                    CompanyId = companyId
                };
                UserCompanyDb.Insert(usercompany);
            }
            return GetEnterpriseByOpenId(user.Openid);
        }

        /// <summary>
        /// 根据token绑定企业
        /// </summary>
        /// <param name="token"></param>
        /// <param name="companyId"></param>
        /// <returns></returns>
        public List<ReturnEnterprise> BindCompanyByToken(string token, int companyId)
        {
            Model.doc_user user = GetUserInfoByToken(token);
            List<int> companyIds = UserCompanyDb.GetList(o => o.UserId == user.Id).Select(o => o.CompanyId).ToList();
            if (!companyIds.Exists(o => o == companyId))
            {
                Model.doc_usercompany usercompany = new Model.doc_usercompany
                {
                    UserId = user.Id,
                    CompanyId = companyId
                };
                UserCompanyDb.Insert(usercompany);
            }
            return GetEnterpriseByOpenId(user.Openid);
        }

        /// <summary>
        /// 根据OpenId来获取用户实体
        /// </summary>
        /// <param name="openId"></param>
        /// <returns></returns>
        private Model.doc_user GetUserInfoByOpenId(string openId)
        {
            return UserDb.GetSingle(o => o.Openid == openId);
        }

        /// <summary>
        /// 根据token来获取用户实体
        /// </summary>
        /// <param name="openId"></param>
        /// <returns></returns>
        private Model.doc_user GetUserInfoByToken(string token)
        {
            return UserDb.GetSingle(o => o.Token == token);
        }

        /// <summary>
        /// 根据用户openId获取企业名称与编码
        /// </summary>
        /// <param name="openId"></param>
        /// <returns></returns>
        private List<ReturnEnterprise> GetEnterpriseByOpenId(string openId)
        {
            List<ReturnEnterprise> enterprises = Db.Queryable<Model.doc_user, Model.doc_usercompany, Model.doc_company>((u, uc, c) => u.Id == uc.UserId && c.Id == uc.CompanyId)
                 .Where((u, uc, c) => u.Openid == openId)
                 .OrderBy((u, uc, c) => c.Id)
                 .Select((u, uc, c) => new ReturnEnterprise
                 {
                     Id = c.Id,
                     Name = c.Name,
                     Code = c.Code
                 }).ToList();
            if (enterprises.Count > 0)
            {
                return enterprises;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 生成随机码
        /// </summary>
        /// <returns></returns>
        private string GetToken()
        {
            string str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
            StringBuilder token = new StringBuilder();
            Random rd = new Random();
            for (int i = 0; i < 20; i++)
            {
                token.Append(str.Substring(rd.Next(0, str.Length), 1));
            }
            return token.ToString();
        }
    }
}