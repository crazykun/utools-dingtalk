// 钉钉窗口
let browser_id = null
// 消息提醒
let unreadTotal = 0

/**
 * 初始化 web dingtalk
 */
function dingTalkInit() {
    if (browser_id) {
        dingTalkShow(browser_id)
    } else {
        utools.ubrowser.goto('https://im.dingtalk.com/')
            // .devTools('right')
            .evaluate(dingTalkNotice, unreadTotal)
            .run({ width: 1000, height: 600 })
    }
}

/**
 *  钉钉消息提醒
 */
function dingTalkNotice(unreadTotal) {
    console.log(unreadTotal)
    setInterval(() => {
        let el =
            document &&
            document.querySelector('.main-menus .unread-num em.ng-binding')
        let total = 0
        if (el) {
            total = ~~el.textContent.trim()
        }
        if (total > unreadTotal) {
            console.log("new message")
            // utools.showNotification('您有 ${total} 条钉钉信息')
            const notify = new Notification('钉钉', {
                icon: 'https://g.alicdn.com/dingding/web/0.2.6/img/newIcon.ico',
                body: `您有 ${total}  条钉钉信息`
            })
            notify.onclick = () => {
                window.focus();
                // utools.ubrowser.show()
            }

        }
        unreadTotal = total
    }, 1000)
}

/**
 *  打开钉钉窗口
 */
function dingTalkShow(browser_id) {
    utools.ubrowser
        .show()
        // .devTools('right')
        .run(browser_id)
}


utools.onPluginReady(() => {
    console.log('插件装配完成，已准备好')
    utools.hideMainWindow()
})


utools.onPluginEnter(({ code, type, payload, optional }) => {
    console.log('用户进入插件', code, type, payload)
    dingTalkInit()
    let browsers = utools.getIdleUBrowsers()
    if (browsers && browsers.length > 0) {
        browser_id = browsers[0].id
    }
})


utools.onPluginOut(() => {
    console.log('用户退出插件')
})



