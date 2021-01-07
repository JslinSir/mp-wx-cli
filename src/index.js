const inquirer = require('inquirer')
const chalk = require('chalk')
const createTask = require('../src/create')


const parseArgs = rawArgs => {

    const firstArg = rawArgs[2] ? rawArgs[2].toLowerCase() : null;
    const secontArg = rawArgs[3] ? rawArgs[3] : null
 

    const action = firstArg === 'i' ? 'init' : firstArg==='init'? 'init' : null
    const projectName = action === 'init' && secontArg ? secontArg : 'myMp-init'
    return {
        action,
        projectName     
    }
}

// 与命令行交互 询问
const promptQuestions = async() => {

    const validateProjectName = async (input) => {
        const regex = /^[a-zA-Z0-9\-\_]+$/;
        const isValid = regex.test(input);
        return isValid ? true : chalk.red('Invalid project name')
    }
 
    const validateAppid = input => {
     const  regex = /^wx[a-z0-9]+$/
     const isValid = regex.test(input);
     return isValid ? true : chalk.red('Invalid wechart AppID')
    }

    const questions = [
        {
            type: 'input',
            name: 'projectName',
            message: 'Please enter a project name',
            transformer: function(input) {
                return chalk.green(input)
              },
            validate: validateProjectName
        },
        {
            type: 'input',
            name: 'appId',
            message: 'Please enter a wechart AppID',
            transformer: function(input) {
                return chalk.green(input)
              },
              validate: validateAppid
        },
        {
            type: 'list',
            name: 'libVersion',
            message: 'Please choose base wechart libVersion',
            choices: ['2.14.1', '2.13.2','2.12.2','2.11.2','2.10.4'],
            default: '2.10.4'
        },
       
    ];
 
    const answers = await inquirer.prompt(questions);
    const projectOptions = {};
    projectOptions.projectName = answers.projectName
    projectOptions.appId = answers.appId
    projectOptions.libVersion = answers.libVersion
    projectOptions.sass = answers.sass
    return projectOptions;

}


const cli = async(args) => {
    const { action,projectName } = parseArgs(args)
    if(!action){
        console.log(chalk.red('if you want init project please input mp-wx-cli init yourProjectName'))
    }
    switch(action){
     case 'init':
        const projectOptions = await promptQuestions()
        await createTask.create(projectOptions)
         break
    
    }
   
}


 exports.cli = cli