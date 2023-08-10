// 头部阻塞

// http 3.0

// 简单请求： 请求方法是以下三种方法之一（HEAD GET POST）&& HTTP 的头信息不超出以下几种字段（Accept， Accept-Language， Content-Language， Last-Event-ID，Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain）

// DNS缓存检查 浏览器首先看一下自己的缓存里有没有 =》 如果没有就向操作系统的缓存要 =》 还没有就检查本机域名解析文件 hosts =》 本地 DNS =》 根 DNS =》 顶级 DNS =》 权威 DNS

// 七层网络模型 (应用层 表示层  会话层) 传输层 网络层 数据链路层 物理层
    // 应用层常见协议： http https dns ftp smtp
    // 传输层常见协议： tcp udp
    // 网络层常见协议： ip arp
    // 物理层：1 非归零编码，用高低电平表示0 1信号（受限于时钟信号，收发端同步困难）2 曼彻斯特编码（高低电平的变化，由高到低表示0，由低到高表示1）
    // 数据链路层：将上层协议（网络层数据包）数据组合（加上mac帧：目的地mac址、源mac地址、类型）成帧
