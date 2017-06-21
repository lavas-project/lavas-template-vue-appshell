/**
 * @file serviceworker register
 * @author *__ author __*{% if: *__ email __* %}(*__ email __*){% /if %}
 */

if ('serviceWorker' in navigator) {

    /**
     * 处理 service worker 更新
     *
     * @param  {Object} e event source
     */
    const handlerUpdateMessage = e => {

        // 在这里可以检测到 service worker 文件的更新，通常我们建议做页面的 reload

        const metas = document.getElementsByTagName('meta');

        for (let i = 0, len = metas.length; i < len; i++) {
            let meta = metas[i];
            if (meta.name === 'theme-color') {
                meta.content = '#000';
            }
        }

        const dom = document.createElement('div');

        /* eslint-disable max-len */
        dom.innerHTML = `
            <style>
                .app-refresh {background:#000;color:#fff;height:52px;line-height:52px;opacity:1;position:fixed;top:0;left:0;right:0;z-index:10001;padding:0 18px;animation: app-refresh-animation 1s;}
                .app-refresh-wrap{display:flex;}
                .app-refresh-wrap span{display:inline-block;flex:1;font-size:15px;}
                .app-refresh-wrap button{color:#fff;outline:none;font-size:15px;}
                @keyframes app-refresh-animation{from {height: 0;opacity: 0}to {height: 52px;opacity: 1;}}
                @-webkit-keyframes app-refresh-animation{from {height: 0;opacity: 0}to {height: 52px;opacity: 1;}}
                @-o-keyframes app-refresh-animation{from {height: 0;opacity: 0}to {height: 52px;opacity: 1;}}
                @-moz-keyframes app-refresh-animation{from {height: 0;opacity: 0}to {height: 52px;opacity: 1;}}
            </style>
            <div class="app-refresh" id="app-refresh">
                <div class="app-refresh-wrap">
                    <span>已更新最新版本</span>
                    <button onclick="location.reload()">点击刷新</button>
                </div>
            </div>
        `;
        /* eslint-enable */

        document.body.appendChild(dom);
    };

    // 注册的地址为 sw-precache-webpack-pulgin 生成的 service-worker.js 自己手动维护的 sw.js
    navigator.serviceWorker.register('/service-worker.js');

    navigator.serviceWorker.addEventListener('message', e => {
        // received the update message from sw
        if (e.data === 'updateMessage') {
            handlerUpdateMessage(e);
        }
    });
}
