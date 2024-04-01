
const gladosRequestPush=async()=>{
  const cookie = process.env.GLADOS_COOKIE;//基于cookie的验证
  const authorization = process.env.GLADOS_AUTHORIZATION;//基于authorization的令牌验证
  // Node.js环境中，process是一个全局对象，它提供了有关当前Node.js进程的信息和控制权。process.env是process的属性，它是一个包含了系统环境变量的对象
  if(!cookie) return ;
  //未设置cookie无法登录则返回,cookie用于标记是用户信息，同一用户在同一网站中的行为产生的网络请求中的cookie都是一致的。
  try{
    const headers={//请求头不区分大小写
      cookie,//维持会话状态
      authorization,//验证权限
      //下面是给服务器识别为 真人 使用
      'referrer':'https://glados.rocks/console/checkin',//网络请求发出的那个地方的网址
      'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    }
    const checkinRequestURL='https://glados.rocks/api/user/checkin'
    const checkin=await fetch(checkinRequestURL,{
      method:'POST',
      headers:{...headers,  'content-type':'application/json;charset=UTF-8'},
      //只有POST方法需要content-type
      body:'{"token":"glados.one"}'
    }).then((r)=>r.json())
    const statusRequestURL ='https://glados.rocks/api/user/status'
    const status=await fetch(statusRequestURL,{
      method:'GET',
      headers,
    }).then((r)=>r.json());
    return [
      'GLADOS 签到成功',
      `剩余天数:${Number(status.data.leftDays)}`,
      `签到提示:${checkin.message}`
    ]
  }catch(error){
    return [
      'GLADOS 签到失败',
      `失败信息${error}`,
      `GitHub账户信息: <${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}>`
      ]
  }
}

const notify = async (contents) => {
  const [title , ...contents]=contents
  const token = process.env.NOTIFY
  if (!token || !contents) return
  await fetch(`https://www.pushplus.plus/send`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      token,
      title,
      content: contents.join('<br>'),
      template: 'markdown',
    }),
  })
}

const main = async()=>{
  await notify(await gladosRequestPush())
}

main()
