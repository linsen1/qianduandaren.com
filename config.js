var host = 'https://api.qianduandaren.com';
var hostDemo='https://apitest.qianduandaren.com';
var evn=0;//测试环境

var serviceHost = (evn)=>{
  var servicehost=hostDemo;
  if (evn==1)
  {
    servicehost =host;
  }
  return servicehost;
}

var appService = serviceHost(evn);
var config = {
 
  // 下面的地址配合云端 Demo 工作
  service: {
    appService,
    // 登录地址，用于建立会话
    loginUrl: `${appService}/darenwx/wxlogin/clientCode`,

    // 测试的请求地址，用于测试会话
    RegUser: `${appService}/darenwx/regUser`,
    checkUser: `${appService}/darenwx/checkUser/`,
    getUserInfo: `${appService}/darenwx/getuserinfo/`,

    //获取资源列表
    getResourceList: `${appService}/darenwx/getresourcelist`,
    getResourceInfo: `${appService}/darenwx/getresource`,

    //获取文章列表
    getArticleList: `${appService}/darenwx/getArticleList`,
    getArticleInfo: `${appService}/darenwx/getArticleInfo`,
    getArticleContent: `${appService}/darenwx/getArticleContent`
  
  }
};

module.exports = config;