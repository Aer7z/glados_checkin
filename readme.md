# Checkin

GitHub Actions 实现 [GLaDOS][glados] 自动签到

## 使用说明

1. Fork 这个仓库到本地

2. 登录 [GLaDOS][glados] 中的签到，打开控制台切到网络（network），点击签到。 观察点击行为后产生的网络请求：checkin和status， 随便点击一个请求，查看请求头获取 Cookie 和 Authorization

3. 添加Repository secrets。打开设置（Settings）下滑找到Secrets and variables，在Repository secrets中执行下述操作

（1）添加 Cookie 到 Secret的`GLADOS_COOKIE`

（2）添加 Authorization 到 Secret的`GLADOS_AUTHORIZATION`

4. 在Actions处点击run工作流, 选择Enable workflow启动，预计每天北京时间 06.00 左右自动签到

5. 如需推送通知, 可用 [PushPlus][pushplus], 添加 Token 到 Secret `NOTIFY`

[glados]: https://github.com/glados-network/GLaDOS
[pushplus]: https://www.pushplus.plus/
