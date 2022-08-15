```go
// Maybe rawurl is of the form scheme:path.
// (Scheme must be [a-zA-Z][a-zA-Z0-9+-.]*)
// If so, return scheme, path; else return "", rawurl.
func getscheme(rawurl string) (scheme, path string, err error) {
  for i := 0; i < len(rawurl); i++ {
    c := rawurl[i]
    switch {
    case 'a' <= c && c <= 'z' || 'A' <= c && c <= 'Z': 
    // do nothing
    case '0' <= c && c <= '9' || c == '+' || c == '-' || c == '.': 
      if i == 0 {
        return "", rawurl, nil
      }    
    case c == ':': 
      if i == 0 {
        return "", "", errors.New("missing protocol scheme")
      }    
      return rawurl[:i], rawurl[i+1:], nil
    default:
      // we have encountered an invalid character,
      // so there is no valid scheme
      return "", rawurl, nil
    }    
  }
  return "", rawurl, nil
}
```



```go
// stringContainsCTLByte reports whether s contains any ASCII control character.
func stringContainsCTLByte(s string) bool {
  for i := 0; i < len(s); i++ {
    b := s[i]
    if b < ' ' || b == 0x7f {
      return true
    }
  }
  return false
}
```

