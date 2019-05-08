const message =  {
    "500":{ 
    code: 500, 
    status: 'error',
    message: {
      en_US: 'Internal Error!',
      th_TH: 'เกิดข้อผิดพลาดภายในระบบ!'
    }
  },
  "200":{
    code: 200,
    status: 'completed',
    result: {}
  },
  "401":{
    code: 401,
    status: 'error',
    message: 'session expired',
    message: {
      en_US: 'session expired',
      th_TH: 'ไม่ได้เข้าสู่ระบบ'
    }
  },"400":{
    code: 400,
    status: 'error',
    message: 'Login fail',
    message: {
      en_US: 'Login fail',
      th_TH: 'เข้าสู่ระบบผิดพลาด'
    }
  },
}

export {message}