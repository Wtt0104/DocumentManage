const routers = [
    {
        path: '/',
        meta: {
            title: '文档管理系统'
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    }
];
export default routers;