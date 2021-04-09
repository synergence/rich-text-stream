# @rbxts/rich-text-stream
A way to build Roblox rich text without the clutter.
```ts
import { rich } from '@rbxts/rich-text-stream';

const output = rich()    // new builder
    .a('Hello, ')            // add
        .b()                     // bold
        .fc('#ff0000')           // red color
    .a('world!')             // add
        .i();                    // italics

print(output); // <font color="#ff0000"><b>Hello, </b></font><i>world!</i>
```

The API is self-documenting, they're named after the Roblox tags.

For convenience, there are multiple ways to format the font color - use whichever is most convenient for you.

There is also a shorthand method for convenience:

```ts
rich('Hello!')
    .b()  // bold
    .i(); // italics
```