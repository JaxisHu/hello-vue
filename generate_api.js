console.log("###################### 通过该脚本生成api哦 ######################");

const fs = require('fs');
const path = require('path');
// const http = require('http');
// const qs = require('querystring');

/**
 * 读取JSON文件
 */
async function getFileData(filename) {
    if (filename) {
        let fileFullName = path.resolve(__dirname, filename);

        let filePromise = new Promise((resolve, reject) => {
            fs.readFile(fileFullName, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(JSON.parse(data));
            });
        });
        return await filePromise;
    }
}

getFileData('./src/api/swagger.json').then(res => {
    // console.log("res", res);
    const paths = res.paths;
    let apiTemp = `import { httpRequest } from '@U/ajax';\r\n`;
    for(let key in paths) {
        // console.log(`path & method & comment >>>${ key } & ${ Object.keys(paths[key])[0] } & ${ Object.values(paths[key])[0].summary } \r\n`);
        let argType = Object.keys(paths[key])[0] === 'get'? 'params':'data';
        apiTemp +=
`
/** ${ Object.values(paths[key])[0].summary } */
const ${ Object.values(paths[key])[0].operationId } = (${ argType }: any) => {
    httpRequest('${ Object.keys(paths[key])[0] }', '${ key }', ${ argType });
};   
`;
    }
    fs.writeFile('./src/api/test.ts', apiTemp,{flag:'w',encoding:'utf-8',mode:'0666'},function(err){
        if(err){
            console.log("文件写入失败");
        } else {
            console.log("文件写入成功");
        }
    });
});


/**
 * 通过调用接口读数据(暂时不用)
 */
// https://dev-meixi.zhibankeji.com/v2/api-docs
/*var data = {
    a: 123,
    time: new Date().getTime()
};//这是需要提交的数据

var content = qs.stringify(data);

var options = {
    hostname: '127.0.0.1',
    port: 10086,
    path: '/pay/pay_callback?' + content,
    method: 'GET'
};

var req = http.request(options, function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
});


req.on('error', function (e) {
    console.log('problem with request: ' + e.message);
});

req.end();*/
