package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
	var counter Counter
	// 10个reader
	for i := 0; i < 10; i++ {
		go func() {
			for {
				fmt.Println(counter.Count())
				time.Sleep(time.Millisecond)
			}
		}()
	}

	// 1个writer
	for {
		counter.Incr()
		time.Sleep(time.Second)
	}
}

// 一个安全的计数器
type Counter struct {
	mu    sync.RWMutex
	count uint64
}

// 使用写锁保护
func (c *Counter) Incr() {
	c.mu.Lock()
	c.count++
	c.mu.Unlock()
}

// 使用读锁保护
func (c *Counter) Count() uint64 {
	c.mu.RLock()
	defer c.mu.RUnlock()
	return c.count
}
