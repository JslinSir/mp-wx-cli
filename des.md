 
想要做什么：

通过脚本的方式创建 小程序项目模板
wmp-cli init

思路：
拿到终端的 输入 key 
得到key 之后复制准备好的模板
更改 json 文件中的配置项，如工程名，appid 选择基础库版本等
成功后提示

生成项目模板

npm init 创建脚本
inquirer.js —— 一个用户与命令行交互的工具 
fs 更改json 配置
ora 终端loading
chalk 终端输入自定义颜色插件

编写package.json bin 文件：    "wmp-cli": "bin/index"

本地测试  npm link

wmp-cli init


