---
title: HTTP状态码
categories:
  - 计算机网络
tags:
  - 计算机网络
date: 2021-09-02 15:01:53
---



来自 Go HTTP库：

```go
// HTTP status codes, defined in RFC 2616.
const (
   StatusContinue           = 100
   StatusSwitchingProtocols = 101
   
   StatusOK                   = 200
   StatusCreated              = 201
   StatusAccepted             = 202
   StatusNonAuthoritativeInfo = 203
   StatusNoContent            = 204
   StatusResetContent         = 205
   StatusPartialContent       = 206

   StatusMultipleChoices   = 300
   StatusMovedPermanently  = 301
   StatusFound             = 302
   StatusSeeOther          = 303
   StatusNotModified       = 304
   StatusUseProxy          = 305
   StatusTemporaryRedirect = 307

   StatusBadRequest                   = 400
   StatusUnauthorized                 = 401
   StatusPaymentRequired              = 402
   StatusForbidden                    = 403
   StatusNotFound                     = 404
   StatusMethodNotAllowed             = 405
   StatusNotAcceptable                = 406
   StatusProxyAuthRequired            = 407
   StatusRequestTimeout               = 408
   StatusConflict                     = 409
   StatusGone                         = 410
   StatusLengthRequired               = 411
   StatusPreconditionFailed           = 412
   StatusRequestEntityTooLarge        = 413
   StatusRequestURITooLong            = 414
   StatusUnsupportedMediaType         = 415
   StatusRequestedRangeNotSatisfiable = 416
   StatusExpectationFailed            = 417
   StatusTeapot                       = 418
    
   StatusInternalServerError     = 500
   StatusNotImplemented          = 501
   StatusBadGateway              = 502
   StatusServiceUnavailable      = 503
   StatusGatewayTimeout          = 504
   StatusHTTPVersionNotSupported = 505

   // New HTTP status codes from RFC 6585. Not exported yet in Go 1.1.
   // See discussion at https://codereview.appspot.com/7678043/
   statusPreconditionRequired          = 428
   statusTooManyRequests               = 429
   statusRequestHeaderFieldsTooLarge   = 431
   statusNetworkAuthenticationRequired = 511
)
```

