---
layout: post
title: "NSNotifications With Blocks"
description: ""
category: 
tags: []
---
{% include JB/setup %}


[ @{   	NSApplicationWillBecomeActiveNotification 	:	@"slideIn",
	 		NSApplicationDidResignActiveNotification 	: 	@"slideOut" }	each:^( id key, id obj ) {
			[w observeObject:NSApp forName:obj calling: NSSelectorFromString ( obj ) ];	}];


["NSNotifications With Blocks"]({% post_url 2012-09-22-nsnotifications-with-blocks %})

