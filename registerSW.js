if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/aecc/sw.js', { scope: '/aecc/' })})}