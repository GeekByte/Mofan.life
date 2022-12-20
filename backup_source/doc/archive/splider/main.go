package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("start visit")

	for i := 0; i < 100; i++ {
		resp, err := http.DefaultClient.Get("https://mofan.life")
		if err != nil {
			panic("get faile")
		}

		if resp.StatusCode != 200 {
			break
		}
	}

	fmt.Println("end visit")
}
