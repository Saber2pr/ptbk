# @saber2pr/ptbk

> pbtkkkkkkkkkk

```bash
yarn add @saber2pr/ptbk
```

# start

```tsx
import Ptbk, { encodePtbkResponse, decodePtbkResponse } from "@saber2pr/ptbk";

const data = {
  中文: "妖梦~",
  "Konpaku Youmu": "qwq妖梦qaq",
  1: "aa",
  "%": "aaa",
  34: "啊啊",
};

console.log(decodePtbkResponse(encodePtbkResponse(data)));

// custom your encode and decode
// Ptbk.create
```

---

> Author: saber2pr
