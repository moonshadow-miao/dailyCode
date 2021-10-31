// Taro 3.0 和 2.0的区别


// 小程序原理
// 小程序的渲染时基于双线程模型的，在这个模型中小程序的逻辑层与渲染层分开在不同的线程运行。逻辑层运行在 JSCore 中，并没有一个完整浏览器对象，因而缺少相关的DOM API和BOM API。
// 界面主要是由成熟的web技术渲染，同时有大量的接口提供提供丰富的客户端原生能力。同时每个小程序页面都是由不同的webview去渲染，这样可以提供更好的交互体验，也更加接近原生体验。

// 运行环境	        逻辑层	            渲染层
// iOS	            JavaScriptCore	    WKWebView
// 安卓	            X5 JSCore	        X5浏览器
// 小程序开发者工具	NWJS	            Chrome WebView
