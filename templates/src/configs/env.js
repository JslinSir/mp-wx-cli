/*
 * @Description: app环境，域名
 * DEV 开发
 * TEST 测试
 * UAT  预发布
 * PROD 生产
 */
import * as hostConfig from './host'
const ENVENUM = {
    DEV:'dev',
    TEST:'test',
    UAT:'uat',
    PRD:'prd'
}

/**
 * 环境配置
 */

const ENV = ENVENUM.DEV




const HOST =  hostConfig[ENV]

export  {
    ENV,
    HOST
}