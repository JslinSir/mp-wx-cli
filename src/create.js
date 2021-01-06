const execa = require('execa')
const ora = require('ora')
const chalk = require('chalk')
const fs = require('fs')

const copyTask = require('./copy')

// spinner
const spinner = ora(`loading...\n`)

async function create(props){
    const { projectName,appId,libVersion } = props
    spinner.start()
    try{
        await execa('mkdir', [projectName])
        // fs.mkdirSync(`${projectName}`)
       // 复制模板
        await copyTemplate(`./${projectName}`)

       // 读取 模板 project.config.json 文件  更改配置信息
       const wecahrtConfig = await readWechartProjectConfigJson()
       wecahrtConfig.appid = appId
       wecahrtConfig.projectname = projectName
       wecahrtConfig.libVersion = libVersion
       
       const configStr = JSON.stringify(wecahrtConfig)
       await writeWechartProjectConfigJson(projectName,configStr)
       spinner.stop()
       console.log(chalk.green(`
       ******************************************
       * your "${projectName}" project init success
       *
       * you can use wechart tools open your "${projectName}"
       * 
       * ok  ✔️✔️✔️😃😃😃
       *
       ******************************************
         `))

    }catch(e){
        spinner.fail(chalk.red(e))
    }
}

// 读取wechart配置
async function readWechartProjectConfigJson(){
 return  new Promise((resolve,reject)=>{
    fs.readFile('./templates/project.config.json',function(err,data){
        if(err){
            reject(err)
        }
        resolve(JSON.parse(data.toString()))
    })
  })
}

// 写入配置
async function writeWechartProjectConfigJson(path,str){
    return  new Promise((resolve,reject)=>{
        fs.writeFile(`./${path}/project.config.json`,str,function(err,data){
            if(err){
                reject(err)
            }
            resolve()
        })
      })
}

// 复制模板
async function copyTemplate(dst){
   
  copyTask.copyDir('./templates',dst)
  
  return Promise.resolve()
   
}


exports.create = create


