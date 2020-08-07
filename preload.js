// 钉钉窗口
let browser_id = null
// 消息提醒
let unreadTotal = 0

/**
 * 初始化 web dingtalk
 */
function dingTalkInit() {
    console.log(unreadTotal)
    console.log(browser_id)
    if (!browser_id) {
        let browsers = utools.getIdleUBrowsers()
        if (browsers && browsers.length > 0) {
            browser_id = browsers[0].id
        }
    }
    // 打开旧窗口
    if (browser_id) {
        console.log("open ubroser")
        utools.ubrowser
            .show()
            .devTools('bottom')
            .run(browser_id)
    } else {
        console.log("new ubroser")
        utools.ubrowser.goto('https://im.dingtalk.com/')
            .devTools('bottom')
            .evaluate((unreadTotal) => {
                setInterval(() => {
                    let el =
                        document &&
                        document.querySelector('.main-menus .unread-num em.ng-binding')
                    let total = 0
                    if (el) {
                        total = ~~el.textContent.trim()
                    }
                    if (total !== unreadTotal && total > 0) {
                        console.log("new message")
                        // utools.showNotification('您有 ${total} 条钉钉信息')
                        const notify = new Notification('钉钉', {
                            icon: 'https://g.alicdn.com/dingding/web/0.2.6/img/oldIcon.ico',
                            body: `您有 ${total}  条钉钉信息`
                        })
                        notify.onclick = () => {
                            dingTalkInit()
                        }
                        
                    }
                    unreadTotal = total
                }, 1000)
            }, unreadTotal)
            .run({ width: 1000, height: 600 })
    }
}

// utools.showNotification('您有 ${total} 条钉钉信息')

utools.onPluginReady(() => {
    console.log('插件装配完成，已准备好')
    // utools.hideMainWindow()
})


utools.onPluginEnter(({ code, type, payload, optional }) => {
    console.log('用户进入插件', code, type, payload)
    dingTalkInit()
})


utools.onPluginOut(() => {
    console.log('用户退出插件')
})



