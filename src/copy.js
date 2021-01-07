const chalk = require('chalk')
const fs = require('fs')

/**
 * copy file
 *
 * @param  {String} from copied file
 * @param  {String} to   target file
 */
function copyFile(from, to) {
    fs.writeFileSync(to, fs.readFileSync(from));
    return Promise.resolve()
}



/**
 * copy directory
 * 同步的方式
 * @param  {String} from
 * @param  {String} to
 */
async function copyDir(from, to) {
    try {
        await isExistSync(to)
    } catch (err) {  //不存在，则创建文件夹
        fs.mkdirSync(to)
    }
    const paths = fs.readdirSync(from)
    paths.forEach(async (path) => {
        const src = `${from}/${path}`
        const dist = `${to}/${path}`
        const fileType = await justFileOrDir(src)
        if (fileType === 'file') {
            fs.writeFileSync(dist, fs.readFileSync(src))
            console.log(chalk.magenta(`🚚  ${src} `))
        } else if (fileType === 'dir') {
            copyDir(src, dist)

        }
    })



} 
        


/**
 * is exists
 *
 * @param  {String} file
 * @return {Promise}
 */
function isExist(path) {
    return new Promise((resolve, reject) => {
        fs.access(path, (err) => {
            if (err !== null) {
                reject(`${path} does not exist`);
            } else {
                resolve(true);
            }
        });
    });
}

function isExistSync(path) {
    return fs.accessSync(path)
}

/**
 * is exists
 *
 * @param  {String} src
 * @return {Promise}
 */
function justFileOrDir(src) {
    return new Promise((resolve, reject) => {
        fs.stat(src, (err, stat) => {
            if (err) {
                reject(err)
            }
            if (stat.isFile()) {
                resolve('file')
            } else if (stat.isDirectory()) {
                resolve('dir')
            }
        });
    })

}

module.exports = {
    copyFile,
    copyDir
}