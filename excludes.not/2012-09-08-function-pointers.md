---
layout: post
title: "Function Pointers"
description: ""
category: 
tags: [objective-c functions pointers undocumented]
---
{% include JB/setup %}


@interface Something: Object {
}
 - (void) foo:(int(*)(void))bar;
@end

@implementation Something
- (void) foo:(int(*)(void))bar {
   return (*bar)();
}
@end

int someFunc( void ) {
    return 9;
}

int main ( int argc, char **argv ) {
    Something *object = [[Something alloc] init];

    printf( "%i\n", [object foo:&someFunc] );

    [object release];

    return 0; 
}
The key being that the signature for passing a function pointer is 
Code:
(return_type (*) (argument_list))
you'd think that this would be documented somewhere...

