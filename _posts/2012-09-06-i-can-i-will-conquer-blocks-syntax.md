---
layout: post
title: "I can, I will, Conquer Blocks' Syntax."
description: ""
category:
tags: [blocks, cocoa, mental-blocks, reference, syntax]
---
{% include JB/setup %}


As confusing as they may be to me, I refuse to admit defeat to the convoluted syntax of blocks'.  Even the word "blocks" is weird and hard to get your head around.  Is it "block sytax" or "blocks' syntax", or "block's syntax", or "block's syntax" or WHAT, lol?

The truth is I use a bunch of blocks (that I didn't write, Or at least not completely) ALL THE TIME, and they make almost everything I do faster, easier, and better.  But when I sit down want to write a simple block variable my brain always bricks on how to do that.  The major problem are the arguments / parameters, and the return value / how they go together. At first glance, the way that that shit looks - makes no sense to me.  I'm going to keep a record here of all the stuff that actually helps me understand them better.

http://yannickloriot.com/2011/11/working-with-blocks/

{% objc %}
type (^block_name) (type_arguments) = ^ return_type (type arguments) { /* body */ };
{% endhighlight %}

The most confusing for a beginner is certainly the block’s declaration. Here the quick steps to declare a block:

Declare a variable: block_name.
Dereference it to yield block information: (^block_name).
Add its return type and its input parameters: type (^block_name) (type_arguments).


The creation is much simpler:

Define that is a block using the caret character: ^.
Mention the return type of the block: ^ return_type.
Add the input arguments of the block: ^ return_type (type arguments).
Write the block’s body: ^ return_type (type arguments) { /* body */ }.


Some parts of a block assignment are optionals:

If the block takes no arguments, the argument list can be skipped.
Example: ^ BOOL { return YES; }.
You don’t need to specify the return type because it can be inferred by the compiler from the return statement.
Example: ^ (NSString *s) { /* body */ return YES; }.



http://b2cloud.com.au/how-to-guides/learn-c-blocks-in-20-seconds

I will compare blocks to their C function counterparts, for terms of simplicity and explanation.

double MyFunction (int input1, void* input2)
{
	return 0;
}

int main(int argc, char *argv[])
{
	//	Traditional C function
	MyFunction(1, NULL);

	//	C block function
	double (^VariableName)(int, void*) = ^ double (int input1, void* input2)
	{
		return 0;
	};

	VariableName(1, NULL);

	return 0;
}
Repeating the block creation code for the same structured block can be annoying, you can create a typedef for it like so

typedef double (^MyBlock)(int, void*);
The old block creation code can be replaced using the typedef

MyBlock VariableName = ^ double (int input1, void* input2)
{
	return 0;
};
That is C Blocks in a nutshell, the only other methods to use in conjunction with these is Block_copy and Block_release.
