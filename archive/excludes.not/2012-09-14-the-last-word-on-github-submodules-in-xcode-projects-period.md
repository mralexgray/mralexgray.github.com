---
layout: post
title: "The last word on github submodules in Xcode projects. Period."
description: ""
category:
tags: [xcode github git submodules open-source repositories syntax]
---
{% include JB/setup %}


In terminal navigate to the root of your project directory and run these commands (assuming your project is a git repo):

{% sh %}
git submodule add git://github.com/ShareKit/ShareKit.git Submodules/ShareKit
git commit -m 'ShareKit added as submodule'
{% endhighlight %}

This creates new submodule, downloads the files to Submodules/ShareKit directory within your project and creates new commit with updated git repo settings.

Now navigate to the newly created ShareKit dir and download all submodules files

{% sh %}
cd Submodules/ShareKit
git submodule update --init --recursive
{% endhighlight %}

source ShareKit


Add Git submodule to your project: git submodule add git://github.com/gabriel/gh-kit.git GHKit
Add cross-project reference by dragging GHKit.xcodeproj to your project
Open build settings editor for your project
Add the following Header Search Paths (including the quotes): "$(BUILT_PRODUCTS_DIR)/../../Headers"
Add Other Linker Flags for -ObjC -all_load
Open target settings editor for the target you want to link GHKit into
Add direct dependency on the GHKit aggregate target
Link against GHKit:
libGHKit.a on iOS
GHKit.framework on OS X
Import the GHKit headers via #import <GHKit/GHKit.h>
Build the project to verify installation is successful.


Open Xcode, Preferences and select the Downloads / Documentation tab.
Select the plus icon (bottom left) and specify: http://gabriel.github.com/gh-kit/publish/me.rel.GHKit.atom
Documentation
API Docs

http://gabriel.github.com/gh-kit/