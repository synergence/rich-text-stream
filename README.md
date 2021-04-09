# @rbxts/rich-text-stream
A way to build Roblox rich text without the clutter.
```ts
import { rich } from '@rbxts/rich-text-stream';

// Create rich text

const output = rich()
    .add('Hello, ')
        .bold()
        .fontColor('#ff0000')
        .fontSize(20)
    .add('world!')
        .italics();

// To output

print(output); // <font color="#ff0000" size="20"><b>Hello, </b></font><i>world!</i>

// Or, if the function only accepts strings

print(tostring(output));
print(output.toString());
```

The API is self-documenting, they're named after the Roblox tags.

For convenience, there are multiple ways to format the font color - use whichever is most convenient for you.

There is also a shorthand method for convenience:

```ts
rich('Hello!')
    .bold()
    .italics();
```