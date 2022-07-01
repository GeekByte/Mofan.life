---
title: Go语言ioutil.ReadFile 与ioutil.ReadAll差别
categories:
  - 编程语言
  - Go
tags:
  - Go
date: 2021-03-27 15:22:19
---

**当读取91.2 MB文件时，read1耗时43ms，read2耗时99ms。**

```go
package main

import (
    "flag"
    "fmt"
    "io/ioutil"
    "os"
    "time"
)

func read1(filename string) {
    ioutil.ReadFile(filename)
}

func read2(filename string) {
    f, err := os.Open(filename)
    defer f.Close()
    if err != nil {
        fmt.Println("os Open error: ", err)
        return
    }
    ioutil.ReadAll(f)
}

func main() {

    flag.Parse()
    file := flag.Arg(0)
    start := time.Now()
    read1(file)
    t1 := time.Now()
    fmt.Printf("Cost time %v\n", t1.Sub(start))
    read2(file)
    t2 := time.Now()
    fmt.Printf("Cost time %v\n", t2.Sub(t1))

}
```

查看源代码：

```go
// ReadAll reads from r until an error or EOF and returns the data it read.
// A successful call returns err == nil, not err == EOF. Because ReadAll is
// defined to read from src until EOF, it does not treat an EOF from Read
// as an error to be reported.
func ReadAll(r io.Reader) ([]byte, error) {
    return readAll(r, bytes.MinRead)
}

// ReadFile reads the file named by filename and returns the contents.
// A successful call returns err == nil, not err == EOF. Because ReadFile
// reads the whole file, it does not treat an EOF from Read as an error
// to be reported.
func ReadFile(filename string) ([]byte, error) {
    f, err := os.Open(filename)
    if err != nil {
        return nil, err
    }
    defer f.Close()
    // It's a good but not certain bet that FileInfo will tell us exactly how much to
    // read, so let's try it but be prepared for the answer to be wrong.
    var n int64 = bytes.MinRead

    if fi, err := f.Stat(); err == nil {
        // As initial capacity for readAll, use Size + a little extra in case Size
        // is zero, and to avoid another allocation after Read has filled the
        // buffer. The readAll call will read into its allocated internal buffer
        // cheaply. If the size was wrong, we'll either waste some space off the end
        // or reallocate as needed, but in the overwhelmingly common case we'll get
        // it just right.
        if size := fi.Size() + bytes.MinRead; size > n {
            n = size
        }
    }
    return readAll(f, n)
}

// readAll reads from r until an error or EOF and returns the data it read
// from the internal buffer allocated with a specified capacity.
func readAll(r io.Reader, capacity int64) (b []byte, err error) {
    var buf bytes.Buffer
    // If the buffer overflows, we will get bytes.ErrTooLarge.
    // Return that as an error. Any other panic remains.
    defer func() {
        e := recover()
        if e == nil {
            return
        }
        if panicErr, ok := e.(error); ok && panicErr == bytes.ErrTooLarge {
            err = panicErr
        } else {
            panic(e)
        }
    }()
    if int64(int(capacity)) == capacity {
        buf.Grow(int(capacity))
    }
    _, err = buf.ReadFrom(r)
    return buf.Bytes(), err
}

// ReadFrom reads data from r until EOF and appends it to the buffer, growing
// the buffer as needed. The return value n is the number of bytes read. Any
// error except io.EOF encountered during the read is also returned. If the
// buffer becomes too large, ReadFrom will panic with ErrTooLarge.
func (b *Buffer) ReadFrom(r io.Reader) (n int64, err error) {
    b.lastRead = opInvalid
    for {
        i := b.grow(MinRead)
        b.buf = b.buf[:i]
        m, e := r.Read(b.buf[i:cap(b.buf)])
        if m < 0 {
            panic(errNegativeRead)
        }

        b.buf = b.buf[:i+m]
        n += int64(m)
        if e == io.EOF {
            return n, nil // e is EOF, so return nil explicitly
        }
        if e != nil {
            return n, e
        }
    }
}
```

读取文件主要是通过`Read(p []byte) (n int, err error)`：

官方文档中关于该接口方法的说明：

> Read 将 len(p) 个字节读取到 p 中。它返回读取的字节数 n（0 <= n <= len(p)） 以及任何遇到的错误。即使 >Read 返回的 n < len(p)，它也会在调用过程中占用 len(p) 个字节作为暂存空间。若可读取的数据不到 len(p) >个字节，Read 会返回可用数据，而不是等待更多数据。

> 当 Read 在成功读取 n > 0 个字节后遇到一个错误或 EOF (end-of-file)，它会返回读取的字节数。它可能会>>同时在本次的调用中返回一个non-nil错误,或在下一次的调用中返回这个错误（且 n 为 0）。 一般情况下, >Reader会返回一个非0字节数n, 若 n = len(p) 个字节从输入源的结尾处由 Read 返回，Read可能返回 err == >EOF 或者 err == nil。并且之后的 Read() 都应该返回 (n:0, err:EOF)。

> 调用者在考虑错误之前应当首先处理返回的数据。这样做可以正确地处理在读取一些字节后产生的 I/O 错误，同时允许EOF的出现。

**结论：**
ReadFile(filename string)方法之所以速度快的原因就是先计算出file文件的size，在初始化对应size大小的buff，传入ReadRead(p []byte) 来读取字节流。


