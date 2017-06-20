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
            <div class="app-refresh" id="app-refresh" style="background:#000;color:#fff;height:0;line-height:0;opacity:0;position:fixed;left:0;right:0;z-index:10001;padding:0 18px;transition all:.2s ease-in;">
                <div class="app-refresh-wrap" style="display:flex;">
                    <span style="display:inline-block;flex:1;font-size:15px;">已更新最新版本</span>
                    <button style="color:#fff;outline:none;font-size:15px;" onclick="location.reload()">点击刷新</button>
                </div>
            </div>
        `;
        /* eslint-enable */

        document.body.appendChild(dom);
        setTimeout(() => {

            /* eslint-disable fecs-valid-dom-style */
            const refreshDom = document.getElementById('app-refresh');
            refreshDom.style.height = 52 + 'px';
            refreshDom.style.lineHeigit = 52 + 'px';
            refreshDom.style.opacity = 1;
            /* eslint-enable */

        }, 16);
    };


    navigator.serviceWorker.register('/service-worker.js');

    navigator.serviceWorker.addEventListener('message', e => {
        // received the update message from sw
        if (e.data === 'updateMessage') {
            handlerUpdateMessage(e);
        }
    });
}
