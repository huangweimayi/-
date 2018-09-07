'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.168.10.190:8000/manage/"', // yangliu
  // BASE_API: '"http://192.168.10.144:8080/manage/"', // 志强
  // BASE_API: '"http://192.168.10.195:8080/manage/"', // yaohu
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
})
