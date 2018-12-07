import {
  HTTP
} from '../utils/http.js'
class CompanyModel extends HTTP {
  constructor() {
    super()
  }
  getCompanyInfo(companyId, success) {
    var params = {
      url: 'Company/GetCompanyInfo',
      success: success,
      data: {
        companyId: companyId,
      }
    }
    this.request(params)
  }
}
export {
  CompanyModel
}